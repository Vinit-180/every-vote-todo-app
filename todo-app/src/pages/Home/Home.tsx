import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Trash2, PlusCircle, XCircle, CheckCircle2, ArrowUpDown, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { useSelector } from 'react-redux';
// import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc'>('date-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { isAuthenticated, token } = useSelector((state: { auth: { isAuthenticated: boolean, token: string } }) => ({
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
    if (!isAuthenticated) {
      alert("Sorry you're not authorize duser");
      return;
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
  const updateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTodo || !editingTodo.title.trim()) return;

    setTodos(todos.map(todo =>
      todo.id === editingTodo.id ? editingTodo : todo
    ));
    setEditingTodo(null);
  };


  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filter and sort todos
  const filteredAndSortedTodos = [...todos]
    .filter(todo => {
      if (statusFilter === 'all') return true;
      return statusFilter === 'completed' ? todo.completed : !todo.completed;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortBy === 'date-asc' ? dateA - dateB : dateB - dateA;
    });

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTodos.length / itemsPerPage);
  const paginatedTodos = filteredAndSortedTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Card className="p-6 h-100 w-[50vh] min-w-[300px] container mx-auto my-4" >
        <form onSubmit={addTodo} className="space-y-4  ">
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
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={(value: 'all' | 'pending' | 'completed') => setStatusFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setSortBy(sortBy === 'date-asc' ? 'date-desc' : 'date-asc')}
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by Date
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {paginatedTodos.length} of {filteredAndSortedTodos.length} tasks
            </div>
          </div>
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
              {paginatedTodos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No tasks found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTodos.map((todo) => (
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
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingTodo(todo)}
                              className="hover:text-primary"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Task</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={updateTodo} className="space-y-4 mt-4">
                              <Input
                                type="text"
                                value={editingTodo?.title || ''}
                                onChange={(e) => setEditingTodo(prev => prev ? { ...prev, title: e.target.value } : null)}
                                placeholder="Task title..."
                                className="text-lg"
                              />
                              <Textarea
                                value={editingTodo?.description || ''}
                                onChange={(e) => setEditingTodo(prev => prev ? { ...prev, description: e.target.value } : null)}
                                placeholder="Task description..."
                                className="resize-none"
                              />
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {editingTodo ? format(new Date(editingTodo.dueDate), "PPP") : "Select date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={editingTodo?.dueDate}
                                    onSelect={(date) => date && setEditingTodo(prev => prev ? { ...prev, dueDate: date } : null)}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <div className="flex justify-end">
                                <Button type="submit">Save Changes</Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                        {/* <TableCell className="text-right"> */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTodo(todo.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}

export default Home
