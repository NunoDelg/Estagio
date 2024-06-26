import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const QRSuccessPage = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const goToHistoryPage = () => {
    navigation.navigate("HistoricoPage");
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
            Seu registro foi concluído!
          </Text>
          <Text style={[styles.fontRoboto]}>Data: {formattedDate}</Text>
          <Text style={[styles.fontRoboto]}>Hora: {formattedTime}</Text>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={goToHistoryPage}
          >
            <Text style={styles.buttonText}>Ir para Histórico</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fontRoboto: {
    fontFamily: "Roboto",
  },
  roundedButton: {
    backgroundColor: "#21B485",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QRSuccessPage;
