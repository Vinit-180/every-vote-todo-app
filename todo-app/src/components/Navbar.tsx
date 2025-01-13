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
import { useSelector } from 'react-redux';
import Auth from './Auth';

const Navbar = () => {

  const isAuthenticated=useSelector((state: { auth: { isAuthenticated: boolean } })=>state.auth.isAuthenticated);
  console.log(isAuthenticated);
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
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem >
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
