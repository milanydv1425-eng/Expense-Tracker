import Expense from "../models/Expense.js";

/* GET ALL EXPENSES */
export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id })
    .sort({ createdAt: -1 });
  res.json(expenses);
};

/* ADD EXPENSE */
export const addExpense = async (req, res) => {
  const expense = await Expense.create({
    user: req.user.id,
    title: req.body.title,
    amount: req.body.amount,
    type: req.body.type,
    category: req.body.category,
  });
  res.status(201).json(expense);
};

/* DELETE EXPENSE */
export const deleteExpense = async (req, res) => {
  await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });
  res.json({ message: "Expense deleted" });
};
