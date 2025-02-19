import React from "react";
import { Task } from "../types/Task";
import TaskDetailsCard from "./details/taskDetails";
import { Checkbox } from "rsuite";
import TaskDescription from "./description";
import { useState } from "react";

interface TaskCardsProps {
  tasks: Task[]; // Accept an array of Task objects
  onMarkComplete: (taskId: string) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
}

const TaskCards: React.FC<TaskCardsProps> = ({
  tasks,
  onMarkComplete,
  onDeleteTask,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div className="task-cards flex flex-wrap flex-row justify-center gap-3 w-full overflow-y-auto max-h-[500px] scrollbar-hide">
      {tasks.map((task) => (
        <div key={task.id} className="cursor-pointer">
          <div className="card flex flex-col items-start gap-1 p-2 w-[260px] min-h-[220px] max-h-[300px] text-slate-700 rounded-lg shadow-md border-l-8 border-2 border-emerald-400 bg-gray-100">
            <div className="flex py-1 flex-row justify-between items-center rounded-md gap-3">
              <Checkbox
                color="green"
                className="border-t-2 border-b-4 border-r-8 border-emerald-500"
                checked={task.completed}
                onChange={() => onMarkComplete(task.id)}
              />{" "}
              {""}
              <div className="font-mono text-xs ml-2 text-slate-600">
                created at:
                <span className="bg-slate-200 p-1 border-0 rounded-md">
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : "----"}
                </span>
              </div>
              {/** dropdown menu for delete and edit */}
              <div className="dropdown">
                <button
                  className="dropdown-toggle"
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen((prev) => ({
                      ...prev,
                      [task.id]: !prev[task.id],
                    }));
                  }}
                  aria-expanded={isDropdownOpen[task.id] || false}
                >
                  <img
                    src="icon/dropdown.png"
                    alt="dropdown"
                    className="w-5 h-5"
                  />
                </button>
                {isDropdownOpen[task.id] && (
                  <ul className="dropdown-menu z-30 fixed p-2 bg-gray-300 rounded-md shadow-md">
                    <li>
                      <button>
                        <img
                          src="icon/edit_black.png"
                          alt="edit"
                          className="w-5 h-5"
                        />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onDeleteTask(task.id);
                          setIsDropdownOpen((prev) => ({
                            ...prev,
                            [task.id]: false,
                          }));
                        }}
                      >
                        <img
                          src="icon/delete.png"
                          alt="delete"
                          className="w-5 h-5"
                        />
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {/**Task title */}
            <h2
              onClick={() => setSelectedTask(task)}
              className="text-slate-800 dark:text-slate-200 text-[18px] font-bold border-l-2 border-b-2 border-r-2 rounded-md bg-gray-200 border-slate-300 w-full text-start"
            >
              {task.title.length > 25
                ? task.title.slice(0, 25) + "..."
                : task.title}
            </h2>
            {/**Task description */}
            <div
              onClick={() => setSelectedTask(task)}
              className="text-slate-800 bg-slate-10 font-mono text-start w-full inline-flex py-2 rounded-md items-start text-[15px]"
            >
              {task.description.length > 100 ? (
                <TaskDescription
                  description={task.description.slice(0, 60) + "..."}
                />
              ) : (
                <TaskDescription description={task.description} />
              )}
            </div>
            {/**Task start date */}
            <div
              onClick={() => setSelectedTask(task)}
              className="text-[15px] text-slate-900"
            >
              Begins on:{" "}
              <span className="text-[12px] text-slate-600 bg-slate-200 p-1 rounded-md">
                {task.startDate
                  ? new Date(task.startDate).toLocaleDateString()
                  : "----"}
              </span>
            </div>
            {/**Task due date */}
            <div
              onClick={() => setSelectedTask(task)}
              className="text-[15px] text-slate-900"
            >
              Due on:{" "}
              <span className="text-[12px] text-slate-600 bg-slate-200 p-1 rounded-md">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "----"}
              </span>
            </div>
            {/**Task status */}
            <div
              onClick={() => setSelectedTask(task)}
              className="w-full bg-gray-200 rounded-full dark:bg-gray-700"
            >
              <div
                className="bg-blue-600 text-[10px] font-medium text-blue-100 text-center h-1.5 leading-none rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            {/**Task status text */}
            <div className="flex flex-row text-[13px] text-slate-700 font-sans justify-between items-center w-full">
              <div>Status</div>
              <div>{task.completed ? "Completed" : "In Progress"}</div>
            </div>
          </div>
        </div>
      ))}
      {selectedTask && (
        <TaskDetailsCard
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdateTask={(updatedTask) => {
            const updatedTasks = tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            );
            // Assuming you have a way to update the tasks state
            // updateTasks(updatedTasks);
          }}
          onMarkComplete={onMarkComplete}
        />
      )}
    </div>
  );
};

export default TaskCards;
