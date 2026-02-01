import { useEffect, useState } from "react";
import api from "../api/axios";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) return;

    const loadExpenses = async () => {
      const res = await api.get("/expenses");
      setExpenses(res.data);
    };

    loadExpenses();
  }, [token]);

  const fetchExpenses = async () => {
    const res = await api.get("/expenses");
    setExpenses(res.data);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    const form = e.target;

    await api.post("/expenses", {
      title: form.title.value,
      amount: Number(form.amount.value),
      type: form.type.value,
    });

    form.reset();
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const income = expenses
    .filter((e) => e.type === "income")
    .reduce((a, c) => a + c.amount, 0);

  const expenseTotal = expenses
    .filter((e) => e.type === "expense")
    .reduce((a, c) => a + c.amount, 0);

  const balance = income - expenseTotal;

  const expenseItems = expenses.filter((e) => e.type === "expense");

  const colors = expenseItems.map(
    (_, i) => `hsl(${i * 45}, 70%, 60%)`
  );

  const pieData = {
    labels: [...expenseItems.map(e => e.title), "Remaining Balance"],
    datasets: [
      {
        data: [...expenseItems.map(e => e.amount), balance > 0 ? balance : 0],
        backgroundColor: [...colors, "#22c55e"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <button
          onClick={logout}
          className="px-4 py-2 rounded bg-red-500 text-black font-medium
                     hover:shadow-[0_0_15px_#ef4444] transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-[#0f172a] rounded">
          <p className="text-gray-400">Balance</p>
          <p className="text-xl font-bold text-green-400">₹{balance}</p>
        </div>

        <div className="p-4 bg-[#0f172a] rounded">
          <p className="text-gray-400">Income</p>
          <p className="text-xl font-bold text-blue-400">₹{income}</p>
        </div>

        <div className="p-4 bg-[#0f172a] rounded">
          <p className="text-gray-400">Expense</p>
          <p className="text-xl font-bold text-red-400">₹{expenseTotal}</p>
        </div>
      </div>

      <form onSubmit={addExpense} className="flex flex-wrap gap-2 mb-6">
        <input
          name="title"
          placeholder="Title"
          className="flex-1 p-2 bg-[#0b0f14] border border-gray-700 rounded focus:border-green-400 outline-none"
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          className="w-32 p-2 bg-[#0b0f14] border border-gray-700 rounded focus:border-green-400 outline-none"
          required
        />

        <select
          name="type"
          className="p-2 bg-[#0b0f14] border border-gray-700 rounded focus:border-green-400 outline-none"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button className="px-6 bg-green-500 text-black rounded font-medium hover:shadow-[0_0_12px_#22c55e] transition">
          Add
        </button>
      </form>

      {expenseItems.length > 0 && (
        <div className="mb-8 flex justify-center">
          <div className="bg-[#0f172a] p-4 rounded w-full max-w-md">
            <Pie data={pieData} />
          </div>
        </div>
      )}

      <ul className="space-y-2 max-h-87.5 overflow-y-auto">
        {expenses.map((e, i) => (
          <li
            key={e._id}
            className="flex justify-between bg-[#0f172a] p-3 rounded"
          >
            <span className="flex items-center gap-2">
              {e.type === "expense" && (
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[i] }}
                />
              )}
              {e.title} — ₹{e.amount} ({e.type})
            </span>

            <button
              onClick={() => deleteExpense(e._id)}
              className="text-red-400 hover:text-red-300 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}
