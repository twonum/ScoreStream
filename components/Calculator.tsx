/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import Semester from "./Semester";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useUser } from "@clerk/nextjs";

/**
 * Type representing a single subject entry.
 */
export type Subject = {
  id: string;
  name: string;
  credit: number;
  grade: string;
};

/**
 * Type representing a semester containing multiple subjects.
 */
export type SemesterType = {
  id: string;
  name: string;
  subjects: Subject[];
};

/**
 * Type representing the overall calculation result.
 */
export type CalculationResult = {
  cgpa: number;
};

/**
 * API Response Type – used for handling errors/responses.
 */
export type ApiResponse = {
  error?: string;
  data?: any;
};

// Default semester to initialize the calculator state
const defaultSemester: SemesterType = {
  id: "semester-1",
  name: "Semester 1",
  subjects: [],
};

interface CalculatorProps {
  setCalculationData?: (data: {
    semesters: SemesterType[];
    result: CalculationResult;
  }) => void;
}

/**
 * Calculator component for computing GPA/CGPA and saving calculation history.
 */
export default function Calculator({ setCalculationData }: CalculatorProps) {
  const { user } = useUser();

  // States for semesters, calculation result, local fallback history, and saving state.
  const [semesters, setSemesters] = useState<SemesterType[]>([defaultSemester]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [savedCalculations, setSavedCalculations] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // -----------------------
  // Local Storage Management
  // -----------------------

  useEffect(() => {
    const storedCalculations = localStorage.getItem("savedCalculations");
    if (storedCalculations) {
      try {
        const parsedCalculations = JSON.parse(storedCalculations);
        setSavedCalculations(parsedCalculations);
      } catch (error) {
        console.error(
          "Error parsing saved calculations from localStorage",
          error
        );
      }
    }
  }, []);

  const updateLocalStorage = (calculations: any[]) => {
    localStorage.setItem("savedCalculations", JSON.stringify(calculations));
  };

  // -----------------------
  // Grade Values and Calculation Logic
  // -----------------------

  // Mapping from letter grade to its numeric value
  const gradeValues: { [key: string]: number } = {
    "A+": 4,
    A: 4,
    "A-": 3.7,
    "B+": 3.3,
    B: 3,
    "B-": 2.7,
    "C+": 2.3,
    C: 2,
    "C-": 1.7,
    D: 1,
    F: 0,
  };

  /**
   * Calculate GPA for a given list of subjects.
   */
  const calculateGPA = useCallback(
    (subjects: Subject[]): number => {
      let totalCredits = 0;
      let totalPoints = 0;
      subjects.forEach((subject) => {
        // Only include subjects with a valid name and credit > 0
        if (subject.credit > 0 && subject.name.trim()) {
          const gradePoint = gradeValues[subject.grade] ?? 0;
          totalCredits += subject.credit;
          totalPoints += subject.credit * gradePoint;
        }
      });
      return totalCredits ? totalPoints / totalCredits : 0;
    },
    [gradeValues]
  );

  /**
   * Calculate overall CGPA using all semesters.
   */
  const handleCalculate = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    semesters.forEach((semester) => {
      semester.subjects.forEach((subject) => {
        if (subject.credit > 0 && subject.name.trim()) {
          totalCredits += subject.credit;
          totalPoints += subject.credit * (gradeValues[subject.grade] ?? 0);
        }
      });
    });
    const cgpa = totalCredits ? totalPoints / totalCredits : 0;
    const parsedCGPA = parseFloat(cgpa.toFixed(2));
    setResult({ cgpa: parsedCGPA });
    if (setCalculationData) {
      setCalculationData({ semesters, result: { cgpa: parsedCGPA } });
    }
  };

  // -----------------------
  // Semester and Subject Management
  // -----------------------

  /**
   * Add a new semester.
   */
  const addSemester = () => {
    const newSemester: SemesterType = {
      id: `semester-${semesters.length + 1}`,
      name: `Semester ${semesters.length + 1}`,
      subjects: [],
    };
    setSemesters([...semesters, newSemester]);
  };

  /**
   * Remove a semester (ensuring at least one semester remains).
   */
  const removeSemester = (id: string) => {
    if (semesters.length === 1) {
      Swal.fire({
        icon: "error",
        title: "Operation Not Allowed",
        text: "At least one semester is required.",
      });
      return;
    }
    setSemesters((prevSemesters) =>
      prevSemesters.filter((sem) => sem.id !== id)
    );
  };

  /**
   * Update semester data when subjects change.
   */
  const updateSemester = (updatedSemester: SemesterType) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((semester) =>
        semester.id === updatedSemester.id ? updatedSemester : semester
      )
    );
  };

  /**
   * Reset calculator state to its default.
   */
  const resetCalculations = () => {
    setSemesters([defaultSemester]);
    setResult(null);
  };

  /**
   * Check if at least one valid subject exists.
   */
  const isFormValid = (): boolean => {
    let validSubjectFound = false;
    for (const semester of semesters) {
      if (semester.subjects.length === 0) continue;
      for (const subject of semester.subjects) {
        if (!subject.name.trim() || subject.credit <= 0) {
          return false;
        } else {
          validSubjectFound = true;
        }
      }
    }
    return validSubjectFound;
  };

  // Compute GPA for each semester to show alongside semester name
  const semesterGPAs = semesters.map((semester) => {
    const gpa = calculateGPA(semester.subjects);
    return {
      id: semester.id,
      name: semester.name,
      gpa: parseFloat(gpa.toFixed(2)),
    };
  });

  // -----------------------
  // Save Calculation Functionality
  // -----------------------

  /**
   * Save the current calculation in MongoDB and update local history.
   */
  const handleSaveCalculation = async () => {
    if (!result) {
      Swal.fire({
        icon: "error",
        title: "No Calculation",
        text: "Please calculate your GPA/CGPA before saving.",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Save Calculation",
      text: "Do you want to save the current calculation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Save it!",
      cancelButtonText: "Cancel",
    });
    if (!confirmResult.isConfirmed) {
      return;
    }

    setIsSaving(true);
    const newCalculation = {
      id: Date.now(), // temporary id for local fallback
      semesters,
      result,
      savedAt: new Date().toISOString(),
    };

    // Get the current user's ID from Clerk authentication
    const currentUserId = user?.id || "unknown_user";

    try {
      const res = await fetch("/api/saveCalculation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId,
          semesters,
          result,
        }),
      });
      const data: ApiResponse = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Your calculation has been saved successfully!",
      });
      // Update local fallback history
      const updatedCalculations = [newCalculation, ...savedCalculations];
      setSavedCalculations(updatedCalculations);
      updateLocalStorage(updatedCalculations);
    } catch (error: any) {
      console.error("Error saving calculation:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Error saving calculation.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Clear all saved calculations from local storage.
   */
  const handleClearHistory = async () => {
    const confirmClear = await Swal.fire({
      title: "Clear History",
      text: "Are you sure you want to clear all saved calculations?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "Cancel",
    });
    if (confirmClear.isConfirmed) {
      setSavedCalculations([]);
      updateLocalStorage([]);
      Swal.fire({
        icon: "success",
        title: "Cleared",
        text: "All saved calculations have been cleared.",
      });
    }
  };

  const valid = isFormValid();

  // -----------------------
  // Component Render
  // -----------------------

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-4">
        {/* Big Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#001528] to-[#6b98c6] bg-clip-text text-transparent text-center mb-8">
          GPA/CGPA Calculator
        </h1>

        {semesters.map((semester, idx) => (
          <div
            key={semester.id}
            className="mb-6 p-4 border rounded dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h2 className="text-xl font-semibold">
                {semester.name}{" "}
                {semesterGPAs[idx] && (
                  <span className="text-sm text-gray-500 ml-2">
                    (GPA: {semesterGPAs[idx].gpa})
                  </span>
                )}
              </h2>
              <div className="mt-2 md:mt-0">
                <Button
                  variant="destructive"
                  onClick={() => removeSemester(semester.id)}
                  size="lg"
                >
                  Remove Semester
                </Button>
              </div>
            </div>
            <Semester semester={semester} updateSemester={updateSemester} />
          </div>
        ))}

        <div className="flex flex-wrap justify-center items-center gap-6 mb-4">
          <Button onClick={addSemester} variant="outline" size="lg">
            Add Semester
          </Button>
          <Button
            onClick={handleCalculate}
            variant="outline"
            size="lg"
            disabled={!valid}
            className={`${!valid ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Calculate GPA/CGPA
          </Button>
          <Button onClick={resetCalculations} variant="outline" size="lg">
            Reset
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 border rounded dark:border-gray-700 text-center">
            <h3 className="text-2xl font-bold mb-2">Overall Results</h3>
            <p className="text-xl">CGPA: {result.cgpa}</p>
            <div className="mt-4">
              <Button
                onClick={handleSaveCalculation}
                variant="outline"
                size="lg"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Calculation"}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">
            Saved Calculations History
          </h3>
          {savedCalculations.length === 0 ? (
            <p>No saved calculations found.</p>
          ) : (
            <div className="space-y-4">
              {savedCalculations.map((calc) => (
                <div key={calc.id} className="p-4 border rounded mb-2">
                  <p>
                    <strong>CGPA:</strong> {calc.result.cgpa}
                  </p>
                  <p>
                    <strong>Saved On:</strong>{" "}
                    {new Date(calc.savedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
          {savedCalculations.length > 0 && (
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleClearHistory}
                variant="destructive"
                size="lg"
              >
                Clear History
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
