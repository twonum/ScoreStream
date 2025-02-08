/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Calculator from "./Calculator";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function CalculatorWithHistory() {
  const { user } = useUser();
  const router = useRouter();
  // Holds the current calculation data (semesters and result) from Calculator.
  const [calculationData, setCalculationData] = useState<{
    semesters: any;
    result: { cgpa: number };
  } | null>(null);
  // Use a key to force remounting the Calculator (resetting its state).
  const [calcKey, setCalcKey] = useState(0);
  // State to hold the history of saved calculations from MongoDB.
  const [savedCalculations, setSavedCalculations] = useState<any[]>([]);

  // Fetch saved calculations from the database if user is signed in.
  const fetchSavedCalculations = async () => {
    if (user) {
      try {
        const res = await fetch(`/api/getCalculations?userId=${user.id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setSavedCalculations(data.calculations);
      } catch (error: any) {
        console.error("Error fetching calculations:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load saved calculations.",
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedCalculations();
    }
  }, [user]);

  const handleSaveCalculation = async () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Not Signed In",
        text: "Please sign in to save your calculation history.",
      });
      return;
    }
    if (!calculationData) {
      Swal.fire({
        icon: "error",
        title: "No Calculation",
        text: "Please calculate your GPA/CGPA before saving.",
      });
      return;
    }
    const confirmResult = await Swal.fire({
      title: "Confirm Save",
      text: "Do you want to save the current calculation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Save",
      cancelButtonText: "Cancel",
    });
    if (!confirmResult.isConfirmed) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newCalculation = {
      tempId: Date.now(),
      userId: user.id,
      semesters: calculationData.semesters,
      result: calculationData.result,
    };

    try {
      const res = await fetch("/api/saveCalculation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          semesters: calculationData.semesters,
          result: calculationData.result,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Your calculation has been saved successfully.",
      });
      setCalcKey((prev) => prev + 1);
      setCalculationData(null);
      fetchSavedCalculations();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Error saving calculation.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Calculator key={calcKey} setCalculationData={setCalculationData} />
      <div className="flex justify-center mt-6">
        {user ? (
          <Button onClick={handleSaveCalculation} size="lg" variant="outline">
            Save Calculation
          </Button>
        ) : (
          <Button
            onClick={() => router.push("/sign-in")}
            size="lg"
            variant="outline"
          >
            Sign In to Save Calculations
          </Button>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Saved Calculations</h3>
        {user ? (
          savedCalculations.length === 0 ? (
            <p>No saved calculations found.</p>
          ) : (
            <ul>
              {savedCalculations.map((calc: any) => (
                <li key={calc._id} className="p-4 border rounded mb-2">
                  <p>
                    <strong>CGPA:</strong> {calc.result.cgpa}
                  </p>
                  <p>
                    <strong>Saved On:</strong>{" "}
                    {new Date(calc.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p>Please sign in to view your saved calculations.</p>
        )}
      </div>
    </div>
  );
}
