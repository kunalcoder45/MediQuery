// src/app/not-found.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Animated 404 */}
        <div className="relative">
          <div className="text-9xl font-bold text-red-100 select-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle className="h-20 w-20 text-red-500 animate-bounce" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            The page you're looking for seems to have taken a sick day. 
            Let's get you back to health! 🏥
          </p>
        </div>

        {/* Medical-themed illustration */}
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-full shadow-lg">
            <div className="text-4xl">🩺</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 shadow-lg">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </Link>
          
          <Button 
            size="lg"
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto shadow-lg border-2"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-4">
            Quick Navigation
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link 
              href="/" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/70 transition-colors"
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link 
              href="/auth/login" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/70 transition-colors"
            >
              <span>🔐</span>
              <span>Sign In</span>
            </Link>
            <Link 
              href="/about" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/70 transition-colors"
            >
              <span>ℹ️</span>
              <span>About</span>
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/70 transition-colors"
            >
              <span>📞</span>
              <span>Contact</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            Error Code: 404 - Resource Not Found
          </p>
          <p className="text-xs text-gray-400">
            MediQuery AI - Always Here for Your Health
          </p>
        </div>
      </div>
    </div>
  );
}