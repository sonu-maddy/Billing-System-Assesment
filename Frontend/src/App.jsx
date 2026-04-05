import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/NavBar";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import Items from "./pages/Items";
import MasterHome from "./pages/MasterHome";
import AddItem from "./pages/AddItem";
import Billing from "./pages/Billing";
import Dashboard from "./components/Dashboard";
import InvoiceDetails from "./pages/InvoiceDetails";

function App() {
  return (
    <BrowserRouter>

      
      <Navbar />

      
      <Sidebar />

   
      <div className="ml-56 mt-14 mb-10 p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/items" element={<Items />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/master" element={<MasterHome />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/invoices" element={<Dashboard />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
        </Routes>
      </div>

      
      <Footer />

    </BrowserRouter>
  );
}

export default App;