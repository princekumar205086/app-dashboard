"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { registerUser } from "./action"; // Import the registerUser function
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import { toast } from "react-toastify";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

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

  const validateUsername = (username: string) => {
    return username.trim().length >= 3;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let valid = true;
    let validationErrors = { username: "", email: "", password: "" };

    if (!validateUsername(username)) {
      validationErrors.username = "Username must be at least 3 characters long";
      valid = false;
    }

    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email address";
      valid = false;
    }

    if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    if (!valid) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const response = await registerUser(username, email, password);
    if (response.error) {
      setErrors({ ...errors, ...response.error });
      toast.error("Registration failed: " + response.error); // Show error toast
    } else {
      toast.success("User registered successfully!"); // Show success toast
      // Handle successful registration (e.g., redirect to login page)
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div
          className="container border-4 mx-auto border-black shadow-lg"
          style={{ width: 500 }}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              alt="Your Company"
              src="/images/signup.jpeg"
              className="mx-auto p-2"
              width={200}
              height={120}
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a free account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">{errors.username}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="ml-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full mt-6 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
