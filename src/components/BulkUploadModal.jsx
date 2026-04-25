import  { useState } from 'react'; 
import customerService from "../service/customer.service"; 

function BulkUploadModal({ isOpen, onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an Excel file before uploading."); 
      return;
    }

    setUploading(true);
    setError('');
    setProgress(0);

    try {
      const responseMessage = await customerService.uploadBulkCustomers(file, (percent) => {
        setProgress(percent);
      });

      alert(responseMessage || "Upload successful!"); 
      onSuccess(); 
      onClose(); 
    } catch (err) {
      console.error(err);
      
      const errorMsg = err.response?.data || "Failed to upload file. Please try again.";
      setError(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-2 text-secondary">Bulk Upload</h2>
        <p className="text-sm text-gray-500 mb-6">Upload an Excel file with up to 1 million records.</p>

        {/* File Input */}
        <div className={`border-2 border-dashed rounded-2xl p-6 text-center mb-6 transition ${
          file ? 'border-accent bg-accent/5' : 'border-gray-200'
        }`}>
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            onChange={(e) => {
              setFile(e.target.files[0]);
              setError(''); 
            }}
            className="hidden" 
            id="excel-upload"
          />
          <label htmlFor="excel-upload" className="cursor-pointer text-accent font-semibold block">
            {file ? (
              <span className="text-secondary break-all">{file.name}</span>
            ) : (
              "Click to choose Excel file"
            )}
          </label>
        </div>

        
        {uploading && (
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-1 font-medium text-secondary">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-accent h-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-xs mb-4 bg-red-50 p-2 rounded border border-red-100">{error}</p>}

        
        <div className="flex justify-end gap-4">
          <button 
            onClick={() => {
                if(!uploading) onClose();
            }}
            disabled={uploading}
            className="text-gray-500 font-medium hover:text-gray-700 transition disabled:opacity-30"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload} 
            disabled={uploading}
            className={`px-6 py-2 rounded-xl font-bold shadow-lg transition ${
              uploading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-accent text-secondary hover:scale-105 active:scale-95'
            }`}
          >
            {uploading ? "Processing..." : "Upload Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BulkUploadModal;