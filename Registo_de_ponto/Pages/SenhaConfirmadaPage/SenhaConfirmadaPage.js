import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SenhaConfirmadaPage = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const handleLogin = () => {
    onClose(false);
    navigation.navigate("LoginPage"); 
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Ionicons name="checkmark-circle" size={80} color="#21B485" />
          <Text style={[styles.successText, styles.fontRoboto]}>
            Senha trocada com sucesso!
          </Text>
          <TouchableOpacity style={styles.roundedButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  successText: {
    fontSize: 18,
    marginBottom: 10,
  },
  roundedButton: {
    backgroundColor: "#21B485",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});

export default SenhaConfirmadaPage;
