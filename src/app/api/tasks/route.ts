// src/app/api/tasks/route.ts
type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
};

let tasks: Task[] = [];

export async function GET() {
  return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST(req: Request) {
  const newTask: Omit<Task, "id"> = await req.json();
  const task: Task = { ...newTask, id: tasks.length + 1 };
  tasks.push(task);
  return new Response(JSON.stringify(task), { status: 201 });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = parseInt(url.searchParams.get("id") || "0", 10);
  tasks = tasks.filter((task) => task.id !== id);
  return new Response("Task deleted", { status: 200 });
}
