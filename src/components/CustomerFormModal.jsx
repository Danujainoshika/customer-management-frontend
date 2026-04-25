import { useState, useEffect } from "react";
import customerService from "../service/customer.service";
import { CircleX } from "lucide-react";

function CustomerFormModal({ isOpen, onClose, onSuccess, customerData }) {
  const isEdit = !!customerData;

  const [form, setForm] = useState({
    name: "",
    nic: "",
    dob: "",
    mobileNumbers: [""],
    addresses: [{ line1: "", line2: "", city: "", country: "" }],
  });

  useEffect(() => {
    if (customerData) {
      setForm({
        name: customerData.name || "",
        nic: customerData.nic || "",
        dob: customerData.dob || "",
        mobileNumbers:
          customerData.mobileNumbers?.length > 0
            ? customerData.mobileNumbers
            : [""],
        addresses:
          customerData.addresses?.length > 0
            ? customerData.addresses
            : [{ line1: "", line2: "", city: "", country: "" }],
      });
    } else {
      setForm({
        name: "",
        nic: "",
        dob: "",
        mobileNumbers: [""],
        addresses: [{ line1: "", line2: "", city: "", country: "" }],
      });
    }
  }, [customerData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMobileChange = (i, val) => {
    const updated = [...form.mobileNumbers];
    updated[i] = val;
    setForm({ ...form, mobileNumbers: updated });
  };

  const addMobile = () =>
    setForm({ ...form, mobileNumbers: [...form.mobileNumbers, ""] });

  const removeMobile = (i) =>
    setForm({
      ...form,
      mobileNumbers: form.mobileNumbers.filter((_, idx) => idx !== i),
    });

  const handleAddressChange = (i, field, val) => {
    const updated = [...form.addresses];
    updated[i][field] = val;
    setForm({ ...form, addresses: updated });
  };

  const addAddress = () =>
    setForm({
      ...form,
      addresses: [
        ...form.addresses,
        { line1: "", line2: "", city: "", country: "" },
      ],
    });

  const removeAddress = (i) =>
    setForm({
      ...form,
      addresses: form.addresses.filter((_, idx) => idx !== i),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await customerService.updateCustomer(customerData.id, form);
      } else {
        await customerService.createCustomer(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

    
    <div className="bg-primary w-full max-w-2xl rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.25)] flex flex-col max-h-[90vh]">

      
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-secondary">
          {isEdit ? "Update Customer" : "Create Customer"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      
      <div className="overflow-y-auto px-6 py-5 space-y-6">

        <form onSubmit={handleSubmit} className="space-y-6">

          
          <div className="space-y-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-primary shadow-sm focus:ring-2 focus:ring-accent outline-none"
              required
            />

            <input
              name="nic"
              value={form.nic}
              onChange={handleChange}
              placeholder="NIC Number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent"
              required
            />

            <input
              type="date"
              name="dob"
              value={form.dob || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500">
              Mobile Numbers
            </h3>

            {form.mobileNumbers.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={m}
                  onChange={(e) => handleMobileChange(i, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent"
                  placeholder="07XXXXXXXX"
                />

                <button
                  type="button"
                  onClick={() => removeMobile(i)}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition"
                >
                  <CircleX size={18} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addMobile}
              className="text-accent text-sm font-medium hover:underline"
            >
              + Add Mobile
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500">
              Addresses
            </h3>

            {form.addresses.map((a, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm"
              >
                <input
                  placeholder="Address Line 1"
                  value={a.line1}
                  onChange={(e) =>
                    handleAddressChange(i, "line1", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border border-gray-200"
                />

                <input
                  placeholder="Address Line 2"
                  value={a.line2}
                  onChange={(e) =>
                    handleAddressChange(i, "line2", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border border-gray-200"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="City"
                    value={a.city}
                    onChange={(e) =>
                      handleAddressChange(i, "city", e.target.value)
                    }
                    className="px-4 py-2 rounded-xl border border-gray-200"
                  />

                  <input
                    placeholder="Country"
                    value={a.country}
                    onChange={(e) =>
                      handleAddressChange(i, "country", e.target.value)
                    }
                    className="px-4 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeAddress(i)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove Address
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addAddress}
              className="text-accent text-sm font-medium hover:underline"
            >
              + Add Address
            </button>
          </div>

        </form>
      </div>

      <div className="flex justify-end gap-3 px-6 py-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          className="px-5 py-2 rounded-xl bg-accent text-secondary font-semibold shadow hover:scale-[1.02] transition"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </div>
  </div>
);
}

export default CustomerFormModal;