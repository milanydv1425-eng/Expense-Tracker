import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white flex flex-col">

      <nav className="flex justify-between items-center px-8 py-5 border-b border-[#1f2937]">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-wide cursor-pointer"
        >
          <span className="text-green-400">Expense</span>Kart
        </h1>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded border bg-green-500 text-black hover:shadow-[0_0_12px_#22c55e] transition"
        >
          Home
        </button>
      </nav>

      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f172a] border border-green-500/30 p-8 rounded w-80"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome Back
          </h2>

          <input
            className="w-full mb-4 p-2 bg-[#0b0f14] border border-gray-700 rounded focus:border-green-400 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 bg-[#0b0f14] border border-gray-700 rounded focus:border-green-400 outline-none pr-16"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-green-400 cursor-pointer select-none"
            >
              {showPassword ? <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                </svg> : <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>}
            </span>
          </div>

          <button className="w-full py-2 bg-green-500 text-black rounded font-medium hover:shadow-[0_0_12px_#22c55e] transition">
            Login
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          <p className="mt-4 text-sm text-center text-gray-400">
            New user?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-green-400 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>

      <footer className="border-t border-[#1f2937] py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ExpenseKart · Built by Milan Yadav
      </footer>
    </div>
  );
}
