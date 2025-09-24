'use client';

import React from 'react';
import Link from 'next/link'; // ✅ Next.js link
import { Github, Linkedin, Heart, Pill } from 'lucide-react';

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-[#e0f2e9] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pl-2">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center text-2xl font-bold text-[#2c7a2e] mb-4">
              <Pill className="mr-2" />
              <span>MediQuery</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              MediQuery provides health guidance and helps you find local medicines.
              Remember to always consult a healthcare professional for medical advice.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/kunalcoder45"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#2c7a2e] transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/kunal-sharma-software-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#2c7a2e] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2c7a2e] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#2c7a2e] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-600 hover:text-[#2c7a2e] transition-colors">Chat</Link>
              </li>
              <li>
                <Link href="/medicines" className="text-gray-600 hover:text-[#2c7a2e] transition-colors">Medicines</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#2c7a2e] transition-colors">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2c7a2e] mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-[#2c7a2e] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-[#2c7a2e] transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-600 hover:text-[#2c7a2e] transition-colors">Medical Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-[#a3d9a5] my-8" />

        <div className="flex flex-col items-center justify-center text-center mx-auto space-y-2">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} MediQuery. All rights reserved.
          </p>
          <p className="text-gray-600 flex items-center">
            Made with 
            {/* <Heart size={16} className="mx-1 text-red-500" /> */}
            ❤️for better health
          </p>
          <p className="text-gray-600 flex items-center">
            Develop By Kunal Sharma
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
