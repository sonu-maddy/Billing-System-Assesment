import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddItemForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    status: "Active"
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/items", {
        name: form.name,
        price: Number(form.price)
      });

      navigate("/items");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shadow rounded-xl p-8 w-full">

      <h2 className="text-xl font-semibold mb-6">Add New Item</h2>

      <div className="grid grid-cols-2 gap-6">

        {/* Item Name */}
        <div>
          <label className="text-sm">Item Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-sm">Customer Selling Price</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-sm">Customer Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>In-Active</option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8">

        <button
          className="border border-red-400 text-red-500 px-5 py-2 rounded"
          onClick={() => navigate("/items")}
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