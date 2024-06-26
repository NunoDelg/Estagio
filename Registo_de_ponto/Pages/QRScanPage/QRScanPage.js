import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../../conf";

const QRScanPage = ({ route }) => {
  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    return currentDateTime.toLocaleString();
  };

  const navigation = useNavigation();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const userIdFromLocalStorage = route.params.Users_idUsers;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      console.log("Permissão da câmera:", status);
    })();
  }, []);

  const handleScannerOpen = async () => {
    setIsCameraOpen(true);
    console.log("Scanner aberto.");
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log("Código QR escaneado:", data);
    setScannedData(data);
    setIsCameraOpen(false);
    await registrarAutomaticamente(data);
  };

  const registrarAutomaticamente = async (token) => {
    try {
      console.log("Enviando token:", token);
      console.log("UserID:", userIdFromLocalStorage);
      const response = await fetch(
        `${URL}/more-api/users/verify-token/${userIdFromLocalStorage}`,
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
      Alert.alert("Sucesso", "Presença marcada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o token:", error.message);
      let errorMessage = "Ocorreu um erro ao tentar enviar o token.";
      if (error instanceof TypeError && error.message === "Falha na conexão") {
        errorMessage =
          "Falha na conexão. Por favor, verifique sua conexão com a internet e tente novamente.";
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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
              <Text style={styles.buttonText}>Utilizador</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.hoursButton, { marginTop: 150 }]}
              onPress={handleHoursButtonPress}
            >
              <Ionicons name="time" size={36} color="black" />
              <Text style={styles.buttonText}>Histórico</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.cameraOverlay}>
            <View style={styles.focusBox} />
            <Text style={styles.cameraText}>Encontrar um código QR</Text>
          </View>
        </>
      )}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  focusBox: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "transparent",
    position: "absolute",
  },
  cameraText: {
    color: "white",
    fontSize: 18,
    marginTop: -500,
  },
});
