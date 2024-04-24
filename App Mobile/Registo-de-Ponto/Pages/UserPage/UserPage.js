import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UserPage = ({ navigation }) => {
  const handlePrivacySettings = () => {
    navigation.navigate("PrivacySettingsPage");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePasswordPage");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordPage");
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person" size={40} color="#333" style={styles.icon} />
      <Text style={styles.title}>Nuno Delgado</Text>

      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons
          name="log-out"
          size={24}
          color="#fff"
          style={styles.logoutIcon}
        />
        <Text style={[styles.buttonText, { marginLeft: -10 }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#21B485",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    marginTop:20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  logoutIcon: {
    marginRight: 10,
  },
  icon: {
    marginBottom: 10,
    justifyContent: "center",
  },
});

export default UserPage;
