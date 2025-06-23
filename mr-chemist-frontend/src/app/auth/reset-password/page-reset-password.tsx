"use client";

import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get token from URL
  const token = searchParams.get("token");

  // Redirect if already logged in or no token
  useEffect(() => {
    if (!token) {
      toast.error("Invalid Link", {
        description: "The password reset link is invalid or has expired.",
      });
      router.push("/auth/forgot-password");
    }
  }, [router, token]);

  const onSubmit = async (data: { password: string }) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Password Reset Successful", {
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });

      router.push("/auth/login");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null; // Don't render anything if no token (will redirect in useEffect)
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto max-w-6xl px-4 sm:px-16">
          <div className="text-sm">
            <Link href="/" className="hover:text-primary text-gray-500">
              Home
            </Link>
            / <span className="text-primary font-medium">Reset Password</span>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen items-center justify-center px-4 py-4 sm:px-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="mt-2 text-gray-600">Enter your new password below</p>
          </div>

          <div className="mt-8 rounded-lg bg-white p-8 shadow-sm">
            <AuthForm type="resetPassword" onSubmit={onSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
