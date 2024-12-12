// src/app/page.tsx
"use client";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { useQuery } from "@tanstack/react-query";
import SideBar from "../components/SideBar";
import Graphs from "../components/Graphs";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
};

const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("/api/tasks");
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: tasks = [], error, isLoading, refetch } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  const groupedTasks = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Done: tasks.filter((task) => task.status === "Done")
  };

  const taskDataForGraphs = Object.entries(groupedTasks).map(([status, columnTasks]) => ({
    status,
    count: columnTasks.length
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col md:flex-row">
        <SideBar />
        <main className="flex-1 p-4 md:p-8 max-w-full mx-auto text-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <h1 className="text-2xl sm:text-3xl font-semibold">Your Tasks</h1>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
          {isFormOpen && (
            <div className="mb-8">
              <TaskForm
                onSuccess={() => {
                  setIsFormOpen(false);
                  refetch();
                }}
              />
            </div>
          )}
          {isLoading && <div className="text-center text-gray-400 py-8">Loading tasks...</div>}
          {error && <div className="text-center text-red-500 py-8">Error: {error instanceof Error ? error.message : "Unknown error"}</div>}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            {Object.entries(groupedTasks).map(([status, columnTasks]) => (
              <TaskList key={status} status={status as Task["status"]} tasks={columnTasks} onTaskUpdate={refetch} />
            ))}
          </div>
          <Graphs data={taskDataForGraphs} />
        </main>
      </div>
    </div>
  );
}
