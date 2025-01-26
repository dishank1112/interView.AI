"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
 const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
        router.push("/prepare")
  };

  return (
    <div className="min-h-screen min-w-screen  bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white flex flex-col items-center justify-center p-6">
      {/* Job Details and Tech Stack Section */}
      <div className="p-8 w-full max-w-3xl bg-neutral-800 bg-opacity-50 rounded-lg shadow-lg mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Submit Job Details
        </h2>
        <form className="flex flex-col gap-6">
          <div>
            <label className="block text-lg font-medium mb-2">Job Title</label>
            <input
              type="text"
              placeholder="Enter the job title"
              className="w-full px-4 py-2 rounded-md text-black"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Job Description
            </label>
            <textarea
              placeholder="Enter the job description"
              rows={4}
              className="w-full px-4 py-2 rounded-md text-black"
            />
          </div>
       
          <div>
            <label className="block text-lg font-medium mb-2">
              Upload Supporting File (Optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-600"
            />
          </div>
          <div
            onClick={handleFileUpload}
            className="w-full px-6 py-3 bg-green-600 rounded-md hover:bg-green-500 text-lg font-semibold"
          >
           
          <Link href="/prepare">Submit</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
