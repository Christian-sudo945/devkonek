
"use client";



import { useState, useEffect } from 'react';
import { SignInForm } from '@/components/form/Signin';
import { SignUpForm } from '@/components/form/Signup';
import { LandingPage } from "@/components/ui/Landing"
import { Sun, Moon } from 'lucide-react';

const Logo = () => (
  <svg viewBox="0 0 200 50" className="h-8 w-32">
    <rect x="5" y="10" width="30" height="30" fill="currentColor" className="text-blue-600 dark:text-blue-400" rx="2"/>
    <rect x="8" y="13" width="24" height="24" fill="currentColor" className="text-blue-700 dark:text-blue-500" rx="1"/>
    <g fill="currentColor" className="text-blue-200 dark:text-blue-300">
      <rect x="11" y="16" width="2" height="2"/>
      <rect x="15" y="16" width="2" height="2"/>
      <rect x="19" y="16" width="2" height="2"/>
      <rect x="23" y="16" width="2" height="2"/>
      <rect x="11" y="20" width="2" height="2"/>
      <rect x="15" y="20" width="2" height="2"/>
      <rect x="19" y="20" width="2" height="2"/>
      <rect x="23" y="20" width="2" height="2"/>
      <rect x="11" y="24" width="2" height="2"/>
      <rect x="15" y="24" width="2" height="2"/>
      <rect x="19" y="24" width="2" height="2"/>
      <rect x="23" y="24" width="2" height="2"/>
      <rect x="11" y="28" width="2" height="2"/>
      <rect x="15" y="28" width="2" height="2"/>
      <rect x="19" y="28" width="2" height="2"/>
      <rect x="23" y="28" width="2" height="2"/>
    </g>
    <path d="M35 25 H 45" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="1"/>
    <path d="M35 20 H 42" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="1"/>
    <path d="M35 30 H 40" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="1"/>
    <text x="50" y="33" fontFamily="Arial" fontWeight="bold" fontSize="24" fill="currentColor" className="text-blue-600 dark:text-blue-400">
      DevKonek
    </text>
  </svg>
);

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [authView, setAuthView] = useState<'landing' | 'signin' | 'signup'>('landing');
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setAuthView('landing')} className="flex items-center">
              <Logo />
            </button>
            <div className="flex items-center gap-4">
              {authView === 'landing' && (
                <>
                  <button
                    onClick={() => setAuthView('signin')}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthView('signup')}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                </>
              )}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {authView === 'landing' ? (
        <LandingPage />
      ) : (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md shadow-xl">
            <div className="mb-8 flex justify-center">
              <Logo />
            </div>

            <div className="mb-8">
              <div className="flex space-x-2 mb-8">
                <button
                  onClick={() => setAuthView('signin')}
                  className={`flex-1 text-center py-3 rounded-lg font-medium transition-colors ${
                    authView === 'signin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthView('signup')}
                  className={`flex-1 text-center py-3 rounded-lg font-medium transition-colors ${
                    authView === 'signup'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {authView === 'signin' ? <SignInForm /> : <SignUpForm />}
            </div>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <p>
                {authView === 'signin' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setAuthView('signup')}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Create one
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setAuthView('signin')}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
            
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="sr-only">Sign in with Google</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
              </button>

              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="sr-only">Sign in with GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </button>

              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="sr-only">Sign in with Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
            </div>

            <p className="mt-6 text-xs text-center text-gray-600 dark:text-gray-400">
              By signing up, you agree to our{' '}
              <button className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</button>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}