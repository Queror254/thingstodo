import React from "react";
import { Task } from "../types/Task";
import TaskDetailsCard from "./details/taskDetails";
import { Checkbox } from "rsuite";
import TaskDescription from "./TaskDescription";
interface TaskCardsProps {
  tasks: Task[]; // Accept an array of Task objects
}

const TaskCards: React.FC<TaskCardsProps> = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className="task-cards flex flex-wrap flex-row justify-center gap-3 w-full overflow-y-auto max-h-[500px] scrollbar-hide">
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => setSelectedTask(task)}
          className="cursor-pointer"
        >
          <div className="card flex flex-col items-start gap-1 p-2 w-[260px] min-h-[220px] max-h-[300px] text-slate-700 rounded-lg shadow-md border-l-8 border-2 border-emerald-400 bg-gray-100">
            <div className="flex py-1 flex-row justify-between items-center rounded-md">
              <Checkbox
                color="green"
                className="border-t-2 border-b-4 border-r-8 border-emerald-500"
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
            </div>
            <h2 className="text-slate-800 dark:text-slate-200 text-[18px] font-bold border-l-2 border-b-2 border-r-2 rounded-md bg-gray-200 border-slate-300 w-full text-start">
              {task.title.length > 25
                ? task.title.slice(0, 25) + "..."
                : task.title}
            </h2>
            <div className="text-slate-800 bg-slate-10 font-mono text-start w-full inline-flex py-2 rounded-md items-start text-[15px]">
              {task.description.length > 80 ? (
                <TaskDescription
                  description={task.description.slice(0, 60) + "..."}
                />
              ) : (
                <TaskDescription description={task.description} />
              )}
            </div>
            <div className="text-[15px] text-slate-900">
              Begins on:{" "}
              <span className="text-[12px] text-slate-600 bg-slate-200 p-1 rounded-md">
                {task.startDate
                  ? new Date(task.startDate).toLocaleDateString()
                  : "----"}
              </span>
            </div>
            <div className="text-[15px] text-slate-900">
              Due on:{" "}
              <span className="text-[12px] text-slate-600 bg-slate-200 p-1 rounded-md">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "----"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="bg-blue-600 text-[10px] font-medium text-blue-100 text-center h-1.5 leading-none rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
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
        />
      )}
    </div>
  );
};

export default TaskCards;
