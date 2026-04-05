import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Items() {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/items")
      .then(res => setItems(res.data));
  }, []);

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/items", form);
    window.location.reload();
  };

  return (
    <div className="flex p-6 gap-6">


      <div className="w-screen">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">ITEMS</h2>
          <button className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => navigate("/add-item")}>
            + ADD
          </button>
        </div>

        <hr className="border-black" />

        {items.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No items available
          </p>
        )}



        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {items.map(item => (
            <div
              key={item.id}
              className="bg-gray-50 border rounded-xl p-4 hover:shadow-md transition"
            >
              <h4 className="font-semibold text-lg">{item.name}</h4>

              <p className="text-sm text-gray-600 mt-1">
                ₹ {item.price}
              </p>

             
              <span
                className={`text-xs px-3 py-1 mt-3 inline-block rounded font-medium
                  ${item.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {item.status}
              </span>

            </div>
          ))}

        </div>
      </div>


    </div>
  );
}


