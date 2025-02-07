"use client";

import React, { useState, useEffect } from 'react';
import { Menu, Home, Users, MessageSquare, Bell, User, Settings, LogOut, Heart, Share2, Sun, Moon, ChevronLeft, Image, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const Logo = () => (
  <svg viewBox="0 0 200 50" className="h-8 w-32">
    <rect x="5" y="10" width="30" height="30" fill="currentColor" className="text-blue-600 dark:text-blue-400" rx="2"/>
    <rect x="8" y="13" width="24" height="24" fill="currentColor" className="text-blue-700 dark:text-blue-500" rx="1"/>
    <g fill="currentColor" className="text-blue-200 dark:text-blue-300">
      {[16, 20, 24, 28].map(y => [11, 15, 19, 23].map(x => (<rect key={`${x}-${y}`} x={x} y={y} width="2" height="2"/>)))}
    </g>
    <text x="50" y="33" fontFamily="Arial" fontWeight="bold" fontSize="24" fill="currentColor" className="text-blue-600 dark:text-blue-400">DevKonek</text>
  </svg>
);

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface Post {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Post created:', content);
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="pt-4">
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src="/tech-avatar.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none dark:bg-gray-700 dark:text-gray-100"
            />
            <div className="flex justify-between items-center">
              <Button variant="outline" className="gap-2">
                <Image className="h-4 w-4" />
                Add Image
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!content.trim() || isSubmitting}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MobileNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 p-4 z-50">
    <Button onClick={toggleSidebar} variant="ghost" className="w-full justify-center">
      <Menu className="h-6 w-6" />
    </Button>
  </div>
);

const PostSkeleton = () => (
  <Card className="mb-4">
    <CardHeader className="flex flex-row items-center space-x-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-3 w-[150px]" />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-48 w-full mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </CardContent>
  </Card>
);

const menuItems: MenuItem[] = [
  { icon: Home, label: 'Feed' },
  { icon: Users, label: 'Connections' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: Bell, label: 'Notifications' },
  { icon: User, label: 'Profile' },
  { icon: Settings, label: 'Settings' },
  { icon: LogOut, label: 'Logout' }
];

const ProfessionalFeed: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState('Feed');
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockPosts: Post[] = [
          ///TEMPORARY POST  
          
          {
              
              id: 1,
              author: 'Christian Dev',
              authorAvatar: '/tech-avatar.jpg',
              content: 'THIS A TEST POST.',
              image: 'https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/476167125_122201509424232252_7326839644613946461_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeGn4GyxsO79RTqDkHDrxoe6zNPNKOvMjbbM080o68yNth60CKWFGS-MfTzBKRGFjuf3wzUl9hM1fKIGKxP5J11-&_nc_ohc=cBWc49OkGDAQ7kNvgE6PY9-&_nc_oc=AdjGu1M52hww9LmlygVjonVBKHCzLlGp6uYvyEUeCF0tItl4SRF7fE8b1GXZJsXR_V8&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=AgzvX2VnFtCRKPnU1irN_4V&oh=00_AYDJqNxIziaYSHNTnSd2OwSW0HiHHndPuxdQ1IUR9YEwyw&oe=67ABF959',
              timestamp: '1 min ago.',
              likes: 42,
              comments: 7
            },
        ];
        setPosts(mockPosts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className={`
        fixed h-full bg-white dark:bg-gray-900 border-r dark:border-gray-700 
        transition-all duration-300 ease-in-out z-50
        ${isSidebarOpen ? 'w-72' : 'w-0 md:w-20'} 
        ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''}
      `}>
        <div className="flex items-center justify-between p-4">
          <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
            <Logo />
          </div>
          <Button
            variant="ghost"
            onClick={toggleSidebar}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 absolute -right-4 top-6
              ${isMobile ? 'hidden' : 'block'}
            `}
          >
            <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
          </Button>
        </div>
        
        <div className="space-y-2 p-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`
                flex items-center w-full p-3 rounded-lg transition-all duration-200
                ${activeItem === item.label 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                ${!isSidebarOpen && !isMobile ? 'justify-center' : ''}
              `}
              onClick={() => {
                setActiveItem(item.label);
                if (isMobile) setIsSidebarOpen(false);
              }}
            >
              <item.icon className={`h-5 w-5 ${!isSidebarOpen && !isMobile ? 'mx-auto' : 'mr-3'}`} />
              <span className={`text-sm font-medium transition-opacity duration-300 
                ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 md:hidden'}
              `}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`
        flex-1 transition-all duration-300 
        ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'} 
        ${isMobile ? 'ml-0' : ''}
        p-4 md:p-6 pb-20 md:pb-6
      `}>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold dark:text-white">
              {activeItem === 'Feed' ? 'Discover' : activeItem}
            </h1>
            <Button 
              variant="ghost" 
              onClick={() => setDarkMode(!darkMode)}
              className="dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <CreatePost />

          {isLoading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : (
            posts.map(post => (
              <Card key={post.id} className="mb-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.authorAvatar} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold dark:text-white">{post.author}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="w-full h-48 md:h-64 object-cover rounded-lg mb-3" 
                    />
                  )}
                  <p className="text-sm dark:text-gray-200">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-4">
                    <Button variant="ghost" className="flex items-center">
                      <Heart className="mr-2" />
                      {post.likes} Likes
                    </Button>
                    <Button variant="ghost" className="flex items-center">
                      <MessageSquare className="mr-2" />
                      {post.comments} Comments
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
      
      {isMobile && <MobileNav toggleSidebar={toggleSidebar} />}
    </div>
  );
};

export default ProfessionalFeed;
