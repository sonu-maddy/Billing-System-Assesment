import { Link } from "react-router-dom";

export default function MasterHome() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Master Data </h2>
      <hr className="border-black"/>

      <div className="flex gap-6 mt-10">
        <Link to="/customers">
          <div className="bg-white shadow-md rounded-xl p-6 w-70 hover:shadow-lg transition">
            <h3 className="text-lg font-bold">Customer</h3>
            <p className="text-gray-500">Read or Create customer data</p>
          </div>
        </Link>

        <Link to="/items">
          <div className="bg-white shadow-md rounded-xl p-6 w-64 hover:shadow-lg transition">
            <h3 className="text-lg font-bold">Items</h3>
            <p className="text-gray-500">Read or Create items data</p>
          </div>
        </Link>
      </div>
    </div>
  );
}