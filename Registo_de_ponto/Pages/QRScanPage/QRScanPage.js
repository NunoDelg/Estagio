import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../../conf";
import moment from "moment";
import QRSuccessPage from "../QRSuccessPage/QRSuccessPage";

const QRScanPage = ({ route }) => {
  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    return currentDateTime.toLocaleString();
  };

  const navigation = useNavigation();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const idUsersFromLocalStorage = route.params.Users_idUsers;

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert("Erro", "Permissão de câmera não concedida");
      }
    })();
  }, []);

  const handleScannerOpen = () => {
    setIsCameraOpen(true);
    console.log("Scanner aberto.");
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log("Código QR escaneado:", data);
    setScannedData(data);
    console.log("Escaneado com sucesso, fechando a câmera...");
    setIsCameraOpen(false);
    try {
      console.log("Iniciando registro automático...");
      await registrarAutomaticamente(data);
      console.log("Registro automático concluído.");
    } catch (error) {
      console.error("Erro durante o registro automático:", error);
    }
  };

  const registrarAutomaticamente = async (token) => {
    try {
      console.log("Enviando token:", token);
      console.log("UserID:", idUsersFromLocalStorage);
      const response = await fetch(
        `${URL}/more-api/users/verify-token/${idUsersFromLocalStorage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qr_data: token,
            Saida: "#",
          }),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        console.error("Erro na resposta da API:", responseData);
        throw new Error(responseData.message || "Erro ao marcar presença.");
      }
      console.log("Presença marcada com sucesso.");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Erro ao enviar o token:", error.message);
      let errorMessage = "Ocorreu um erro ao tentar enviar o token.";
      if (error instanceof TypeError && error.message === "Falha na conexão") {
        errorMessage = "Falha na conexão";
      }
      Alert.alert("Erro", errorMessage);
    }
  };

  const handleUserButtonPress = () => {
    navigation.navigate("UserPage");
  };

  const handleHoursButtonPress = () => {
    navigation.navigate("HistoricoPage");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (!hasPermission) {
    return <View />;
  }

  if (!hasPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Precisamos da sua permissão para usar a câmera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Text style={[styles.text, styles.loginText]}>Bem-vindo</Text>
        <Text style={[styles.text, styles.dateTimeText]}>
          {getCurrentDateTime().split(",")[1]}
        </Text>
        <Text style={[styles.text, styles.dateTimeText]}>
          {getCurrentDateTime().split(",")[0]}
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../src/image/linha.png")}
          style={styles.image}
        />
      </View>

      {!isCameraOpen ? (
        <View style={styles.lowerSection}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleScannerOpen}
          >
            <View style={styles.qrIconContainer}>
              <Ionicons name="qr-code" size={80} color="#21B485" />
            </View>
          </TouchableOpacity>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.userButton, { marginTop: 150 }]}
              onPress={handleUserButtonPress}
            >
              <Ionicons name="person" size={36} color="black" />
              <Text style={styles.iconText}>Utilizador</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.hoursButton, { marginTop: 150 }]}
              onPress={handleHoursButtonPress}
            >
              <Ionicons name="time" size={36} color="black" />
              <Text style={styles.iconText}>Histórico</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <CameraView
            style={styles.camera}
            type="back"
            onBarCodeScanned={handleBarCodeScanned}
          />
          <View style={styles.cameraOverlay}>
            <View style={styles.focusBox} />
            <Text style={styles.cameraText}>Encontrar um código QR</Text>
          </View>
        </>
      )}
      <QRSuccessPage
        visible={showSuccessModal}
        onClose={handleCloseSuccessModal}
      />
    </View>
  );
};

export default QRScanPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  upperSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    height: 150,
    width: "100%",
    marginBottom: 10,
  },
  text: {
    fontFamily: "Roboto",
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dateTimeText: {
    fontSize: 18,
    marginBottom: 5,
  },
  lowerSection: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 55,
  },
  scanButton: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: "center",
    shadowColor: "rgba(0, 128, 0, 0.5)",
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 50,
  },
  qrIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 1,
    alignItems: "center",
  },
  userButton: {
    marginRight: 150,
    alignItems: "center",
  },
  hoursButton: {
    alignItems: "center",
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  focusBox: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  cameraText: {
    color: "white",
    fontSize: 18,
    position: "absolute",
    top: "20%",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
});
