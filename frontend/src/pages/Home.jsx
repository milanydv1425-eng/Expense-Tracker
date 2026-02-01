import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white flex flex-col">

      <nav className="flex justify-between items-center px-8 py-5 border-b border-[#1f2937]">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-green-400">Expense</span>Kart
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded bg-green-500 text-black hover:shadow-[0_0_12px_#22c55e] transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <section className="px-8 py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Know Exactly  
            <span className="text-green-400"> Where Your Money Goes</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            ExpenseKart gives you clarity over income, expenses, and remaining
            balance with clean visuals and zero distractions.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded bg-green-500 text-black font-medium hover:shadow-[0_0_18px_#22c55e] transition"
            >
              Start Tracking
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#0f172a] border border-green-500/40 rounded p-6">
            <p className="text-gray-400">Monthly Balance</p>
            <p className="text-3xl font-bold text-green-400">₹12,450</p>
          </div>

          <div className="bg-[#0f172a] border border-red-500/40 rounded p-6">
            <p className="text-gray-400">Total Expenses</p>
            <p className="text-3xl font-bold text-red-400">₹7,820</p>
          </div>

          <div className="bg-[#0f172a] border border-blue-500/40 rounded p-6">
            <p className="text-gray-400">Income Added</p>
            <p className="text-3xl font-bold text-blue-400">₹20,000</p>
          </div>

          <div className="bg-[#0f172a] border border-purple-500/40 rounded p-6">
            <p className="text-gray-400">Entries Tracked</p>
            <p className="text-3xl font-bold text-purple-400">34</p>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 border-t border-[#1f2937]">
        <h3 className="text-3xl font-semibold text-center mb-14">
          How ExpenseKart Works
        </h3>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-green-400 text-4xl mb-4">01</div>
            <h4 className="text-xl font-semibold mb-2">Add Income</h4>
            <p className="text-gray-400">
              Log your salary or earnings once and stay updated.
            </p>
          </div>

          <div>
            <div className="text-green-400 text-4xl mb-4">02</div>
            <h4 className="text-xl font-semibold mb-2">Track Expenses</h4>
            <p className="text-gray-400">
              Record spending as it happens with clear categorization.
            </p>
          </div>

          <div>
            <div className="text-green-400 text-4xl mb-4">03</div>
            <h4 className="text-xl font-semibold mb-2">Visualize Balance</h4>
            <p className="text-gray-400">
              Instantly see what’s left with intuitive charts.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-[#1f2937] py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ExpenseKart · Built by Milan Yadav
      </footer>
    </div>
  );
}
