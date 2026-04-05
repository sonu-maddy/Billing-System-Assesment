import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/invoices/${id}`)
      .then(res => {
        if (!res.data) {
          setInvoice({ notFound: true });
        } else {
          setInvoice(res.data);
        }
      })
      .catch(() => {
        setInvoice({ notFound: true });
      });
  }, [id]);

  if (!invoice) return <p className="p-10">Loading...</p>;

  if (invoice.notFound) {
    return <p className="p-10 text-red-500">Invoice not found</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-10">


      <div className="bg-white w-full max-w-4xl shadow rounded">


        <div className="bg-indigo-900 h-5 rounded-t"></div>

        <div className="p-8">


          <h2 className="text-xl font-semibold mb-6">Invoice Details</h2>
          <hr />


          <div className="border-2  rounded mb-6">

            <div className="flex justify-between px-6 py-3 border-b bg-gray-50">
              <h3 className="font-semibold">Customer Details</h3>
              <p>Invoice ID: <b>{invoice.invoice_id}</b></p>
            </div>

            <div className="px-6 py-4 text-sm space-y-2">
              <p><b>Name</b> : {invoice.customer_name}</p>
              <p><b>Address</b> : {invoice.address}</p>
              <p><b>PAN</b> : {invoice.pan}</p>
              <p><b>GST</b> : {invoice.gstin}</p>
            </div>

          </div>


          <div className="border rounded">

            <div className="px-6 py-3 border-b bg-gray-50 font-semibold">
              Items
            </div>

            <div className="grid grid-cols-3 px-6 py-3 border-b font-semibold">
              <span>Name</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Amount</span>
            </div>

            {invoice.items?.map(i => (
              <div key={i.id} className="grid grid-cols-3 px-6 py-2 border-b">
                <span>{i.name}</span>
                <span className="text-center">{i.qty}</span>
                <span className="text-right">₹ {i.price * i.qty}</span>
              </div>
            ))}


            <div className="px-6 py-4 flex justify-end">
              <div className="text-right">
                <p>Total</p>
                <p className="font-bold text-lg">₹ {invoice.final_total}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}