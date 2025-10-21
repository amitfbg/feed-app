import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import Layout from "../components/Layout";
import LoginIcon from "../Icons/LoginIcon";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const nav = useNavigate();
  const { register } = useAuth();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeat) {
      return alert("Passwords do not match");
    }
    const result = register(email, password);
    if (!result.ok) {
      return alert(result.error || "Failed to register");
    }
    nav("/");
  };

  return (
    <div className="rounded-3xl p-4 bg-gray-200">
      <div className="max-w-md !rounded-3xl card p-6">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
          <LoginIcon />
        </div>
        <h1 className="text-xl font-semibold text-center">
          Create an account to continue
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create an account to access all the features on this app
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
          <label className="block text-sm">
            Repeat password
            <input
              type="password"
              className="input mt-1"
              value={repeat}
              required
              placeholder="Repeat Password"
              onChange={(e) => setRepeat(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-primary w-full mt-2">
            Sign Up
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-brand">
          Sign In
        </Link>
      </p>
    </div>
  );
}
