import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { ItineraryItem } from "../types/itinerary";

const STORAGE_KEY = "@tripmate_itinerary";

type ItineraryContextType = {
  items: ItineraryItem[];
  addItem: (item: ItineraryItem) => void;
  updateItem: (item: ItineraryItem) => void;
  deleteItem: (id: string) => void;
};

const ItineraryContext =
  createContext<
    ItineraryContextType | undefined
  >(undefined);

export function ItineraryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<
    ItineraryItem[]
  >([]);

  const [loaded, setLoaded] =
    useState(false);

  // ==========================================
  // LOAD
  // ==========================================

  useEffect(() => {
    const loadItems = async () => {
      try {
        const saved =
          await AsyncStorage.getItem(
            STORAGE_KEY
          );

        if (saved) {
          setItems(JSON.parse(saved));
        }
      } catch (error) {
        console.log(
          "Error loading itinerary:",
          error
        );
      } finally {
        setLoaded(true);
      }
    };

    loadItems();
  }, []);

  // ==========================================
  // SAVE
  // ==========================================

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const saveItems = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(items)
        );
      } catch (error) {
        console.log(
          "Error saving itinerary:",
          error
        );
      }
    };

    saveItems();
  }, [items, loaded]);

  // ==========================================
  // ADD
  // ==========================================

  const addItem = (
    item: ItineraryItem
  ) => {
    setItems((current) => [
      ...current,
      item,
    ]);
  };

  // ==========================================
  // UPDATE
  // ==========================================

  const updateItem = (
    updatedItem: ItineraryItem
  ) => {
    setItems((current) =>
      current.map((item) =>
        item.id === updatedItem.id
          ? updatedItem
          : item
      )
    );
  };

  // ==========================================
  // DELETE
  // ==========================================

  const deleteItem = (id: string) => {
    setItems((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <ItineraryContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export function useItinerary() {
  const context =
    useContext(ItineraryContext);

  if (!context) {
    throw new Error(
      "useItinerary must be used inside ItineraryProvider"
    );
  }

  return context;
}