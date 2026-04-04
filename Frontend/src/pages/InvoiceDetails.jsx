import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/invoices/${id}`)
      .then(res => setInvoice(res.data));
  }, [id]);

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-xl">

      <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>

      {/* Invoice ID */}
      <div className="flex justify-between mb-4">
        <h3>Customer Details</h3>
        <span className="font-semibold">
          Invoice ID: {invoice.invoice_id}
        </span>
      </div>

      {/* Customer Info */}
      <p><b>Name:</b> {invoice.customer_name}</p>
      <p><b>Address:</b> {invoice.address}</p>
      <p><b>PAN:</b> {invoice.pan}</p>
      <p><b>GST:</b> {invoice.gst}</p>

      {/* Items */}
      <h3 className="mt-6 mb-2 font-semibold">Items</h3>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map(i => (
            <tr key={i.id} className="text-center border-t">
              <td>{i.name}</td>
              <td>{i.qty}</td>
              <td>{i.price * i.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="text-right mt-4">
        <h3 className="font-bold">Total: ₹ {invoice.total}</h3>
      </div>

    </div>
  );
}