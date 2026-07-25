import React from 'react'
import { Link } from 'react-router-dom'
import Profile from '../../Pages/Profile/Profile'
import Home from '../../Pages/Home/Home'


export default function Footer() {
  
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* الصف الاول */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
            
            {/* 1. اللوجو والوصف */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold text-white">YourApp</h2>
              <p className="text-slate-400 mt-2 text-sm">
                Share your thoughts, connect with people, and join the conversation.
              </p>
            </div>

            {/* 2. لينكات سريعة */}
            <div>
              <h3 className="font-semibold text-white mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to={"/Home"}  className="hover:text-white transition-colors">Home </Link></li>
                <li><Link to={'/profile'} className="hover:text-white transition-colors">Profile</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            {/* 3. السوشيال - الحل النهائي */}
            <div>
              <h3 className="font-semibold text-white mb-3">Elsewhere:</h3>
              <div className="flex items-center gap-3">
                <a href="#" title="Facebook" className="bg-white p-2.5 rounded-full hover:bg-slate-200 transition">
                  <svg className="w-5 h-5 fill-[#1877f2]" viewBox="0 0 506.86 506.86"><path d="M506.86,253.43C506.86,113.46,393.39,0,253.43,0S0,113.46,0,253.43C0,379.92,92.68,484.77,213.83,503.78V326.69H149.48V253.43h64.35V197.6c0-63.52,37.84-98.6,95.72-98.6,27.73,0,56.73,5,56.73,5v62.36H334.33c-31.49,0-41.3,19.54-41.3,39.58v47.54h70.28l-11.23,73.26H293V503.78C414.18,484.77,506.86,379.92,506.86,253.43Z" /><path fill="#fff" d="M352.08,326.69l11.23-73.26H293V205.89c0-20,9.81-39.58,41.3-39.58h31.95V104s-29-5-56.73-5c-57.88,0-95.72,35.08-95.72,98.6v55.83H149.48v73.26h64.35V503.78a256.11,256.11,0,0,0,79.2,0V326.69Z" /></svg>
                </a>
                <a href="#" title="Twitter" className="bg-white p-2.5 rounded-full hover:bg-slate-200 transition">
                  <svg className="w-5 h-5 fill-[#1da1f2]" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" title="LinkedIn" className="bg-white p-2.5 rounded-full hover:bg-slate-200 transition">
                  <svg className="w-5 h-5 fill-[#0077b5]" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM7.5 8.25A1.75 1.75 0 118 6.5a1.75 1.75 0 01-.5 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
                </a>
                <a href="#" title="Github" className="bg-white p-2.5 rounded-full hover:bg-slate-200 transition">
                  <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>

        </div>

        {/* الصف التاني: الحقوق */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} YourApp. All rights reserved. Made with ❤️
        </div>

      </div>
    </footer>
  )
}