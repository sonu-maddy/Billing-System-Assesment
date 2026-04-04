import { useNavigate } from "react-router-dom";

export default function AddItemForm() {
  const navigate = useNavigate();
  return (
    <div className="shadow rounded-xl p-8 w-full">

      <h2 className="text-xl font-semibold mb-6">Add New Item</h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="block text-sm mb-1">Item Name</label>
          <input className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Customer Selling Price</label>
          <input className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Customer Status</label>
          <select className="w-full border rounded px-3 py-2">
            <option>Active</option>
            <option>In-Active</option>
          </select>
        </div>

      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button className="border border-red-400 text-red-500 px-5 py-2 rounded"
          onClick={() => navigate("/items")}
        >
          Cancel
        </button>

        <button className="bg-blue-800 text-white px-5 py-2 rounded">
          Create
        </button>
      </div>

    </div>
  );
}