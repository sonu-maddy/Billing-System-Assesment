import { useNavigate } from "react-router-dom";

export default function AddCustomerForm() {
    const navigate = useNavigate();
  return (
    <div className=" shadow rounded-xl p-8 w-full ">
       

      <h2 className="text-xl font-semibold mb-6">Add New Customer</h2>

  
      <div className="grid grid-cols-2 gap-6">

       
        <div>
          <label className="block text-sm mb-1">Customer Name</label>
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          />
        </div>

        
        <div>
          <label className="block text-sm mb-1">Customer Address</label>
          <input
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Customer Pan Card Number
          </label>
          <input
            className="w-full border rounded px-3 py-2"
          />
        </div>

   
        <div>
          <label className="block text-sm mb-1">
            Customer GST Number
          </label>
          <input
            className="w-full border rounded px-3 py-2"
          />
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
        onClick={() => navigate("/customers")}
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