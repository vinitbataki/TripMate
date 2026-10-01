import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  progress: number;
  image?: string;
};

type TripsContextType = {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
};

const TripsContext =
  createContext<TripsContextType | undefined>(
    undefined
  );

const STORAGE_KEY = "@tripmate_trips";

export function TripsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loaded, setLoaded] = useState(false);

  // ==========================================
  // LOAD TRIPS
  // ==========================================

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const savedTrips =
          await AsyncStorage.getItem(
            STORAGE_KEY
          );

        if (savedTrips) {
          const parsedTrips = JSON.parse(
            savedTrips
          );

          if (Array.isArray(parsedTrips)) {
            setTrips(parsedTrips);
          }
        }
      } catch (error) {
        console.log(
          "Error loading trips:",
          error
        );
      } finally {
        setLoaded(true);
      }
    };

    loadTrips();
  }, []);

  // ==========================================
  // SAVE TRIPS
  // ==========================================

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const saveTrips = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(trips)
        );
      } catch (error) {
        console.log(
          "Error saving trips:",
          error
        );
      }
    };

    saveTrips();
  }, [trips, loaded]);

  // ==========================================
  // ADD TRIP
  // ==========================================

  const addTrip = (trip: Trip) => {
    setTrips((currentTrips) => [
      ...currentTrips,
      trip,
    ]);
  };

  // ==========================================
  // UPDATE TRIP
  // ==========================================

  const updateTrip = (updatedTrip: Trip) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === updatedTrip.id
          ? updatedTrip
          : trip
      )
    );
  };

  // ==========================================
  // DELETE TRIP
  // ==========================================

  const deleteTrip = (id: string) => {
    setTrips((currentTrips) =>
      currentTrips.filter(
        (trip) => trip.id !== id
      )
    );
  };

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <TripsContext.Provider
      value={{
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export function useTrips() {
  const context = useContext(TripsContext);

  if (!context) {
    throw new Error(
      "useTrips must be used inside TripsProvider"
    );
  }

  return context;
}