import { useState } from "react";
import Home from "./components/Home";
import { SideBar } from "./components/Sidebar/SideBar";
function App() {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSideBar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      return;
    }
  };

  return (
    <div className="App">
      <header className="flex flex-row justify-between px-2 py-1 bg-gray-200">
        <a
          href=""
          className="text-xl cursor-pointer font-bold text-slate-900 flex flex-row items-center"
        >
          {" "}
          <img src="icon/favicon.png" alt="Edit" className="h-8 w-8 mr-1" />
          <span>ThingsToDo</span>
        </a>
        {/* Button to toggle the sidebar */}
        <button
          id="siderbar_btn"
          type="button"
          onClick={toggleSidebar}
          className="w-8 p-2 ms-3 text-sm text-gray-700 border-gray-300 hover:text-slate-800 focus:outline-none bg-transparent focus:ring-gray-300"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </header>
      {/* Conditionally render the Sidebar when `isSidebarOpen` is true */}
      {isSidebarOpen && <SideBar />}
      <Home />
    </div>
  );
}

export default App;
