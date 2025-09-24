"use client";

import { CheckCircle, CircleCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
          <CircleCheck className="w-6 h-6 text-green-500" />
          Password Reset Successful
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Your password has been successfully updated. <br />
          You can now log in using your new password.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/auth/login">
            <Button className="w-full">Back to Sign In</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
