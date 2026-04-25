import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customerService from "../service/customer.service";
import CustomerFormModal from "../components/CustomerFormModal";
import { FilePenLine } from "lucide-react";
import BulkUploadModal from "../components/BulkUploadModal";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, [page]);

  const loadCustomers = async () => {
    try {
      const data = await customerService.getCustomers(page, size);
      setCustomers(data.customers);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-secondary px-6 py-10 flex justify-center">
      <div className="w-full max-w-6xl bg-primary rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary">Customers</h1>
            <p className="text-sm text-gray-500">Manage and view customer records</p>
          </div>
          <div className="flex gap-4">
            <button
            onClick={() => setShowModal(true)}
            className="bg-accent text-secondary px-5 py-2 rounded-xl font-semibold shadow"
          >
            + Create Customer
            </button>
            <button
              onClick={() => setShowBulkModal(true)}
              className="bg-accent text-secondary px-5 py-2 rounded-xl font-semibold shadow"
            >
              + Bulk Upload
            </button>
          </div>
          
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">NIC</th>
                <th className="p-4 text-left">Date of Birth</th>
                <th className="p-4 text-left">Mobiles</th>
                <th className="p-4 text-left">Addresses</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/customers/${c.id}`)}
                  className="border-t hover:bg-accent/10 cursor-pointer"
                >
                  <td className="p-4 font-medium text-secondary">{c.name}</td>
                  <td className="p-4">{c.nic}</td>
                  <td className="p-4">{c.dob || "N/A"}</td>
                  <td className="p-4">{c.mobileNumbers?.length || 0}</td>
                  <td className="p-4">{c.addresses?.length || 0}</td>
                  <td>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomer(c);
                            setShowModal(true);


                        }}
                    >
                        <FilePenLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between">
          <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
            Prev
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}>
            Next
          </button>
        </div>
      </div>

      <BulkUploadModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        onSuccess={loadCustomers}
      />

      {/* Modal */}
      <CustomerFormModal
        isOpen={showModal}
        onClose={() => {
            setShowModal(false);
            setSelectedCustomer(null);
        }}
        onSuccess={loadCustomers}
        customerData={selectedCustomer}
      />
    </div>
  );
}

export default CustomerList;