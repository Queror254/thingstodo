import React from "react";
import { Task, Subtask } from "../../types/Task";
import { Button, Checkbox } from "rsuite";
import { v4 as uuidv4 } from "uuid";
import TaskDescription from "../TaskDescription";

interface TaskDetailsCardProps {
  task: Task & { subtasks?: Subtask[] }; // Task object with optional subtasks
  onClose: () => void; // Callback for closing the details card
  //Callback for updating the task
  onUpdateTask: (updatedTask: Task) => void;
}

const TaskDetailsCard: React.FC<TaskDetailsCardProps> = ({
  task,
  onClose,
  onUpdateTask,
}) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState<string>("");
  const [newSubtaskDescription, setNewSubtaskDescription] =
    useState<string>("");

  // Add a new subtask to the task
  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      const newSubtask: Subtask = {
        id: uuidv4(),
        title: newSubtaskTitle.trim(),
        description: newSubtaskDescription.trim(),
        completed: false,
      };

      const updatedTask = {
        ...task,
        subtasks: [...(task.subtasks || []), newSubtask],
      };
      onUpdateTask(updatedTask); // Update the task in the parent
      setNewSubtaskTitle(""); // Clear the input field
      setNewSubtaskDescription(""); // Clear the input field
    }
  };

  // Toggle the completion status of a subtask
  const toggleSubtaskCompletion = (id: string) => {
    const updatedSubtasks = task.subtasks?.map((subtask) =>
      subtask.id === id
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );
    const updatedTask = { ...task, subtasks: updatedSubtasks };
    onUpdateTask(updatedTask);
  };

  return (
    <div className="task-details-card fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="items-start bg-white h-full w-full p-6 rounded-lg shadow-lg overflow-y-auto max-h-screen scrollbar-hide gap-2 mt-16">
        <div className="absolute top-0 left-0 right-0 px-2 py-1  bg-white flex justify-between items-center border-b pb-2 mb-4 shadow-md w-full">
          <div className="flex flex-row gap-1 items-center">
            <Checkbox
              color="green"
              className="border-t-4 border-b-8 border-r-8 border-l-8 border-emerald-500 w-2 h-2 p-1"
            />{" "}
            okay
            <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
          </div>
          <Button
            appearance="subtle"
            size="lg"
            onClick={onClose}
            className="text-red-500 text-[1rem]"
          >
            <img src="icon/close.png" alt="Edit" className="h-8 w-8 mr-1" />
          </Button>
        </div>
        {/* Use TaskDescription to render the formatted description */}
        <div className="mb-4 border-b pb-1 flex flex-col justify-start items-start shadow-sm max-w-[550px] overflow-x-auto">
          {task.description ? (
            <TaskDescription description={task.description} />
          ) : (
            <span className="text-gray-400">description not available</span>
          )}
        </div>
        <div className="flex flex-col w-full gap-2 justify-start text-slate-300 text-sm border-b border-gray-800 p-2 shadow-sm">
          <div className="flex flex-row gap-2">
            <span className="p-2 bg-gray-800 rounded-md flex flex-row">
              <img src="icon/clock.png" alt="Edit" className="h-5 w-5 mr-1" />
              <span>
                Starts:{" "}
                {task.startDate
                  ? new Date(task.startDate).toLocaleDateString()
                  : "----"}
              </span>
            </span>
            <span className="p-2 bg-gray-800 rounded-md flex flex-row">
              <img
                src="icon/calendar.png"
                alt="Edit"
                className="h-5 w-5 mr-1"
              />
              <span>
                Due:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "----"}
              </span>
            </span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="p-2 bg-gray-800 rounded-md w-fit flex flex-row">
              <img
                id="priority_icon"
                src="icon/p_mid.png"
                alt="Priority"
                className="h-5 w-5 mr-1"
              />{" "}
              <span>Prority: {task.priority}</span>
            </span>
            <span className="p-2 bg-gray-800 rounded-md flex flex-row">
              <span>
                Status: {task.completed ? "Completed" : "In Progress"}
              </span>
            </span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="p-2 bg-gray-800 rounded-md flex flex-row">
              <img
                id="priority_icon"
                src="icon/label_white.png"
                alt="Priority"
                className="h-5 w-5 mr-1"
              />{" "}
              <span>{task.label}</span>
            </span>
          </div>
        </div>
        <div className="w-full flex flex-row px-1">
          <strong className="text-start w-full py-4 text-[1rem] text-gray-700 shadow-sm border-b-2">
            Sub Tasks:
          </strong>
        </div>
        <div className="mb-4 text-gray-800 items-start w-max">
          <div className="py-4 pl-8">
            <ul className="w-full">
              <li className="flex flex-row gap-2 border-b-2 p-1">
                <Checkbox color="green" />
                <span className="text-sm">Sub Task 1</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsCard;
