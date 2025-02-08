"use client";
import { Subject as SubjectType } from "./Calculator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface SubjectProps {
  subject: SubjectType;
  updateSubject: (subject: SubjectType) => void;
  removeSubject: (id: string) => void;
}

export default function Subject({
  subject,
  updateSubject,
  removeSubject,
}: SubjectProps) {
  const gradeOptions = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D",
    "F",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "credit") {
      const creditValue = parseFloat(value);
      if (creditValue < 0) {
        Swal.fire({
          icon: "error",
          title: "Invalid Credit",
          text: "Credit hours cannot be negative.",
        });
        return;
      }
      updateSubject({
        ...subject,
        credit: creditValue,
      });
    } else {
      updateSubject({
        ...subject,
        [name]: value,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 border rounded-lg shadow-sm">
      <Input
        type="text"
        name="name"
        placeholder="Subject Name"
        value={subject.name}
        onChange={handleInputChange}
        autoComplete="off"
        className="w-full md:w-72 h-14 text-2xl p-4"
      />

      <Input
        type="number"
        name="credit"
        placeholder="Credit Hours"
        value={subject.credit}
        onChange={handleInputChange}
        className="w-full md:w-40 h-14 text-lg"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-40 h-14 text-lg flex justify-between items-center px-4"
          >
            <span>{subject.grade}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[8rem] max-h-60 overflow-y-auto rounded-lg shadow-lg bg-white text-lg">
          {gradeOptions.map((grade) => (
            <DropdownMenuItem
              key={grade}
              onSelect={() => updateSubject({ ...subject, grade })}
              className="cursor-pointer hover:bg-gray-100 px-4 py-2"
            >
              {grade}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeSubject(subject.id)}
        className="w-10 h-10 text-red-500 transition-all border duration-200 transform hover:text-red-700 hover:scale-110 active:scale-95 flex items-center justify-center rounded-lg"
      >
        ✖
      </Button>
    </div>
  );
}
