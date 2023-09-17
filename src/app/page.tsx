import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "./components/TodoItem";
import { Todo } from "@prisma/client";

function getTodos(): Promise<Todo[]> {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean): Promise<void>{
    "use server"
    await prisma.todo.update({where: {id}, data: {complete }})
}

export default async function Home(){
      {/*recives all todos putting them into a singular variable  */}
  const todos = await getTodos()
  

  return (
  <>
  <header className="flex justify-between items-center mb-4">
    <h1 className="text-2x1">Todos</h1>
    {/* Making the new button highlight when being hovered over */}
    <Link  
      className="border border-slate-300 text-slate-300 px-2 
      py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 
      outline-none"
      href="\new"
      > 
      New
      </Link>
  </header>
  <ul className="pl-4">
    {todos.map(todo => (
      <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
      ))}

  </ul>
  </>
  )
}

