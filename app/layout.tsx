// app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ProgressBar from "../components/ProgressBar";
import Head from "next/head";

export const metadata = {
  title: "ScoreStream - UET GPA Calculator",
  description:
    "Calculate your GPA and CGPA easily with our modern, responsive, and SEO-friendly application designed exclusively for UET Lahore students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <meta
          name="description"
          content="Calculate your GPA and CGPA easily with our modern, responsive, and SEO-friendly application designed exclusively for UET Lahore students."
        />
        <meta property="og:title" content="UET GPA Calculator" />
        <meta
          property="og:description"
          content="Calculate your GPA and CGPA easily with our modern, responsive, and SEO-friendly application designed exclusively for UET Lahore students."
        />
      </Head>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors flex flex-col min-h-screen">
        <ClerkProvider>
          <header className="sticky top-0 z-50">
            <NavBar />
            {/* Progress Bar appears right under the NavBar */}
            <ProgressBar />
          </header>
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
