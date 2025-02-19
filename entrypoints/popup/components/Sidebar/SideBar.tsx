"use client";
import { collection, getDocs } from "firebase/firestore";

export function SideBar() {
  return (
    <section
      id="sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 rounded-r-md border-r-2 border-gray-300">
        <div className="flex flex-row py-4 items-start gap-2 border-2 rounded-md border-gray-300">
          <a href="" className="flex items-center ps-2.5">
            <img
              src="icon/favicon.png"
              className="h-8 w-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl whitespace-nowrap text-gray-800 font-bold dark:text-white">
              ThingsToDo
            </span>
          </a>
        </div>
        <ul className="space-y-2 font-medium flex flex-col gap-4 justify-start items-start">
          <li
            id="instant"
            className="w-full flex flex-row justify-start items-start p-2 text-base text-gray-900 transition duration-75 rounded-lg group bg-transparent hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700"
          >
            <img
              className="w-6 h-6 bg-gray-800 rounded-md"
              src="/icon/today.png"
              alt=""
            />
            <span className="ms-3 text-[1rem] whitespace-nowrap">Today</span>
            <span
              id="due_tasks"
              className="d-none inline-flex items-center justify-center w-2 h-2 p-1 animate-pulse ms-3 text-sm font-medium rounded-full bg-red-700 text-blue-300"
            ></span>
          </li>

          <li id="repeat_task" className="w-full">
            <button
              type="button"
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group bg-transparent hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <img
                className="w-6 h-6 bg-gray-800 rounded-md p-1"
                src="/icon/repeattask.png"
                alt=""
              />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-[1rem]">
                Repeat Tasks
              </span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <ul id="repeattask_dropdown" className="d-none py-2 space-y-2">
              <li id="daily_optn">
                <a
                  href="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700 text-[1rem]"
                >
                  <img
                    className="w-4 h-4 bg-gray-800 rounded-full"
                    src="/icon/repeat.png"
                    alt=""
                  />
                  <span className="flex-1 ms-3 text-[1rem] whitespace-nowrap">
                    Daily
                  </span>
                </a>
              </li>
              <li id="weekly_optn">
                <a
                  href="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700 text-[1rem]"
                >
                  <img
                    className="w-4 h-4 bg-gray-800 rounded-full"
                    src="/icon/repeat.png"
                    alt=""
                  />
                  <span className="flex-1 ms-3 text-[1rem] whitespace-nowrap">
                    Weekly
                  </span>
                </a>
              </li>
              <li id="monthly_optn">
                <a
                  href="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700 text-[1rem]"
                >
                  <img
                    className="w-4 h-4 bg-gray-800 rounded-full"
                    src="/icon/repeat.png"
                    alt=""
                  />
                  <span className="flex-1 ms-3 text-[1rem] whitespace-nowrap">
                    Monthly
                  </span>
                </a>
              </li>
              <li id="yearly_optn">
                <a
                  href="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700 text-[1rem]"
                >
                  <img
                    className="w-4 h-4 bg-gray-800 rounded-full"
                    src="/icon/repeat.png"
                    alt=""
                  />
                  <span className="flex-1 ms-3 text-[1rem] whitespace-nowrap">
                    Yearly
                  </span>
                </a>
              </li>
            </ul>
          </li>
          <li
            id="calendar"
            className="w-full flex flex-row justify-start items-start p-2 text-base text-gray-900 transition duration-75 rounded-lg group bg-transparent hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700"
          >
            <img className="w-6 h-6" src="/icon/calendar.png" alt="" />
            <span className="ms-3 whitespace-nowrap text-[1rem]">Calendar</span>
            <span
              id="due_tasks"
              className="d-none inline-flex items-center justify-center w-2 h-2 p-1 animate-pulse ms-3 text-sm font-medium rounded-full bg-red-700 text-blue-300"
            ></span>
          </li>
          <li
            id="filters_labels"
            className="w-full flex flex-row justify-start items-start p-2 text-base text-gray-900 transition duration-75 rounded-lg group bg-transparent hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700"
          >
            <img className="w-6 h-6" src="/icon/category_black.png" alt="" />
            <span className="ms-3 whitespace-nowrap text-[1rem]">
              Filters & Labels
            </span>
          </li>
          <li
            id="stats"
            className="w-full flex flex-row justify-start items-start p-2 text-base text-gray-900 transition duration-75 rounded-lg group bg-transparent hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700"
          >
            <img
              className="w-6 h-6 bg-gray-800 rounded-full"
              src="/icon/stats.png"
              alt=""
            />
            <span className="ms-3 whitespace-nowrap text-[1rem]">Stats</span>
          </li>
          <li
            id="account"
            className="w-full flex flex-row justify-start items-start p-2 text-base text-gray-900 transition duration-75 rounded-lg group bg-transparent hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700"
          >
            <svg
              className="flex-shrink-0 w-6 h-6 text-gray-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <span className="ms-3 whitespace-nowrap text-[1rem]">Account</span>
          </li>
          <li
            id="logout"
            className="w-full flex flex-row justify-start items-start p-2 text-base text-gray-900 transition duration-75 rounded-lg group bg-transparent hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700"
          >
            <img
              className="w-6 h-6"
              src="/icon/logout-svgrepo-com.svg"
              alt=""
            />
            <span className="ms-3 whitespace-nowrap text-[1rem]">Logout</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
