import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";


export default function Billing() {

    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);


    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);

    const [showInvoice, setShowInvoice] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/customers").then(res => setCustomers(res.data));
        axios.get("http://localhost:5000/items").then(res => setItems(res.data));
    }, []);

    
    const addItem = (item) => {
        setSelectedItems(prev => {
            const exists = prev.find(i => i.id === item.id);

            if (exists) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                );
            } else {
                return [...prev, { ...item, qty: 1 }];
            }
        });
    };

   
    const removeItem = (id) => {
        setSelectedItems(prev =>
            prev
                .map(i =>
                    i.id === id ? { ...i, qty: i.qty - 1 } : i
                )
                .filter(i => i.qty > 0)
        );
    };

  
    const total = selectedItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const gst = selectedCustomer?.is_gst_registered ? 0 : total * 0.18;
    const finalTotal = total + gst;

    const createInvoice = async () => {
        const invoiceDataTemp = {
            customer: selectedCustomer,
            items: selectedItems,
            total,
            gst,
            finalTotal
        };

        await axios.post("http://localhost:5000/invoices", {
            customer_id: selectedCustomer.id,
            items: selectedItems.map(i => ({
                item_id: i.id,
                qty: i.qty
            })),
            total,
            gst,
            final_total: finalTotal
        });

        setInvoiceData(invoiceDataTemp); 

        setSelectedItems([]);
        setCustomers([]);
        setSelectedCustomer(null);

        setShowInvoice(true);
    };




    return (

        <div>
            <div>
                <h2 className="text-xl font-semibold mb-6">Billing</h2>
                <hr className="border-black" />

            </div>

            {!showInvoice && (
                <div className="bg-gray-100 min-h-screen p-8 flex justify-center">



                    <div className="bg-white w-full max-w-5xl p-8 rounded-xl shadow">

                       



                        <div className="border-b pb-4 mb-6">

                            <h3 className="font-semibold mb-3 text-xl">Customer Details</h3>
                            <hr /><hr /><hr />


                            {!selectedCustomer && (
                                <div className="flex justify-center items-center h-[150px]">
                                    <button
                                        onClick={() => setShowCustomerModal(true)}
                                        className="flex items-center gap-2  text-black px-6 py-2 rounded shadow hover:bg-gray-50 transition"
                                    >
                                        <IoMdAddCircle className="text-lg " />
                                        Add
                                    </button>
                                </div>
                            )}


                            {selectedCustomer && (
                                <div className="mt-3 text-sm space-y-1">
                                    <p><b>Name :</b> {selectedCustomer.name}</p>
                                    <p><b>Address :</b> {selectedCustomer.address}</p>
                                    <p><b>Pan Card :</b> {selectedCustomer.pan}</p>
                                    <p><b>GST :</b> {selectedCustomer.gstin}</p>
                                </div>
                            )}

                        </div>




                        <div className="border-b pb-4 mb-6">

                            <h3 className="font-semibold mb-3 text-xl">Items</h3>
                            <hr /><hr /><hr />

                    
                            {selectedItems.length === 0 && (
                                <div className="flex justify-center items-center h-[150px]">
                                    <button
                                        onClick={() => setShowItemModal(true)}
                                        className="flex items-center gap-2  text-black px-6 py-2 rounded shadow hover:bg-gray-50 transition"
                                    >
                                        <IoMdAddCircle /> Item
                                    </button>
                                </div>
                            )}

                     
                            {selectedItems.length > 0 && (
                                <>


                      
                                    <div className="grid grid-cols-3 mt-5 font-semibold text-sm mb-2">
                                        <span className="font-bold">Name</span>
                                        <span className="text-center font-bold">Qty</span>
                                        <span className="text-right font-bold">Amount</span>
                                    </div>

                          
                                    {selectedItems.map(i => (
                                        <div key={i.id} className="grid grid-cols-3 items-center py-2">

                                            <span>{i.name}</span>

                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => removeItem(i.id)} className="border px-2">-</button>
                                                <span>{i.qty}</span>
                                                <button onClick={() => addItem(i)} className="border px-2">+</button>
                                            </div>

                                            <span className="text-right">₹ {i.price * i.qty}</span>

                                        </div>
                                    ))}

                             
                                    <div className="flex justify-end mt-6 border-t pt-4">
                                        <div className="text-right">
                                            <p>Total: ₹ {total}</p>
                                            <p>GST: ₹ {gst}</p>
                                            <h3 className="font-bold text-lg">₹ {finalTotal}</h3>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>



                 
                        <div className="flex justify-end gap-4">
                            <button className="border border-red-500 text-red-500 px-4 py-2 rounded">
                                Cancel
                            </button>

                            <button className="bg-blue-800 text-white px-4 py-2 rounded"
                                onClick={createInvoice}>
                                Create
                            </button>
                        </div>

                    </div>

                    {showCustomerModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

                            <div className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-lg">

                              
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold">Select Customer</h2>

                                    <button
                                        onClick={() => setShowCustomerModal(false)}
                                        className="border border-red-500 text-red-500 px-4 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>

                           
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                    {customers.map(c => (
                                        <div
                                            key={c.id}
                                            onClick={() => {
                                                setSelectedCustomer(c);
                                                setShowCustomerModal(false);
                                            }}
                                            className="p-5 border rounded-xl cursor-pointer 
                       shadow-sm hover:shadow-md transition bg-gray-50"
                                        >

                                          
                                            <h3 className="font-semibold text-gray-800 text-lg">
                                                {c.name}
                                            </h3>

                                            <div className="mt-3">
                                                <span
                                                    className={`text-xs px-3 py-1 rounded font-medium
                ${c.is_gst_registered
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-red-100 text-red-600"
                                                        }`}
                                                >
                                                    {c.is_gst_registered ? "Active" : "In-Active"}
                                                </span>
                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>
                    )}

                    {showItemModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

                            <div className="bg-white p-6 rounded w-[400px]">

                                <h3 className="mb-4 font-semibold">Select Item</h3>

                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            addItem(item);
                                            setShowItemModal(false);
                                        }}
                                        className="p-2 border mb-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {item.name} - ₹ {item.price}
                                    </div>
                                ))}

                                <button
                                    onClick={() => setShowItemModal(false)}
                                    className="mt-3 border border-red-600 text-red-600 px-3 py-1 rounded"
                                >
                                    Close
                                </button>

                            </div>
                        </div>
                    )}

                </div>
            )}



            {showInvoice && <div className="bg-gray-100 min-h-screen flex justify-center p-10">

              
                <div className="bg-white w-full max-w-4xl shadow rounded">

                    
                    <div className="bg-indigo-900 h-10 w-full rounded-t"></div>

                    <div className="p-8">

                      
                        <h1 className="text-2xl font-semibold mb-6">Billing</h1>

                      
                        <div className="border rounded mb-6">

                       
                            <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-50">
                                <h2 className="font-semibold">Customer Details</h2>
                                <p className="text-sm font-medium">
                                    Invoice ID: <span className="font-bold">INVC224830</span>
                                </p>
                            </div>

                        
                            <div className="px-6 py-4 text-sm space-y-2">
                                <p><span className="font-medium">Name</span> : {invoiceData?.customer.name}</p>
                                <p><span className="font-medium">Address</span> : {invoiceData?.customer.address}</p>
                                <p><span className="font-medium">Pan Card</span> : {invoiceData?.customer.pan}</p>
                                <p><span className="font-medium">GST Num</span> : {invoiceData?.customer.gstin}</p>
                            </div>

                        </div>

                     
                        <div className="border rounded">

                        
                            <div className="px-6 py-3 border-b bg-gray-50 font-semibold">
                                Items
                            </div>

                          
                            <div className="grid grid-cols-3 px-6 py-3 text-sm font-semibold border-b">
                                <span>Name</span>
                                <span className="text-center">Qty</span>
                                <span className="text-right">Amount</span>
                            </div>

                           
                            {invoiceData?.items.map(i => (
                                <div key={i.id} className="grid grid-cols-3 px-6 py-3 text-sm border-b">
                                    <span>{i.name}</span>
                                    <span className="text-center">{i.qty}</span>
                                    <span className="text-right font-medium">
                                        ₹ {i.price * i.qty}
                                    </span>
                                </div>
                            ))}

                          
                            <div className="px-6 py-4 flex justify-end">
                                <div className="text-right">
                                    <p className="font-semibold">Total</p>
                                    <p className="font-bold text-lg">₹ {invoiceData?.finalTotal}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>}



        </div>
    );
}







