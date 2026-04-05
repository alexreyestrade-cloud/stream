"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] transition-all">
            P
          </div>
          <span className="font-bold text-xl tracking-tight">ONLY PREMIUM</span>
        </Link>
        <div className="flex items-center gap-6">
          {!isAdmin && (
            <Link 
              href="/admin" 
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
