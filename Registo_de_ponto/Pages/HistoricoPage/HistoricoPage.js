import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../../conf";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idUsers, setIdUsers] = useState(null);

  useEffect(() => {
    const fetchIdUsers = async () => {
      try {
        const storedIdUsers = await AsyncStorage.getItem("idUsers");
        if (storedIdUsers) {
          setIdUsers(storedIdUsers);
        } else {
          setError("User ID not found");
          setLoading(false);
        }
      } catch (e) {
        console.error("Error fetching user ID from AsyncStorage:", e);
      }
    };

    fetchIdUsers();
  }, []);

  useEffect(() => {
    if (idUsers) {
      const fetchHistoryData = async () => {
        try {
          const response = await fetch(
            `${URL}/more-api/users/registos/${idUsers}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setHistoryData(data);
        } catch (err) {
          console.error("Error fetching history data:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchHistoryData();
    }
  }, [idUsers]);

  const calculateHoursDifference = (entryTime, exitTime) => {
    if (!entryTime || !exitTime) return 0;

    const entry = new Date(entryTime);
    const exit = new Date(exitTime);
    const diff = exit - entry;
    const hours = diff / (1000 * 60 * 60);
    return hours;
  };

  const calculateTotalHours = (day) => {
    const morningHours = calculateHoursDifference(day.Entrada1, day.Saida1);
    const afternoonHours = calculateHoursDifference(day.Entrada2, day.Saida2);
    return morningHours + afternoonHours;
  };

  const formatTime = (time) => {
    if (!time) return "--:--";
    const date = new Date(time);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {historyData.map((day, index) => {
        const totalHours = calculateTotalHours(day);
        return (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{day.date}</Text>
              <Text style={styles.dayOfWeekText}>{day.dayOfWeek}</Text>
            </View>
            <View style={styles.timeContainer}>
              <View style={styles.timeBlock}>
                <Text style={styles.labelText}>Manhã:</Text>
                <Text style={styles.timeText}>Entrada: {formatTime(day.Entrada1)}</Text>
                <Text style={styles.timeText}>Saída: {formatTime(day.Saida1)}</Text>
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.labelText}>Tarde:</Text>
                <Text style={styles.timeText}>Entrada: {formatTime(day.Entrada2)}</Text>
                <Text style={styles.timeText}>Saída: {formatTime(day.Saida2)}</Text>
              </View>
            </View>
            <View style={styles.totalBlock}>
              <Text style={styles.totalHoursText}>Total Horas: {totalHours.toFixed(2)}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  dayContainer: {
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dateContainer: {
    marginBottom: -50,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto_400Regular",
  },
  dayOfWeekText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Roboto_400Regular",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeBlock: {
    marginBottom: 9,
    marginRight: 30,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto_400Regular",
    color: "#333",
  },
  timeText: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    marginLeft: 10,
  },
  totalBlock: {
    marginTop: 10,
  },
  totalHoursText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto_400Regular",
    color: "#000",
  },
});

export default HistoryPage;
