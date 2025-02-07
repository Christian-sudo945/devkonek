"use client";


import React, { useState, useEffect, ReactNode } from 'react';
import { 
  Home, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  MessageSquare, 
  Sun, 
  Moon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg viewBox="0 0 200 50" className="h-8 w-auto">
      <rect x="5" y="10" width="30" height="30" fill="currentColor" className="text-blue-600 dark:text-blue-400" rx="2"/>
      <rect x="8" y="13" width="24" height="24" fill="currentColor" className="text-blue-700 dark:text-blue-500" rx="1"/>
      <g fill="currentColor" className="text-blue-200 dark:text-blue-300">
        {[16, 20, 24, 28].map(y => 
          [11, 15, 19, 23].map(x => (
            <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2"/>
          ))
        )}
      </g>
    </svg>
    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">DevKonek</span>
  </div>
);

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Bell, label: 'Notifications' },
    { icon: User, label: 'Profile' }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 h-full p-4 space-y-2">
      {menuItems.map((item) => (
        <button
          key={item.label}
          className={`
            flex items-center w-full p-3 rounded-lg transition-colors 
            ${activeItem === item.label 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
          `}
          onClick={() => setActiveItem(item.label)}
        >
          <item.icon className="mr-3 h-5 w-5" />
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
      <div className="pt-4 mt-auto border-t dark:border-gray-700">
        <button className="flex items-center w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <Settings className="mr-3 h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button className="flex items-center w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-red-600 dark:text-red-400">
          <LogOut className="mr-3 h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-4">
          <MobileSidebar />
          <Logo />
        </div>
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 dark:bg-gray-800 dark:border-gray-700" 
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <div className="relative">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <Avatar>
                <AvatarImage src="/avatar.jpg" alt="User Avatar" />
                <AvatarFallback>CD</AvatarFallback>
              </Avatar>
              <span className="hidden md:block">Christian | Dev</span>
            </Button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <Button variant="ghost" className="w-full justify-start px-4 py-2 text-sm">
                    <User className="h-4 w-4 mr-2" />Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start px-4 py-2 text-sm">
                    <Settings className="h-4 w-4 mr-2" />Settings
                  </Button>
                  <hr className="my-1 dark:border-gray-700" />
                  <Button variant="ghost" className="w-full justify-start px-4 py-2 text-sm text-red-600 dark:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto mt-16 flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
