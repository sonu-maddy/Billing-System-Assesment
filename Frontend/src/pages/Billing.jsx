import { useEffect, useState } from "react";
import axios from "axios";

export default function Billing() {
    const [step, setStep] = useState(1);
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/customers").then(res => setCustomers(res.data));
        axios.get("http://localhost:5000/items").then(res => setItems(res.data));
    }, []);

    // Add item
    const addItem = (item) => {
        const exists = selectedItems.find(i => i.id === item.id);

        if (exists) {
            setSelectedItems(selectedItems.map(i =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            ));
        } else {
            setSelectedItems([...selectedItems, { ...item, qty: 1 }]);
        }
    };

    // Remove item
    const removeItem = (item) => {
        const exists = selectedItems.find(i => i.id === item.id);
        if (!exists) return;

        if (exists.qty === 1) {
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));
        } else {
            setSelectedItems(selectedItems.map(i =>
                i.id === item.id ? { ...i, qty: i.qty - 1 } : i
            ));
        }
    };

    // Calculations
    const total = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const gst = selectedCustomer?.is_gst_registered ? 0 : total * 0.18;
    const finalTotal = total + gst;

    // Invoice ID Generator
    const generateInvoiceId = () => {
        return "INVC" + Math.floor(100000 + Math.random() * 900000);
    };

    const [invoiceId, setInvoiceId] = useState("");

    return (
        <div className="p-6">

            <h2 className="text-2xl font-semibold mb-6">Billing </h2>
            <hr className="border-black" />
            <div className="flex justify-center items-center bg-gray-100 p-8">

                <div className="bg-white w-full max-w-5xl p-8 rounded-xl shadow">



                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="text-center p-8 w-full">
                            <h3 className="text-lg font-semibold mb-6 border-b pb-2">
                                Customer Details
                            </h3>

                            <div className="flex justify-center items-center h-[200px]">
                                <button
                                    onClick={() => setStep(2)}
                                    className="bg-blue-700 text-white px-6 py-2 rounded shadow"
                                >
                                    + ADD
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                                Select Customer
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {customers.map(c => (
                                    <div
                                        key={c.id}
                                        onClick={() => {
                                            setSelectedCustomer(c);
                                            setStep(3);
                                        }}
                                        className="p-4 border rounded cursor-pointer hover:shadow"
                                    >
                                        <h4 className="font-semibold">{c.name}</h4>
                                        <span className="text-xs text-green-600">Active</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                                Customer Details
                            </h3>

                            <p><b>Name:</b> {selectedCustomer.name}</p>
                            <p><b>Email:</b> {selectedCustomer.email}</p>

                            <button
                                onClick={() => setStep(4)}
                                className="mt-4 bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Next → Add Items
                            </button>
                        </div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                                Select Items
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {items.map(item => (
                                    <div key={item.id} className="p-4 border rounded">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p>₹ {item.price}</p>

                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => removeItem(item)}
                                                className="px-2 border"
                                            >-</button>

                                            <button
                                                onClick={() => addItem(item)}
                                                className="px-2 border"
                                            >+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setStep(5)}
                                className="mt-6 bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Next → Summary
                            </button>
                        </div>
                    )}

                    {/* STEP 5 */}
                    {step === 5 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                                Summary
                            </h3>

                            <p><b>Name:</b> {selectedCustomer.name}</p>

                            <div className="mt-4">
                                {selectedItems.map(i => (
                                    <div key={i.id} className="flex justify-between">
                                        <span>{i.name} (x{i.qty})</span>
                                        <span>₹ {i.price * i.qty}</span>
                                    </div>
                                ))}
                            </div>

                            <hr className="my-4" />

                            <p>Total: ₹ {total}</p>
                            <p>GST: ₹ {gst}</p>
                            <h4 className="font-bold">Final: ₹ {finalTotal}</h4>

                            <button
                                onClick={() => {
                                    setInvoiceId(generateInvoiceId());
                                    setStep(6);
                                }}
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Generate Invoice
                            </button>
                        </div>
                    )}

                    {/* STEP 6 - FINAL INVOICE */}
                    {step === 6 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                                Generated Invoice
                            </h3>

                            <p className="text-right mb-4">
                                <b>Invoice ID:</b> {invoiceId}
                            </p>

                            <p><b>Name:</b> {selectedCustomer.name}</p>

                            <div className="mt-4">
                                {selectedItems.map(i => (
                                    <div key={i.id} className="flex justify-between">
                                        <span>{i.name}</span>
                                        <span>{i.qty}</span>
                                        <span>₹ {i.price * i.qty}</span>
                                    </div>
                                ))}
                            </div>

                            <hr className="my-4" />

                            <h4 className="font-bold">Final Total: ₹ {finalTotal}</h4>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}