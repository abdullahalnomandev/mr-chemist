"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Add useEffect to check for token expiration when component mounts
  useEffect(() => {
    const isTokenExpired = searchParams.get("tokenExpired") === "true";
    console.log("Initial check - isTokenExpired:", isTokenExpired);

    if (isTokenExpired) {
      toast.error("Session expired", {
        description: "Your session has expired. Please login again.",
      });
    }
  }, [searchParams]);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);

    try {
      // Get the callback URL from search params, default to "/"
      const callbackUrl = searchParams.get("callbackUrl") || "/";

      // const result = await signIn("credentials", {
      //   redirect: false,
      //   email: data.email,
      //   password: data.password,
      // });
      const result = await signIn("credentials", {
        redirect: false, // Prevent NextAuth.js from redirecting automatically
        email:data.email,
        password:data.password,
        callbackUrl: callbackUrl ? String(callbackUrl) : "/", // Pass the callbackUrl
      });
  
  

      if (result?.error) {
        toast.error("Error", {
          description: result.error || "Invalid email or password",
        });
        return;
      }

      if (result?.ok) {
        toast.success("Login Success", {
          description: "You have successfully logged in",
        });
        console.log('callBack',callbackUrl);
        router.push(callbackUrl);
      }
      console.log('callBack-outside',callbackUrl);

    } catch (error) {
      console.error("Login error:", error);
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
            / <span className="text-primary font-medium">Login</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-4 sm:px-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>

          <div className="mt-8 rounded-lg bg-white p-8 shadow-sm">
            <AuthForm
              type="login"
              onSubmit={(
                data:
                  | { email: string; password: string }
                  | { name: string; email: string; password: string; confirmPassword: string }
                  | { email: string }
                  | { password: string; confirmPassword: string },
              ) => {
                // Type assertion to ensure data has email and password
                if ("email" in data && "password" in data) {
                  return onSubmit({ email: data.email, password: data.password });
                }
                return Promise.reject(new Error("Invalid form data"));
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
