import React from 'react';

interface ProgressBarProps {
  percentage: number; // Progress percentage (0 to 100)
  label: string; // Text to display in the center
  color?: string; // Optional custom color for the progress bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label, color  }) => {
  return (
    <div className="relative mb-3 mt-2 h-3 w-full rounded-full bg-gray-200">
      {/* The filled progress bar */}
      <div
        className={`h-3 rounded-full w-full bg-${color}-700`}
        style={{ width: `${percentage}%` , backgroundColor: `${color}` }}
      ></div>
      
      {/* The percentage label */}
      <span className="absolute top-0 inset-0 w-full left-0 right-0 bottom-0 flex items-center justify-center text-sm font-medium text-black">
        {label} {percentage}%
      </span>
    </div>
  );
};

export default ProgressBar;
