import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useExpense } from "../../contexts/ExpenseContext";
import { Expense } from "../../types/expense";

export default function ExpensesScreen() {
  const { tripId } = useLocalSearchParams<{
    tripId: string;
  }>();

  const { getTripExpenses } = useExpense();

  const tripExpenses: Expense[] = tripId
    ? getTripExpenses(tripId)
    : [];

  const totalExpense = tripExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const getPayerName = (paidBy: string) => {
    if (paidBy === "you") {
      return "You";
    }

    const participant = tripExpenses
      .flatMap((expense) => expense.participants)
      .find((person) => person.userId === paidBy);

    return participant?.name ?? paidBy;
  };

  const renderExpense = ({
    item,
  }: {
    item: Expense;
  }) => {
    return (
      <Pressable style={styles.expenseCard}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="receipt-outline"
            size={22}
            color="#6C63FF"
          />
        </View>

        <View style={styles.expenseInfo}>
          <Text style={styles.expenseTitle}>
            {item.title}
          </Text>

          <Text style={styles.expenseCategory}>
            {item.category} • Paid by{" "}
            {getPayerName(item.paidBy)}
          </Text>
        </View>

        <Text style={styles.expenseAmount}>
          ₹{item.amount.toFixed(2)}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#0F172A"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Expenses
        </Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>
            Total Expenses
          </Text>

          <Text style={styles.summaryAmount}>
            ₹{totalExpense.toFixed(2)}
          </Text>

          <Text style={styles.tripText}>
            Trip ID: {tripId}
          </Text>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Expense History
          </Text>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {tripExpenses.length}
            </Text>
          </View>
        </View>

        {/* Expense List */}
        <FlatList
          data={tripExpenses}
          keyExtractor={(item) => item.id}
          renderItem={renderExpense}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="wallet-outline"
                size={48}
                color="#94A3B8"
              />

              <Text style={styles.emptyTitle}>
                No expenses yet
              </Text>

              <Text style={styles.emptyText}>
                Add your first trip expense.
              </Text>
            </View>
          }
        />

        {/* Add Expense Button */}
        <Pressable
          style={styles.addButton}
          onPress={() => {
            router.push({
              pathname: "/expenses/add",
              params: {
                tripId,
              },
            });
          }}
        >
          <Ionicons
            name="add"
            size={24}
            color="#FFFFFF"
          />

          <Text style={styles.addButtonText}>
            Add Expense
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  headerPlaceholder: {
    width: 40,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  summaryCard: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
  },

  summaryLabel: {
    color: "#EDEBFF",
    fontSize: 14,
    fontWeight: "500",
  },

  summaryAmount: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 6,
  },

  tripText: {
    color: "#EDEBFF",
    fontSize: 12,
    marginTop: 8,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  countBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  countText: {
    color: "#6C63FF",
    fontSize: 13,
    fontWeight: "700",
  },

  listContent: {
    paddingBottom: 100,
  },

  expenseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  expenseInfo: {
    flex: 1,
    marginLeft: 12,
  },

  expenseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  expenseCategory: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  expenseAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginLeft: 8,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
  },

  addButton: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});