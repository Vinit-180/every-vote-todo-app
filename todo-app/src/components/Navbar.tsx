import React from 'react'
import {  ListTodo, Moon, Sun } from "lucide-react";
import { LayoutDashboardIcon, LogOut, User } from "lucide-react";
import { ModeToggle } from "./Toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './Auth';
import { logout } from '@/redux/authSlice';

const Navbar = () => {

  // const isAuthenticated=useSelector((state: { auth: { isAuthenticated: boolean } })=>state.auth.isAuthenticated);
  const dispatch=useDispatch();
  const { isAuthenticated, token } = useSelector((state: { auth: { isAuthenticated: boolean, token:  string } }) => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
  }));
  console.log(isAuthenticated,token);
  const logoutUser=()=>{
    dispatch(logout());
  }
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ListTodo className="h-6 w-6" />
          <span className="text-lg font-semibold">TaskMaster</span>
        </div>
        <div className="flex items-center justify-center gap-4">
        <ModeToggle />
        {isAuthenticated===true ? <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32" align="end" forceMount>
              <DropdownMenuItem onClick={logoutUser} >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> : <Auth/>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
