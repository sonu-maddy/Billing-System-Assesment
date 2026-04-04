import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/invoices")
      .then(res => setInvoices(res.data));
  }, []);

  const filtered = invoices.filter(i =>
    i.invoice_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

    
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <hr className="border-black" />

      {/* Search */}
      <input
        placeholder="Search by Invoice ID"
        className="border mt-6 p-2 mb-4 w-1/3 rounded"
        onChange={e => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">

          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3">Invoice ID</th>
              <th>Customer name</th>
              <th>Item name(s)</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(inv => (
              <tr key={inv.id} className="border-t text-center">

                <td className="p-3">{inv.invoice_id}</td>
                <td>{inv.customer_name}</td>
                <td>{inv.items.map(i => i.name).join(", ")}</td>
                <td>{inv.total}</td>

                <td>
                  <button
                    onClick={() => navigate(`/invoice/${inv.id}`)}
                    className="bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}