import React, { useState } from 'react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from './ui/input';
import { LogIn, UserPlus } from "lucide-react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { login } from '@/redux/authSlice';
const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]=useState('');
  const dispatch=useDispatch();
  const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    
    console.log(data); // You can now use this data object as needed
    axios.post(`${import.meta.env.VITE_APP_API_KEY}auth/login`,data).then((data)=>{
      console.log(data);
      setIsLoading(false);
      const token=data.data.token as string;
      console.log(token);
      dispatch(login(token));
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false);
    })
    // Add sign in logic here
    // setTimeout(() => setIsLoading(false), 1000);
  };

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    console.log(data); // You can now use this data object as needed
    axios.post(`${import.meta.env.VITE_APP_API_KEY}auth/register`,data).then((data)=>{
      console.log(data);
      alert("Now please do the signin");
      setIsLoading(false);
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false);
    })
    // Add sign up logic here
    // setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button>
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        {error && <h1 className='text-red-600 text-center text-xl'> {error} </h1>}
        <DialogTitle>Welcome to TaskMaster</DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <form onSubmit={onSignIn} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="signin-email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="signin-password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin">⌛</div>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form onSubmit={onSignUp} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="name">User Name</label>
              <Input
                id="name"
                type="text"
                name="username"
                placeholder="John 123"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="signup-email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="signup-password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin">⌛</div>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </>
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
  )
}

export default Auth
