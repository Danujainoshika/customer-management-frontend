import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customerService from "../service/customer.service";

function CustomerView() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    loadCustomer();
  }, [id]);

  const loadCustomer = async () => {
    try {
      const data = await customerService.getCustomerById(id);
      setCustomer(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!customer) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl bg-primary shadow-2xl rounded-3xl p-8 relative overflow-hidden">

        
        <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>

        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary tracking-tight">
            Customer Details
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of customer information
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div className="bg-gray-50 hover:shadow-md transition p-5 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Name</p>
            <p className="font-semibold text-secondary text-lg">{customer.name}</p>
          </div>

          <div className="bg-gray-50 hover:shadow-md transition p-5 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-wide">NIC</p>
            <p className="font-semibold text-secondary text-lg">{customer.nic}</p>
          </div>

          <div className="bg-gray-50 hover:shadow-md transition p-5 rounded-xl border border-gray-100 sm:col-span-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Date of Birth</p>
            <p className="font-semibold text-secondary text-lg">
              {customer.dob || "N/A"}
            </p>
          </div>
        </div>

        {/* Mobile Numbers */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Mobile Numbers
          </h2>

          <div className="flex flex-wrap gap-3">
            {customer.mobileNumbers?.length > 0 ? (
              customer.mobileNumbers.map((m, i) => (
                <span
                  key={i}
                  className="bg-accent/10 text-secondary border border-accent/30 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-accent/20 transition"
                >
                  {m}
                </span>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No mobile numbers</p>
            )}
          </div>
        </div>

        {/* Addresses (Scrollable) */}
        <div>
          <h2 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Addresses
          </h2>

          {customer.addresses?.length > 0 ? (
            <div className="max-h-60 overflow-y-auto pr-2 space-y-4">
              {customer.addresses.map((a, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <p className="text-secondary font-medium">
                    {a.line1}, {a.line2}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {a.city}, {a.country}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No addresses</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default CustomerView;