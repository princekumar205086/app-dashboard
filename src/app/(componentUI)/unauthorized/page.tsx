import React from "react";

export default function page() {
  return (
    <>
      {/* center the content */}
      <div className="flex items-center justify-center h-full">
        <div className="pt-40 text-center">
          <h1 className="text-3xl font-semibold">Unauthorized</h1>
          <p className="mt-2 text-sm text-gray-500">
            You are not authorized to view this page
          </p>
        </div>
      </div>
    </>
  );
}
