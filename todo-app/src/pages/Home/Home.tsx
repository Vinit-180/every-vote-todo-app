import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Trash2, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { useSelector } from 'react-redux';

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

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    
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
        <Card className="p-6 mb-8 h-100 w-[50vh]">
            <form onSubmit={addTodo} className="space-y-4">
              <Input
                type="text"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="Task title"
                className="text-lg"
                required={true}
              />
              <Textarea
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Task description"
                className="resize-none"
                required={true}
              />
              <div className="flex justify-between items-center">
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
                <Button type="submit">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Task
                </Button>
              </div>
            </form>
          </Card>
    </div>
  )
}

export default Home
