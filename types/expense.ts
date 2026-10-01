export type ExpenseCategory =
  | "Food"
  | "Accommodation"
  | "Transport"
  | "Activities"
  | "Shopping"
  | "Other";

export type SplitType =
  | "equal"
  | "custom";

export type ExpenseParticipant = {
  userId: string;
  name: string;
  amount: number;
};

export type Expense = {
  id: string;
  tripId: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  paidBy: string;
  participants: ExpenseParticipant[];
  splitType: SplitType;
  createdAt: string;
};