import { Router } from "express";
import mongoose from "mongoose";
import Expense from "../models/Expense.js";
import requireAuth from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// List expenses (optionally filtered by category or date range)
router.get("/", async (req, res) => {
  const { category, from, to } = req.query;
  const filter = { user: req.userId };
  if (category) filter.category = category;
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }

  const expenses = await Expense.find(filter).sort({ date: -1 });
  res.json(expenses);
});

// Summary for dashboard charts: totals by category + monthly totals
router.get("/summary", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.userId);

  const byCategory = await Expense.aggregate([
    { $match: { user: userId } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
  ]);

  const byMonth = await Expense.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const totalResult = await Expense.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
  ]);

  res.json({
    byCategory: byCategory.map((c) => ({ category: c._id, total: c.total })),
    byMonth: byMonth.map((m) => ({
      label: `${m._id.year}-${String(m._id.month).padStart(2, "0")}`,
      total: m.total,
    })),
    total: totalResult[0]?.total || 0,
    count: totalResult[0]?.count || 0,
  });
});

router.post("/", async (req, res) => {
  try {
    const { description, amount, category, date, notes } = req.body;
    if (!description || amount === undefined) {
      return res.status(400).json({ error: "Description and amount are required." });
    }
    const expense = await Expense.create({
      user: req.userId,
      description,
      amount,
      category,
      date,
      notes,
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: "Could not create expense." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!expense) return res.status(404).json({ error: "Expense not found." });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Could not update expense." });
  }
});

router.delete("/:id", async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!expense) return res.status(404).json({ error: "Expense not found." });
  res.json({ deleted: true });
});

export default router;
