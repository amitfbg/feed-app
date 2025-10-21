import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import Layout from "../components/Layout";
import LoginIcon from "../Icons/LoginIcon";

export default function SignInPage({ onClose }: { onClose?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { signInWithPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const { success, error } = signInWithPassword(email, password);
    if (!success) {
      setError(error || "Invalid email or password");
      return;
    }
    nav("/");
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="max-w-md bg-gray-200 p-2 pb-4 rounded-3xl">
      <div className="!rounded-3xl card p-8">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
          <LoginIcon />
        </div>
        <h1 className="text-xl font-semibold text-center">
          Sign in to continue
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Sign in to access all the features on this app
        </p>

        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm">
            Email or username
            <input
              className="input mt-1"
              value={email}
              required
              placeholder="Enter Email or Username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              type="password"
              className="input mt-1"
              value={password}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && (
            <div className="text-red-600 text-sm" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-full mt-2">
            Sign In
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Do not have and account?{" "}
        <Link to="/signup" className="text-brand">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
