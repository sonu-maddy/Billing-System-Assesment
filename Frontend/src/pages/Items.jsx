import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Items() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: ""
  });

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

        <hr className="border-black"/>

        <div className="grid grid-cols-3 mt-10 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white shadow rounded-xl p-4">
              <h4 className="font-semibold">{item.name}</h4>

              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-600">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}