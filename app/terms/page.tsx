/* eslint-disable react/no-unescaped-entities */
// app/terms/page.tsx
"use client";
import React from "react";
import BackButton from "../../components/BackButton";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto p-6">
        <BackButton />
        <div className="max-w-4xl mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">
            Terms and Conditions
          </h1>
          <p className="text-gray-300 leading-relaxed mb-4">
            Welcome to the UET GPA Calculator. By using this application, you
            agree to comply with and be bound by the following terms and
            conditions. Please review them carefully.
          </p>

          <h2 className="text-2xl font-semibold text-gray-100 mt-6 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-300 mb-4">
            By accessing and using the UET GPA Calculator, you acknowledge that
            you have read, understood, and agree to be legally bound by these
            terms and conditions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-100 mt-6 mb-4">
            2. Usage
          </h2>
          <p className="text-gray-300 mb-4">
            The UET GPA Calculator offers a user-friendly platform to compute
            your academic performance. You are responsible for ensuring the
            accuracy of the information you enter and for using the results
            appropriately.
          </p>

          <h2 className="text-2xl font-semibold text-gray-100 mt-6 mb-4">
            3. Limitations
          </h2>
          <p className="text-gray-300 mb-4">
            This application is provided "as-is" without warranties of any kind,
            express or implied. The developer is not liable for any errors in
            calculation or misinterpretation of the results.
          </p>

          <h2 className="text-2xl font-semibold text-gray-100 mt-6 mb-4">
            4. Intellectual Property
          </h2>
          <p className="text-gray-300 mb-4">
            All content, design, and code within the UET GPA Calculator are the
            intellectual property of the developer and are protected by
            copyright laws.
          </p>

          <h2 className="text-2xl font-semibold text-gray-100 mt-6 mb-4">
            5. Amendments
          </h2>
          <p className="text-gray-300 mb-4">
            We reserve the right to update these terms and conditions at any
            time. Any changes will be communicated through the application.
          </p>

          <footer className="mt-12 text-center text-gray-400">
            <p>
              For more information, please contact us at{" "}
              <a
                href="mailto:tahasaleem.professional@gmail.com"
                className="underline hover:text-gray-200"
              >
                tahasaleem.professional@gmail.com
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
