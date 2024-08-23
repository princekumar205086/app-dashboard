"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { login } from "./action";
import useRedirectIfAuthenticated from "@/app/helper/useRedirect";
import { useRouter } from "next/navigation";

export default function Login() {
  const isAuthenticated = useRedirectIfAuthenticated();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  if (isAuthenticated === null) {
    // Display a loading indicator while checking authentication status
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    // If authenticated, redirect is handled in the hook
    return null;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      valid = false;
    }

    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
      valid = false;
    }

    if (valid) {
      setLoading(true); // Start loading
      try {
        await login(email, password);
        router.push("/dashboard");
      } catch (error) {
        // Handle login errors here (e.g., display error message)
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="container border-4 mx-auto border-black shadow-lg" style={{ width: 500 }}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/images/login.jpeg"
            className="mx-auto p-2"
            width={200}
            height={120}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="keep-signed-in"
                name="keep-signed-in"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="keep-signed-in"
                className="ml-2 block text-sm text-gray-900"
              >
                Keep me signed in
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading} // Disable button while loading
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create a free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
