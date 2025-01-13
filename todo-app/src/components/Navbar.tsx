import React from 'react'
import { ListTodo, Moon, Sun } from "lucide-react";
import { ModeToggle } from "./Toggle";
const Navbar = () => {
  return (
<nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ListTodo className="h-6 w-6" />
          <span className="text-lg font-semibold">TaskMaster</span>
        </div>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
