import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbSquareKey } from "react-icons/tb";
import { LiaPagerSolid } from "react-icons/lia";

export default function Sidebar() {
  return (
    <div className="w-56 border-r border-gray-300 text-black p-5 
                    fixed top-14 bottom-10 left-0 bg-white">

      <div className="ml-4 mt-10 text-lg font-medium">
        <ul className="space-y-6">

          <li className="border rounded-lg px-3 py-2 hover:bg-gray-100">
            <Link to="/" className="flex items-center gap-2">
              <span><MdOutlineSpaceDashboard /></span> Dashboard
            </Link>
          </li>

          <li className="border rounded-lg px-3 py-2 hover:bg-gray-100">
            <Link to="/master" className="flex items-center gap-2">
              <span><TbSquareKey /></span> Master
            </Link>
          </li>

          <li className="border rounded-lg px-3 py-2 hover:bg-gray-100">
            <Link to="/billing" className="flex items-center gap-2">
              <span><LiaPagerSolid /></span> Billing
            </Link>
          </li>

        </ul>
      </div>

    </div>
  );
}