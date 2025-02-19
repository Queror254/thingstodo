import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Data/firebase";
import TaskCards from "../TaskCard/taskCard";
import TaskCreationCard from "../CreateTask/CreateTaskCard";
import TaskEditCard from "../EditTask/TaskEditor";
import { Task } from "../types/Task";

interface TaskProps {
  tasks: Task[]; // Accept an array of Task objects
}

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // State to manage the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //Sate to manage taskcreation card visibility
  const [isTaskCreationOpen, setIsTaskCreationOpen] = useState(false);

  //function to toggle task creation card visibility
  const toggleTaskCreation = () => {
    setIsTaskCreationOpen(!isTaskCreationOpen);
  };

  //state to mange task filtering
  const [filter, setFilter] = useState<string>("ALL");

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to mark a task as complete
  const markTaskAsComplete = async (taskId: string) => {
    const taskRef = doc(db, "taskdb", taskId);
    await updateDoc(taskRef, { completed: true });
  };

  //Function to delete a task
  const deleteTask = async (taskId: string) => {
    const taskRef = doc(db, "taskdb", taskId);
    //delete the task from firestore
    await deleteDoc(taskRef);
    //update the local state
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  //fetch tasks from firestore
  // Fetch tasks from Firestore with real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "taskdb"),
      (querySnapshot) => {
        const tasksData: Task[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            userid: data.userid,
            title: data.title,
            description: data.description,
            priority: data.priority,
            startDate: data.startDate ? data.startDate.toDate() : null,
            label: data.label,
            completed: data.completed,
            dueDate: data.dueDate ? data.dueDate.toDate() : null, // Convert Firestore Timestamp to Date
            createdAt: data.createdAt ? data.createdAt.toDate() : null, // Convert Firestore Timestamp to Date
          };
        });

        setTasks(tasksData);
        setLoading(false); // Set loading to false once the tasks are loaded
      }
    );

    // Cleanup function to unsubscribe from real-time updates when component unmounts
    return () => unsubscribe();
  }, []);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    try {
      switch (filter) {
        case "Completed":
          return task.completed;
        case "In Progress":
          return !task.completed;
        case "Overdue":
          return !task.completed && new Date(task.dueDate) < today;
        case "Today":
          return new Date(task.dueDate).toDateString() === today.toDateString();
        case "Tomorrow":
          return (
            new Date(task.dueDate).toDateString() === tomorrow.toDateString()
          );
        default:
          //all except completed
          return !task.completed; // "All" filter shows all tasks
      }
    } catch (error) {
      console.error("Error filtering tasks: ", error);
    }
  });

  return (
    <section className="Home w-full h-full">
      {/**Header */}
      <div className="relative flex flex-row justify-between py-2 bg-gray-200">
        <div className="flex justify-start items-center gap-2">
          {/**siderbar open-button */}
          <button
            id="current_btn"
            className="ms-3 text-sm text-gray-700 border-gray-300 hover:text-slate-800 focus:outline-none bg-transparent focus:ring-gray-300"
          >
            <img
              src="icon/inbox_black.png"
              alt="Edit"
              className="h-6 w-6 mr-1"
            />
          </button>
          {/**Page title */}
          <div className="text-[1.2rem] font-sans font-semibold text-slate-800 items-start">
            Overview
          </div>
        </div>
        <div className="flex flex-row gap-4  justify-center items-center">
          <form className="flex items-center max-w-sm mx-auto">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-300 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search branch name..."
                required
              />
            </div>
            <button
              type="submit"
              className="p-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
      </div>
      {/**Body */}
      <div className="px-1 py-4">
        {/** Task Navigation */}
        <div className="flex flex-row justify-evenly items-center bg-gray-200 w-full rounded-tl-xl rounded-bl-sm rounded-tr-sm rounded-br-xl border-2 border-spacing-40 border-gray-200 font-semibold text-[14px] text-slate-800 shadow-lg">
          {[
            "All",
            "Completed",
            "In Progress",
            "Overdue",
            "Today",
            "Tomorrow",
          ].map((filterOption) => (
            <button
              key={filterOption}
              onClick={async () => {
                setLoading(true); // Set loading to true
                await setFilter(filterOption); // Update filter
                // Simulate data fetch delay (replace with real data fetch logic)
                setTimeout(() => {
                  setLoading(false); // Turn off loading once data is ready
                }, 1000); // Adjust timing as needed
              }}
              className={`p-2 text-1xl hover:bg-slate-300 ${
                filter === filterOption ? "bg-slate-300 font-bold" : ""
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>
        {/**Task cards */}
        <div className="px-1 py-4">
          {/**Loading animation */}
          {loading ? (
            <div className="relative flex justify-center items-center mt-40 gap-2 cursor-progress">
              <div className="flex justify-center items-center">
                <div className="absolute animate-spin rounded-md h-10 w-10 border-4  border-emerald-500"></div>
                <img
                  src="icon/favicon.png"
                  className="rounded-full h-8 w-8 animate-horizontal-spin"
                />
              </div>
              <span className="text-sm text-emerald-500">ThingsToDo</span>
              {/** animate-horizontal-spin */}
            </div>
          ) : (
            <TaskCards
              tasks={filteredTasks}
              onMarkComplete={markTaskAsComplete}
              onDeleteTask={deleteTask}
            />
          )}
        </div>
        <button
          id="createtask_btn"
          type="button"
          onClick={toggleTaskCreation}
          className="fixed bottom-0 right-0 z-50 w-max h-max p-2 ms-3 cursor-cell text-sm text-gray-700 border-gray-300 hover:text-slate-800 focus:outline-none bg-transparent focus:ring-gray-300 animate-none"
        >
          <img src="icon/addtask.png" alt="Edit" className="h-14 w-14 mr-1" />
        </button>
        {isTaskCreationOpen && (
          <TaskCreationCard
            isOpen={isTaskCreationOpen}
            toggleTaskCreation={toggleTaskCreation}
          />
        )}
      </div>
    </section>
  );
}

export default Home;
