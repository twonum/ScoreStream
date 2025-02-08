import React from "react";
import Head from "next/head";
import BackButton from "../../components/BackButton"; // Adjust the path as needed

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Head>
        <title>
          About - ScoreStream: Ultimate UET GPA &amp; CGPA Calculator
        </title>
        <meta
          name="description"
          content="Discover ScoreStream, the cutting-edge GPA &amp; CGPA calculator exclusively designed for University of Engineering and Technology Lahore students. Compute your grades in real time with secure data handling and modern analytics."
        />
        <meta
          name="keywords"
          content="UET GPA Calculator, UET CGPA Calculator, ScoreStream, University of Engineering and Technology Lahore, GPA calculator, academic tool, real-time GPA, secure data, MongoDB, Clerk authentication"
        />
        <link rel="canonical" href="https://www.example.com/about" />
      </Head>
      <div className="container mx-auto p-6">
        <BackButton />
        <div className="flex flex-col items-center justify-center mt-16">
          <div className="text-center">
            {/* Header */}
            <h1 className="text-4xl font-bold mb-4 tracking-wide">
              Discover the Ultimate UET GPA &amp; CGPA Calculator ScoreStream
            </h1>

            {/* Introduction */}
            <p className="text-lg max-w-4xl mb-8 leading-relaxed">
              Welcome to a cutting-edge academic tool exclusively designed for
              students of{" "}
              <strong>University of Engineering and Technology Lahore</strong>.
              This innovative calculator transforms your academic journey by
              delivering real-time, precise GPA and CGPA computations through an
              intuitive, modern interface.
            </p>

            {/* Features */}
            <div className="max-w-4xl text-white space-y-6">
              <h2 className="text-2xl font-semibold border-b border-white pb-2 mb-4">
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-3 text-left inline-block">
                <li>
                  <strong>Instant Results:</strong> Experience real-time GPA and
                  CGPA calculations with minimal effort.
                </li>
                <li>
                  <strong>Intuitive Navigation:</strong> Enjoy a user-friendly
                  design optimized for both desktop and mobile use.
                </li>
                <li>
                  <strong>Customizable Semester Tracking:</strong> Easily add or
                  remove semesters and subjects to keep your academic record up
                  to date.
                </li>
                <li>
                  <strong>Secure Data Handling:</strong> Rely on robust data
                  storage powered by MongoDB and personalized access via Clerk
                  authentication.
                </li>
                <li>
                  <strong>Comprehensive Grading Scale:</strong> Our detailed
                  grading scheme precisely reflects your performance:
                </li>
              </ul>

              {/* Grading Scheme */}
              <div className="text-left ml-6">
                <p>A+ = 4.3 grade points</p>
                <p>A = 4 grade points</p>
                <p>A- = 3.7 grade points</p>
                <p>B+ = 3.3 grade points</p>
                <p>B = 3 grade points</p>
                <p>B- = 2.7 grade points</p>
                <p>C+ = 2.3 grade points</p>
                <p>C = 2 grade points</p>
                <p>C- = 1.7 grade points</p>
                <p>D+ = 1.3 grade points</p>
                <p>D = 1 grade point</p>
                <p>D- = 0.7 grade points</p>
                <p>F = 0 grade points</p>
                <p>
                  P (pass), NP (not pass), I (incomplete), W (withdrawal) will
                  be ignored.
                </p>
              </div>

              <ul className="list-disc list-inside space-y-3 text-left inline-block">
                <li>
                  <strong>Elegant Design:</strong> Revel in a sleek dark/light
                  theme enriched with subtle animations and hover effects.
                </li>
                <li>
                  <strong>Performance Analytics:</strong> Monitor both your
                  semester-wise performance and overall academic progress with
                  clear, concise reports.
                </li>
              </ul>
            </div>

            {/* Developer Details */}
            <div className="max-w-4xl text-white mt-12">
              <h2 className="text-2xl font-semibold mb-4">
                Meet the Developer
              </h2>
              <p className="text-lg leading-relaxed">
                This calculator is the brainchild of{" "}
                <strong>Muhammad Taha Saleem</strong>, a passionate software
                engineer committed to delivering innovative solutions for
                academic success. His dedication to excellence is evident in
                every aspect of this tool, combining modern design with powerful
                functionality to meet the unique needs of UET Lahore students.
              </p>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-white">
              <p>
                More than just a tool, our GPA Calculator is a promise to
                empower students with technology that enhances academic
                performance. Stay tuned for updates and exciting new features!
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
