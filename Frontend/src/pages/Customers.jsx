import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/customers")
      .then(res => setCustomers(res.data));
  }, []);

  return (
    <div className="p-6">

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">CUSTOMERS</h2>

        <button
          onClick={() => navigate("/add-customer")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + ADD
        </button>
      </div>

      <hr className="mb-4" />

      <div className="grid grid-cols-3 gap-4">
        {customers.map(c => (
          <div key={c.id} className="bg-white shadow rounded-xl p-4">
            <h4 className="font-semibold">{c.name}</h4>

            <span className={`text-xs px-2 py-1 rounded 
              ${c.is_gst_registered 
                ? "bg-green-100 text-green-600" 
                : "bg-red-100 text-red-600"}`}>
              {c.is_gst_registered ? "Active" : "In-Active"}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}