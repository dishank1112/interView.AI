"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      console.log("Uploading file:", file);
      router.push("/jobdetails")
      // You can implement the file upload logic here
    }
  };

  return (
    <div className=" bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-gray-900  flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">File Upload</h2>
        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-6 py-8 text-center">
          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />
          <svg
            className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 17l-4 4m0 0l-4-4m4 4V3"
            ></path>
          </svg>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Drag & Drop your files here or{' '}
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              browse
            </label>{' '}
            to upload.
          </p>
        </div>
        <button
          onClick={handleFileUpload}
          className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-900 dark:hover:bg-blue-950 dark:focus:ring-blue-500 dark:focus:ring-opacity-50"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
