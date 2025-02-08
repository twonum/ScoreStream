/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import BackButton from "../../components/BackButton";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import useSWR from "swr";

/**
 * A simple fetcher function used by SWR for data caching.
 */
const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Type for calculation data fetched from MongoDB.
 */
export type CalculationData = {
  _id: string;
  semesters: any[];
  result: { cgpa: number };
  createdAt: string;
};

interface HistoryCanvasProps {
  userId: string;
}

/**
 * HistoryCanvas component displays the calculation history with real‑time auto‑refresh.
 */
function HistoryCanvas({ userId }: HistoryCanvasProps) {
  const { data, error, mutate } = useSWR<{ calculations: CalculationData[] }>(
    `/api/getCalculations?userId=${userId}`,
    fetcher,
    { refreshInterval: 5000 }
  );
  const [calculations, setCalculations] = useState<CalculationData[]>([]);

  useEffect(() => {
    if (data && data.calculations) {
      setCalculations(data.calculations);
    }
  }, [data]);

  /**
   * Delete a calculation entry from MongoDB and revalidate cache.
   */
  const handleDelete = async (calculationId: string) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the calculation.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmed.isConfirmed) {
      try {
        const res = await fetch(
          `/api/deleteCalculation?calculationId=${calculationId}&userId=${userId}`,
          { method: "DELETE" }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        Swal.fire("Deleted!", "Your calculation has been deleted.", "success");
        mutate(); // Refresh the SWR cache
      } catch (error: any) {
        Swal.fire(
          "Error",
          error.message || "Error deleting calculation.",
          "error"
        );
      }
    }
  };

  /**
   * Edit a calculation’s CGPA value (for demonstration).
   */
  const handleEdit = async (calculation: CalculationData) => {
    const { value: newCGPA } = await Swal.fire({
      title: "Edit Calculation",
      input: "text",
      inputLabel: "Enter new CGPA",
      inputValue: calculation.result.cgpa,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || isNaN(Number(value))) {
          return "Please enter a valid number.";
        }
      },
    });
    if (newCGPA) {
      try {
        const res = await fetch("/api/updateCalculation", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calculationId: calculation._id,
            userId,
            semesters: calculation.semesters,
            result: { cgpa: parseFloat(newCGPA) },
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        Swal.fire("Updated!", "Calculation has been updated.", "success");
        mutate(); // Refresh cache after update
      } catch (error: any) {
        Swal.fire(
          "Error",
          error.message || "Error updating calculation.",
          "error"
        );
      }
    }
  };

  return (
    <div className="bg-white text-gray-900 rounded-lg shadow-xl p-6 sm:p-8 w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Calculation History
      </h2>
      {error && (
        <p className="text-red-600 text-center">Error loading calculations.</p>
      )}
      {!data && <p className="text-xl text-center">Loading...</p>}
      {data && calculations.length === 0 ? (
        <p className="text-xl text-center">No saved calculations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculations.map((calc) => (
            <div
              key={calc._id}
              className="border p-4 sm:p-6 rounded-lg shadow-md bg-gray-50"
            >
              <p className="text-lg font-semibold">
                CGPA: <span className="text-[#adfa1d]">{calc.result.cgpa}</span>
              </p>
              <p className="text-sm text-gray-600">
                Saved on: {new Date(calc.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  onClick={() => handleEdit(calc)}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(calc._id)}
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Dashboard component provides a user-friendly landing page with history view.
 */
export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // If the user is not signed in, show a sign-in prompt.
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center overflow-x-hidden">
        <Head>
          <title>Sign In - ScoreStream Dashboard</title>
          <meta
            name="description"
            content="Sign in to access your ScoreStream dashboard and view real-time GPA &amp; CGPA calculations exclusively for UET Lahore students."
          />
          <meta
            name="keywords"
            content="UET Dashboard, GPA Calculator, CGPA Calculator, ScoreStream, University of Engineering and Technology Lahore, sign in, academic tool"
          />
          <link rel="canonical" href="https://www.example.com/dashboard" />
        </Head>
        <p className="text-xl mb-6">Please sign in to view your dashboard.</p>
        <Button
          onClick={() => router.push("/sign-in")}
          variant="outline"
          size="lg"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-x-hidden">
      <Head>
        <title>Dashboard - ScoreStream: UET GPA &amp; CGPA Calculator</title>
        <meta
          name="description"
          content="Access your ScoreStream dashboard to view and manage your GPA &amp; CGPA calculations in real time. Exclusively built for UET Lahore students with secure data handling and performance analytics."
        />
        <meta
          name="keywords"
          content="UET Dashboard, GPA Calculator, CGPA Calculator, ScoreStream, University of Engineering and Technology Lahore, academic progress, secure data"
        />
        <link rel="canonical" href="https://www.example.com/dashboard" />
      </Head>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 p-8">
        <BackButton />
        {/* Hero Section */}
        <section className="text-center py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-wide">
            Welcome to ScoreStream: UET GPA &amp; CGPA Calculator
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
            Exclusively designed for the students of University of Engineering
            and Technology Lahore, our cutting-edge calculator empowers you to
            effortlessly compute your GPA and CGPA. Enjoy a sleek, modern
            interface with adaptive dark/light themes and robust functionality
            to track your academic progress in real time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Button
              onClick={() => setShowHistory((prev) => !prev)}
              variant="outline"
              size="lg"
            >
              {showHistory ? "Hide History" : "View Calculation History"}
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-700 rounded-lg hover:shadow-2xl transition transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4">Real-Time Calculation</h2>
              <p className="text-gray-300">
                Compute your GPA and CGPA instantly with precise, real-time
                calculations.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg hover:shadow-2xl transition transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4">
                User-Friendly Interface
              </h2>
              <p className="text-gray-300">
                Enjoy a modern, responsive design optimized for any device.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg hover:shadow-2xl transition transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4">Secure Data Storage</h2>
              <p className="text-gray-300">
                Your calculations are stored securely with Clerk authentication
                and MongoDB integration.
              </p>
            </div>
          </div>
        </section>

        {/* History Canvas Section */}
        {showHistory && (
          <section className="py-8 sm:py-12">
            <div className="border-t border-gray-700 pt-8">
              <HistoryCanvas userId={user.id} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
