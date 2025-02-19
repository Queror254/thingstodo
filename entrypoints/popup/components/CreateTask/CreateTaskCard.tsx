import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Data/firebase";
//import DefaultEditor from "../Editor/editor/DefaultEditor";
import CustomEditor from "../Editor/old/OldEditor";

interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  startDate: string;
  label: string;
  completed: boolean;
}

interface TaskCreationCardProps {
  isOpen: boolean;
  toggleTaskCreation: () => void;
}

const TaskCreationCard: React.FC<TaskCreationCardProps> = ({
  isOpen,
  toggleTaskCreation,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low", // Default priority
    startDate: "",
    label: "",
    completed: false, // Default to not completed
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Callback to update the description from Lexical editor
  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const tasksCollection = collection(db, "taskdb");
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
        startDate: formData.startDate ? new Date(formData.startDate) : null,
        subtask: [], // Initialize empty subtasks array
        userid: "user-id-placeholder", // Replace with actual user ID
        createdAt: new Date(),
      };

      await addDoc(tasksCollection, taskData);
      console.log("Task created successfully!");
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        startDate: "",
        label: "",
        completed: false,
      });

      // Toggle the task creation form after successful task creation
      toggleTaskCreation();
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-creation-card fixed top-0 left-0 w-full h-full mx-auto bg-white text-gray-700 rounded-lg shadow-lg z-50">
      <div className="h-full w-full flex flex-col px-10 py-4 text-start overflow-y-auto max-h-screen scrollbar-hide">
        <div className="flex flex-row w-full justify-end items-end text-end text-red-500">
          <button className="text-red-500 text-sm" onClick={toggleTaskCreation}>
            Close
          </button>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Create New Task
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description //
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter task description"
              rows={4}
              required
            ></textarea>
          </div> */}
          {/* Description (Lexical Editor) */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <CustomEditor onChange={handleDescriptionChange} />
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Label */}
          <div>
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700"
            >
              Label
            </label>
            <input
              type="text"
              id="label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a label (optional)"
            />
          </div>

          {/* Completed */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  completed: e.target.checked,
                }))
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="completed"
              className="ml-2 block text-sm text-gray-700"
            >
              Mark as Completed
            </label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`py-2 px-4 font-semibold rounded-md shadow-md text-white ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskCreationCard;
