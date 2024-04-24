import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";

const HistoryPage = () => {
  const calculateHoursDifference = (entryTime, exitTime) => {
    if (!entryTime || !exitTime) return "0:00";

    const entry = new Date(`1970-01-01 ${entryTime}`);
    const exit = new Date(`1970-01-01 ${exitTime}`);
    const diff = exit - entry;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const historyData = [
    {
      date: "2024-03-10",
      dayOfWeek: "Segunda-feira",
      entryTimeMorning: "09:00",
      exitTimeMorning: "12:40",
      entryTimeAfternoon: "14:00",
      exitTimeAfternoon: "18:00",
    },
    {
      date: "2024-03-11",
      dayOfWeek: "Terça-feira",
      entryTimeMorning: "09:00",
      exitTimeMorning: "12:30",
      entryTimeAfternoon: "14:00",
      exitTimeAfternoon: "18:00",
    },
    {
      date: "2024-03-12",
      dayOfWeek: "Quarta-feira",
      entryTimeMorning: "09:00",
      exitTimeMorning: "12:57",
      entryTimeAfternoon: "14:00",
      exitTimeAfternoon: "18:00",
    },
    {
      date: "2024-03-13",
      dayOfWeek: "Quinta-feira",
      entryTimeMorning: "09:00",
      exitTimeMorning: "",
      entryTimeAfternoon: "",
      exitTimeAfternoon: "",
    },
  ];

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      {historyData.map((day, index) => {
        const totalHoursMorning = calculateHoursDifference(
          day.entryTimeMorning,
          day.exitTimeMorning
        );
        const totalHoursAfternoon = calculateHoursDifference(
          day.entryTimeAfternoon,
          day.exitTimeAfternoon
        );
        return (
          <View key={index} style={[styles.dayContainer]}>
            <View style={styles.dateContainer}>
              <Text style={[styles.dateText]}>{day.date}</Text>
              <Text style={[styles.dayOfWeekText]}>{day.dayOfWeek}</Text>
            </View>
            <View style={styles.timeContainer}>
              <View style={styles.timeBlock}>
                <Text style={styles.timeText}>Manhã:</Text>
                <Text style={styles.timeText}>
                  Entrada: {day.entryTimeMorning}
                </Text>
                <Text style={styles.timeText}>
                  Saída: {day.exitTimeMorning}
                </Text>
                <Text style={styles.totalHoursText}>
                  Total: {totalHoursMorning}
                </Text>
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.timeText}>Tarde:</Text>
                <Text style={styles.timeText}>
                  Entrada: {day.entryTimeAfternoon}
                </Text>
                <Text style={styles.timeText}>
                  Saída: {day.exitTimeAfternoon}
                </Text>
                <Text style={styles.totalHoursText}>
                  Total: {totalHoursAfternoon}
                </Text>
              </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  dateContainer: {},
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Roboto_400Regular",
  },
  dayOfWeekText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Roboto_400Regular",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 20,
  },
  timeBlock: {
    alignItems: "flex-start",
  },
  timeText: {
    fontSize: 12,
    marginBottom: 3,
    fontFamily: "Roboto_400Regular",
  },
  totalHoursText: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto_400Regular",
  },
});

export default HistoryPage;
