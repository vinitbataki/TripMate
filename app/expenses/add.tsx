import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateEqualSplit } from "../../utils/expenseSplit";

import { useExpense } from "../../contexts/ExpenseContext";
import {
  ExpenseCategory,
  ExpenseParticipant,
} from "../../types/expense";

const categories: ExpenseCategory[] = [
  "Food",
  "Accommodation",
  "Transport",
  "Activities",
  "Shopping",
  "Other",
];

const travelers = [
  {
    id: "you",
    name: "You",
  },
  {
    id: "alex",
    name: "Alex",
  },
  {
    id: "john",
    name: "John",
  },
];

export default function AddExpenseScreen() {
  const { tripId } = useLocalSearchParams<{
    tripId: string;
  }>();

  const { addExpense } = useExpense();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] =
    useState<ExpenseCategory>("Food");

  const [paidBy, setPaidBy] = useState("you");

  const [selectedParticipants, setSelectedParticipants] =
    useState<string[]>(["you", "alex", "john"]);

  const toggleParticipant = (userId: string) => {
    setSelectedParticipants((current) => {
      if (current.includes(userId)) {
        if (current.length === 1) {
          return current;
        }

        return current.filter((id) => id !== userId);
      }

      return [...current, userId];
    });
  };

  const handleSave = () => {
    const numericAmount = Number(amount);

    if (!title.trim()) {
      Alert.alert(
        "Missing Expense",
        "Please enter an expense name."
      );
      return;
    }

    if (!amount.trim() || Number.isNaN(numericAmount)) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid expense amount."
      );
      return;
    }

    if (numericAmount <= 0) {
      Alert.alert(
        "Invalid Amount",
        "Expense amount must be greater than 0."
      );
      return;
    }

    if (selectedParticipants.length === 0) {
      Alert.alert(
        "No Participants",
        "Select at least one participant."
      );
      return;
    }

    const splitResults = calculateEqualSplit(
      numericAmount,
      selectedParticipants
    );
      

    const participants: ExpenseParticipant[] =
      splitResults.map((split) => {
        const traveler = travelers.find(
          (item) => item.id === split.userId
        );

        return {
          userId: split.userId,
          name: traveler?.name ?? split.userId,
          amount: split.amount,
        };
      });

    addExpense({
      id: Date.now().toString(),
      tripId,
      title: title.trim(),
      amount: numericAmount,
      category,
      paidBy,
      participants,
      splitType: "equal",
      createdAt: new Date().toISOString(),
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
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
          Add Expense
        </Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Expense Name */}
        <Text style={styles.label}>
          Expense Name
        </Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Dinner"
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />

        {/* Amount */}
        <Text style={styles.label}>
          Amount
        </Text>

        <View style={styles.amountContainer}>
          <Text style={styles.currency}>
            ₹
          </Text>

          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor="#94A3B8"
            keyboardType="decimal-pad"
            style={styles.amountInput}
          />
        </View>

        {/* Category */}
        <Text style={styles.label}>
          Category
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((item) => {
            const selected = category === item;

            return (
              <Pressable
                key={item}
                style={[
                  styles.categoryChip,
                  selected &&
                    styles.categoryChipSelected,
                ]}
                onPress={() => setCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected &&
                      styles.categoryTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Paid By */}
        <Text style={styles.label}>
          Paid By
        </Text>

        <View style={styles.travelerList}>
          {travelers.map((traveler) => {
            const selected =
              paidBy === traveler.id;

            return (
              <Pressable
                key={traveler.id}
                style={[
                  styles.travelerCard,
                  selected &&
                    styles.travelerCardSelected,
                ]}
                onPress={() =>
                  setPaidBy(traveler.id)
                }
              >
                <View
                  style={[
                    styles.avatar,
                    selected &&
                      styles.avatarSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.avatarText,
                      selected &&
                        styles.avatarTextSelected,
                    ]}
                  >
                    {traveler.name.charAt(0)}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.travelerName,
                    selected &&
                      styles.travelerNameSelected,
                  ]}
                >
                  {traveler.name}
                </Text>

                {selected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color="#6C63FF"
                  />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Split Between */}
        <Text style={styles.label}>
          Split Between
        </Text>

        <View style={styles.travelerList}>
          {travelers.map((traveler) => {
            const selected =
              selectedParticipants.includes(
                traveler.id
              );

            return (
              <Pressable
                key={traveler.id}
                style={[
                  styles.participantCard,
                  selected &&
                    styles.participantCardSelected,
                ]}
                onPress={() =>
                  toggleParticipant(traveler.id)
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    selected &&
                      styles.checkboxSelected,
                  ]}
                >
                  {selected && (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color="#FFFFFF"
                    />
                  )}
                </View>

                <Text style={styles.participantName}>
                  {traveler.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Equal Split Preview */}
        {amount &&
          Number(amount) > 0 &&
          selectedParticipants.length > 0 && (
            <View style={styles.previewCard}>
              <Text style={styles.previewTitle}>
                Equal Split
              </Text>

              <Text style={styles.previewAmount}>
                ₹
                {(
                  Number(amount) /
                  selectedParticipants.length
                ).toFixed(2)}
                {" / person"}
              </Text>

              <Text style={styles.previewText}>
                Split between{" "}
                {selectedParticipants.length}{" "}
                travelers
              </Text>
            </View>
          )}

        {/* Save Expense */}
        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Ionicons
            name="checkmark"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.saveButtonText}>
            Save Expense
          </Text>
        </Pressable>
      </ScrollView>
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
    padding: 20,
    paddingBottom: 40,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
    marginTop: 18,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },

  amountContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
  },

  currency: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6C63FF",
  },

  amountInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  categoryList: {
    paddingRight: 20,
    gap: 10,
  },

  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
  },

  categoryChipSelected: {
    backgroundColor: "#6C63FF",
  },

  categoryText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "600",
  },

  categoryTextSelected: {
    color: "#FFFFFF",
  },

  travelerList: {
    gap: 10,
  },

  travelerCard: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  travelerCardSelected: {
    borderColor: "#6C63FF",
    backgroundColor: "#F5F3FF",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
  },

  avatarSelected: {
    backgroundColor: "#6C63FF",
  },

  avatarText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#475569",
  },

  avatarTextSelected: {
    color: "#FFFFFF",
  },

  travelerName: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },

  travelerNameSelected: {
    color: "#6C63FF",
  },

  participantCard: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  participantCardSelected: {
    borderColor: "#6C63FF",
    backgroundColor: "#F5F3FF",
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxSelected: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  participantName: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },

  previewCard: {
    marginTop: 22,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#F5F3FF",
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },

  previewTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6C63FF",
  },

  previewAmount: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  previewText: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  saveButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});