import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Trash2, PlusCircle, XCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved, (key, value) => 
      key === 'dueDate' ? new Date(value) : value
    ) : [];
  });
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
  });
  const { isAuthenticated, token } = useSelector((state: { auth: { isAuthenticated: boolean, token:  string } }) => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
  }));
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    console.log();
    if(!isAuthenticated){
      alert("Sorry you're not authorize duser");
      return ;
    }

    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        title: newTodo.title.trim(),
        description: newTodo.description.trim(),
        completed: false,
        dueDate: newTodo.dueDate,
      },
    ]);
    setNewTodo({
      title: '',
      description: '',
      dueDate: new Date(),
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
        <Card className="p-6 h-100 w-[50vh] min-w-[300px] container mx-auto my-4" >
            <form onSubmit={addTodo} className="space-y-4">
              <Input
                type="text"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="Task title"
                className="text-lg"
                name="title"
                required={true}
              />
              <Textarea
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Task description"
                className="resize-none"
                required={true}
                name="description"
              />
              <div className="flex sm:flex-row flex-col gap-4 justify-center items-center min-w-[240px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(newTodo.dueDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newTodo.dueDate}
                      onSelect={(date) => date && setNewTodo({ ...newTodo, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button type="submit" className='w-[100%] justify-start'>
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Task
                </Button>
              </div>
            </form>
          </Card>
          <main className=" px-4 py-8 max-w-7xl mx-auto">
          <Card>
          <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">TASK</TableHead>
                  <TableHead className="w-[200px]">DUE DATE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  todos.map((todo) => (
                    <TableRow key={todo.id}>
                      <TableCell>
                          <p className={cn(
                            "font-medium",
                            todo.completed && "line-through text-muted-foreground"
                          )}>
                            {todo.title}
                          </p>
                          {todo.description && (
                            <p className={cn(
                              "text-sm text-muted-foreground",
                              todo.completed && "line-through"
                            )}>
                              {todo.description}
                            </p>
                          )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(todo.dueDate), "PPP")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTodo(todo.id)}
                          className={cn(
                            "hover:text-foreground",
                            todo.completed ? "text-green-500" : "text-yellow-500"
                          )}
                        >
                          {todo.completed ? (
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                          ) : (
                            <XCircle className="h-4 w-4 mr-1" />
                          )}
                          {todo.completed ? "Completed" : "Pending"}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTodo(todo.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            </Card>
          </main>
    </div>
  )
}

export default Home
