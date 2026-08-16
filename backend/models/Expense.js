import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Software & Tools",
        "Hardware",
        "Marketing",
        "Travel",
        "Office",
        "Client Expense",
        "Taxes",
        "Other",
      ],
      default: "Other",
    },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

expenseSchema.index({ user: 1, date: -1 });

export default mongoose.model("Expense", expenseSchema);
