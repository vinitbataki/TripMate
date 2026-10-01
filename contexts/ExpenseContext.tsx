import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Expense } from "../types/expense";

const STORAGE_KEY = "@tripmate_expenses";

type ExpenseContextType = {
  expenses: Expense[];

  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;

  getTripExpenses: (tripId: string) => Expense[];
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load expenses from AsyncStorage
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          setExpenses(JSON.parse(saved));
        }
      } catch (error) {
        console.log("Error loading expenses:", error);
      } finally {
        setLoaded(true);
      }
    };

    loadExpenses();
  }, []);

  // Save expenses to AsyncStorage
  useEffect(() => {
    if (!loaded) return;

    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(expenses)
        );
      } catch (error) {
        console.log("Error saving expenses:", error);
      }
    };

    saveExpenses();
  }, [expenses, loaded]);

  // Add expense
  const addExpense = (expense: Expense) => {
    setExpenses((current) => [...current, expense]);
  };

  // Update expense
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((current) =>
      current.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );
  };

  // Delete expense
  const deleteExpense = (id: string) => {
    setExpenses((current) =>
      current.filter((expense) => expense.id !== id)
    );
  };

  // Get expenses belonging to one trip
  const getTripExpenses = (tripId: string) => {
    return expenses.filter((expense) => expense.tripId === tripId);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        getTripExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpense must be used inside ExpenseProvider"
    );
  }

  return context;
}