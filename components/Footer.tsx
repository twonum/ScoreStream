"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-4 overflow-x-hidden flex flex-col items-center mt-12 md:mt-24 pb-8 space-y-6 text-gray-400">
      {/* Separator */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="w-full h-px bg-gradient-to-r from-gray-600 to-gray-400 mb-8"></div>
      </div>

      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-6">
        <a
          href="https://taha-saleem.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/portfolio.svg"
            alt="Portfolio"
            width={32}
            height={32}
            className="hover:opacity-80 transition-all duration-300 transform hover:scale-110"
          />
        </a>
        <a
          href="https://github.com/twonum"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/github.svg"
            alt="GitHub"
            width={32}
            height={32}
            className="hover:opacity-80 transition-all duration-300 transform hover:scale-110"
          />
        </a>
        <a
          href="https://linkedin.com/in/taha-saleem/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/linkedin.svg"
            alt="LinkedIn"
            width={32}
            height={32}
            className="hover:opacity-80 transition-all duration-300 transform hover:scale-110"
          />
        </a>
      </div>

      {/* Copyright & Links */}
      <p className="text-sm">&copy; 2024 ScoreStream. All rights reserved.</p>
      <Link href="/terms" className="text-sm hover:underline">
        Terms and Conditions
      </Link>

      {/* Designer Credit */}
      <div className="text-center mt-6 text-lg font-semibold">
        <p className="design-credit text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 text-2xl">
          Designed by{" "}
          <span className="designer-name">Muhammad Taha Saleem</span>
        </p>
      </div>

      <style jsx>{`
        .design-credit {
          font-size: 1.8rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          transition: transform 0.3s ease, text-shadow 0.3s ease,
            color 0.5s ease;
          position: relative;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }

        .design-credit:hover {
          color: #f0f0f0;
          text-shadow: 0 0 25px rgba(255, 255, 255, 0.7),
            0 0 35px rgba(255, 255, 255, 0.9);
          transform: scale(1.15);
        }

        .designer-name {
          position: relative;
          display: inline-block;
          font-size: 2rem;
          animation: pulse 1.5s infinite ease-in-out;
        }

        .designer-name::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #f0f0f0, #d0d0d0);
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }

        .designer-name:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .designer-name:hover {
          color: #f0f0f0;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.75;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </footer>
  );
}
