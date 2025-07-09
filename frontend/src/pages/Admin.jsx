import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { FaUsers, FaRegListAlt, FaPhoneAlt, FaCog } from "react-icons/fa";

// Optional imports for future implementation
import Users from "../components/admin/Users";

import EntriesPage from "../components/admin/Entries";
// import Contact from "../components/admin/Contact";
// import Settings from "../components/admin/Settings";

const AdminDashboard = () => {
  const user = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!user || user.data.role !== "admin") {
    return <Navigate to="/" />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <div className="p-6"><Users/></div>; // replace with <Users />
      case "entries":
        return <div className="p-6"><EntriesPage/></div>; // replace with <Entries />
      case "contact":
        return <div className="p-6">Contact Component</div>; // replace with <Contact />
      case "settings":
        return <div className="p-6">Settings Component</div>; // replace with <Settings />
      default:
        return (
          <div className="p-6">
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardCards.map((card) => (
                <div
                  key={card.key}
                  onClick={() => setActiveTab(card.key)}
                  className="cursor-pointer bg-base-200 hover:bg-primary hover:text-white transition-all duration-300 rounded-xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl"
                >
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <h3 className="text-lg font-semibold">{card.label}</h3>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  const dashboardCards = [
    { key: "users", label: "Manage Users", icon: <FaUsers /> },
    { key: "entries", label: "All Entries", icon: <FaRegListAlt /> },
    { key: "contact", label: "Contact Queries", icon: <FaPhoneAlt /> },
    { key: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto bg-gray-50">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
