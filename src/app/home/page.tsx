"use client";

import { useState, useEffect, ReactNode } from 'react';
import { Sun, Moon, Settings, LogOut, User, Bell, Search, ChevronDown, MessageSquare, Heart, Share2, MoreVertical, Image, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';






interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-40">
        {children}
      </div>
    </>
  );
};

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">Logo</span>
          </div>
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input type="text" placeholder="Search..." className="pl-10" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="relative">
              <Button variant="ghost" onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                <Avatar src="https://grallc.github.io/img/avatar.jpg" alt="Christian | Dev" />
                <span className="hidden md:block">Christian | Dev</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <DropdownMenu isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
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
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NewsFeed: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    const post = {
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src="api/avatar.jpg" />
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <Textarea placeholder="What's on your mind?" value={newPost} onChange={(e) => setNewPost(e.target.value)} className="flex-1" />
          </div>
          <Button onClick={handlePostSubmit}>Post</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-16">
        <NewsFeed />
        {children}
      </main>
    </div>
  );
};



export default Layout;