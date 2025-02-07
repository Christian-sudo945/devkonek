"use client";

import React, { useState, useEffect } from 'react';
import { User, Shield, Upload, Settings, LogOut, Sun, Moon, Check, X, Mail, Phone, Key, Globe, Menu, X as Close } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface UserData {
  id: string;
  email: string;
  username: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: string;
  isVerified: boolean;
  lastLogin: string;
  bio: string;
  status: string;
  ipAddress: string;
  phone?: string;
}

const Logo = () => (
  <svg viewBox="0 0 200 50" className="h-8 w-32">
    <rect x="5" y="10" width="30" height="30" fill="currentColor" className="text-blue-600 dark:text-blue-400" rx="2"/>
    <rect x="8" y="13" width="24" height="24" fill="currentColor" className="text-blue-700 dark:text-blue-500" rx="1"/>
    <g fill="currentColor" className="text-blue-200 dark:text-blue-300">
      {[16, 20, 24, 28].map(y => 
        [11, 15, 19, 23].map(x => (
          <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2"/>
        ))
      )}
    </g>
    <text x="50" y="33" fontFamily="Arial" fontWeight="bold" fontSize="24" fill="currentColor" className="text-blue-600 dark:text-blue-400">DevKonek</text>
  </svg>
);

const ProfileContent = ({ userData }: { userData: UserData }) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-4">
      <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img src={userData?.profilePicture || "/api/avatar.jpg"} alt="Profile" className="rounded-full" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{userData?.firstName} {userData?.lastName}</h3>
        <p className="text-gray-500 dark:text-gray-400">{userData?.role}</p>
        <div className="flex space-x-2 mt-2">
          {userData.isVerified && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Check className="w-3 h-3 mr-1" /> Verified
            </Badge>
          )}
          {!userData.isVerified && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <X className="w-3 h-3 mr-1" /> Phone Unverified
            </Badge>
          )}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input value={userData?.email || "Not available"} readOnly />
      <Input value={userData?.username || "Not available"} readOnly />
      <Input value={userData?.ipAddress || "Not available"} readOnly />
      <Input value={userData?.bio || "Not available"} readOnly />
    </div>

    <Button className="mt-4">Edit Profile</Button>
  </div>
);

const VerificationContent = ({ userData }: { userData: UserData }) => (
  <div className="space-y-6">
    <Alert>
      <AlertDescription>
        Complete the verification steps to unlock all features
      </AlertDescription>
    </Alert>

    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-medium">Email Verification</p>
            <p className="text-sm text-gray-500">{userData?.email || "Not available"}</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-700">Verified</Badge>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="font-medium">Phone Verification</p>
            <p className="text-sm text-gray-500">{userData?.phone || "Not available"}</p>
          </div>
        </div>
        <Button size="sm">Verify Now</Button>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium">ID Verification</p>
            <p className="text-sm text-gray-500">Government issued ID required</p>
          </div>
        </div>
        <Button size="sm" variant="outline">Upload ID</Button>
      </div>
    </div>
  </div>
);

const SecurityContent = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Password</label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">New Password</label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm New Password</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <Button disabled={!currentPassword || !newPassword || !confirmPassword}>
        Update Password
      </Button>

      <hr className="my-6" /> 

      <div className="space-y-4">
        <h4 className="font-medium">Two-Factor Authentication</h4>
        <Button variant="outline">Enable 2FA</Button>
      </div>
    </div>
  );
};

const DocumentUploadContent = () => (
  <div className="space-y-6">
    <Alert>
      <AlertDescription>
        Upload a valid government-issued ID for verification
      </AlertDescription>
    </Alert>

    <div className="border-2 border-dashed rounded-lg p-8 text-center">
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <div className="mt-4">
        <Button>Choose File</Button>
        <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 10MB</p>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();

    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const sections = {
    profile: { title: 'User Profile', icon: User, content: () => <ProfileContent userData={userData!} /> },
    verification: { title: 'Verification', icon: Shield, content: () => <VerificationContent userData={userData!} /> },
    documents: { title: 'Documents', icon: Upload, content: () => <DocumentUploadContent /> },
    settings: { title: 'Settings', icon: Settings, content: () => <SecurityContent /> },
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-800 ${isMobile ? 'p-4' : ''}`}>
      <div className="flex items-center justify-between py-4">
        <Logo />
        <div className="flex items-center space-x-4">
          <Button onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden">
            {isMobileMenuOpen ? <Close className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className={`lg:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="space-y-4">
            {Object.entries(sections).map(([key, { title, icon }]) => (
              <Button key={key} onClick={() => setActiveSection(key)} variant={activeSection === key ? 'outline' : 'ghost'} className="flex items-center space-x-2">
                {React.createElement(icon, { className: 'h-5 w-5' })}
                <span>{title}</span>
              </Button>
            ))}
          </nav>
        </div>

        <div className="col-span-1 lg:col-span-3">
          {sections[activeSection]?.content()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
