"use client";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-gradient-to-r from-black via-gray-900 to-black shadow-lg border-b border-gray-800">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-3xl font-extrabold text-white hover:text-[#adfa1d] transition duration-300">
            ScoreStream (uetian)
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8 text-lg">
        <Link
          href="/dashboard"
          className="text-white hover:text-[#adfa1d] hover:underline transition duration-300"
        >
          Dashboard
        </Link>
        <Link
          href="/about"
          className="text-white hover:text-[#adfa1d] hover:underline transition duration-300"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-white hover:text-[#adfa1d] hover:underline transition duration-300"
        >
          Contact
        </Link>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton>
            <button className="px-5 py-2 border border-[#adfa1d] text-white rounded-lg hover:bg-[#adfa1d] hover:text-black transition duration-300">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md border border-gray-500 text-white hover:bg-gray-800 transition"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-black border border-gray-800 rounded-lg shadow-lg p-5 flex flex-col space-y-4 md:hidden">
          <Link
            href="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-[#adfa1d] hover:underline transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-[#adfa1d] hover:underline transition duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-[#adfa1d] hover:underline transition duration-300"
          >
            Contact
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-2 border border-[#adfa1d] text-white rounded-lg hover:bg-[#adfa1d] hover:text-black transition duration-300"
              >
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      )}
    </nav>
  );
}
