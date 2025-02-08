"use client";
import { useState } from "react";
import Subject from "./Subject";
import { SemesterType, Subject as SubjectType } from "./Calculator";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

interface SemesterProps {
  semester: SemesterType;
  updateSemester: (semester: SemesterType) => void;
}

export default function Semester({ semester, updateSemester }: SemesterProps) {
  const [subjects, setSubjects] = useState<SubjectType[]>(semester.subjects);

  const addSubject = () => {
    // If any subject is incomplete (e.g. empty name), show an error.
    if (subjects.some((subject) => subject.name.trim() === "")) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Subject",
        text: "Please fill in the existing subject details before adding a new subject.",
      });
      return;
    }
    const newSubject: SubjectType = {
      id: `subject-${subjects.length + 1}`,
      name: "",
      credit: 0,
      grade: "F",
    };
    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);
    updateSemester({ ...semester, subjects: updatedSubjects });
  };

  const updateSubject = (updatedSubject: SubjectType) => {
    const updatedSubjects = subjects.map((sub) =>
      sub.id === updatedSubject.id ? updatedSubject : sub
    );
    setSubjects(updatedSubjects);
    updateSemester({ ...semester, subjects: updatedSubjects });
  };

  const removeSubject = (id: string) => {
    const updatedSubjects = subjects.filter((sub) => sub.id !== id);
    setSubjects(updatedSubjects);
    updateSemester({ ...semester, subjects: updatedSubjects });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      {subjects.map((subject) => (
        <div key={subject.id} className="w-full max-w-4xl">
          <Subject
            subject={subject}
            updateSubject={updateSubject}
            removeSubject={removeSubject}
          />
        </div>
      ))}
      <Button onClick={addSubject} variant="outline" size="lg" className="mt-4">
        Add Subject
      </Button>
    </div>
  );
}
