import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/invoices")
      .then(res => setInvoices(res.data || []));
  }, []);

  const filtered = invoices.filter(i =>
    i.invoice_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-10">

      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <hr className="border-black"/>

      <div className="max-w-5xl mt-10 mx-auto bg-white shadow rounded">


        <div className="p-6">

          

          <input
            placeholder="Search by Invoice ID"
            className="bg-gray-100 p-3 rounded w-1/2 mb-6 outline-none"
            onChange={e => setSearch(e.target.value)}
          />

          <div className="border rounded overflow-hidden">

            <table className="w-full">

              <thead className="bg-indigo-900 text-white">
                <tr>
                  <th className="p-3 text-left">Invoice ID</th>
                  <th className="text-left">Customer</th>
                  <th className="text-left">Items</th>
                  <th className="text-left">Amount</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(invoice => (
                  <tr key={invoice.id} className="border-t">

                    <td className="p-3 font-semibold">{invoice.invoice_id}</td>

                    <td>{invoice.customer_name}</td>

                    <td>
                      {Array.isArray(invoice.items)
                        ? invoice.items.map(i => invoice.name).join(", ")
                        : "—"}
                    </td>

                    <td>₹ {invoice.final_total}</td>

                    <td className="text-center">
                      <button
                        onClick={() => navigate(`/invoice/${invoice.id}`)}
                        className="bg-indigo-900 text-white px-4 py-1 rounded"
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
      </div>
    </div>
  );
}