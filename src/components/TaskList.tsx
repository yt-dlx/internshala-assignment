// src/app/components/TaskList.tsx
"use client";
import { Trash2Icon, EditIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
};

type TaskListProps = {
  status: Task["status"];
  tasks: Task[];
  onTaskUpdate: () => void;
};

const deleteTask = async (id: number) => {
  const response = await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete task");
};

export default function TaskList({ status, tasks, onTaskUpdate }: TaskListProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onTaskUpdate();
    }
  });

  const statusColors = {
    "To Do": "border-gray-700",
    "In Progress": "border-yellow-700",
    Done: "border-green-700"
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-4 w-full">
      <h2 className={`text-lg sm:text-xl font-semibold mb-4 pb-2 border-b ${statusColors[status]} text-white`}>{status}</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No tasks</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="bg-gray-900 rounded-lg p-3 border border-gray-700 hover:shadow-sm transition-all group flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-200 text-sm sm:text-base">{task.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">{task.description}</p>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => deleteMutation.mutate(task.id)} className="text-red-500 hover:text-red-700 focus:outline-none">
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                  <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                    <EditIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
