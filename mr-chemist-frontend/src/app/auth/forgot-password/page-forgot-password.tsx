"use client";

import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEmailSent(true);

      toast.success("Reset Link Sent", {
        description: `We've sent a password reset link to ${data.email}`,
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto max-w-6xl px-4 sm:px-16">
          <div className="text-sm">
            <Link href="/" className="hover:text-primary text-gray-500">
              Home
            </Link>
            / <span className="text-primary font-medium">Forgot Password</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-4 sm:px-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Forgot your password?</h1>
            <p className="mt-2 text-gray-600">
              {isEmailSent ? "Check your email for a reset link" : "Enter your email and we'll send you a reset link"}
            </p>
          </div>

          <div className="mt-8 rounded-lg bg-white p-8 shadow-sm">
            {isEmailSent ? (
              <div className="space-y-4 text-center">
                <p className="text-gray-700">
                  We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the
                  instructions.
                </p>
                <button onClick={() => router.push("/auth/login")} className="text-primary hover:underline">
                  Back to login
                </button>
              </div>
            ) : (
              <AuthForm type="forgotPassword" onSubmit={onSubmit} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
