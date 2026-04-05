import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCustomerForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    pan: "",
    gst: "",
    is_gst_registered: true
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/customers", form);
      navigate("/customers");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shadow rounded-xl p-8 w-full">
      <h2 className="text-xl font-semibold mb-6">Add New Customer</h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="text-sm">Customer Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm">Customer Address</label>
          <input
            className="w-full border rounded px-3 py-2"
            onChange={e => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm">PAN Number</label>
          <input
            className="w-full border rounded px-3 py-2"
            onChange={e => setForm({ ...form, pan: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm">GST Number</label>
          <input
            className="w-full border rounded px-3 py-2"
            onChange={e => setForm({ ...form, gst: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm">Customer Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            onChange={e =>
              setForm({ ...form, is_gst_registered: e.target.value === "true" })
            }
          >
            <option value="true">Active</option>
            <option value="false">In-Active</option>
          </select>
        </div>

      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          className="border border-red-400 text-red-500 px-5 py-2 rounded"
          onClick={() => navigate("/customers")}
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="bg-blue-800 text-white px-5 py-2 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}