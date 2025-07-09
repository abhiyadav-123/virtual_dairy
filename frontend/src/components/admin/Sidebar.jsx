import { FaUsers, FaRegListAlt, FaPhoneAlt, FaCog, FaThLarge } from "react-icons/fa";

const menuItems = [
  { label: "Dashboard", icon: <FaThLarge />, key: "dashboard" },
  { label: "Users", icon: <FaUsers />, key: "users" },
  { label: "Entries", icon: <FaRegListAlt />, key: "entries" },
  { label: "Contact", icon: <FaPhoneAlt />, key: "contact" },
  { label: "Settings", icon: <FaCog />, key: "settings" },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`flex items-center p-3 my-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
              activeTab === item.key ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab(item.key)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
