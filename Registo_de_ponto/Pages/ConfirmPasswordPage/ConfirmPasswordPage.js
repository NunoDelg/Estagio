import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SenhaConfirmadaPage from "../SenhaConfirmadaPage/SenhaConfirmadaPage";

const ConfirmPasswordPage = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmPassword = () => {
    console.log("Senha confirmada:", password);
    console.log("Confirmar senha:", confirmPassword);
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../src/image/Logotipo_Completo.png")}
        />
      </View>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Crie uma nova senha
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#c4c4c4"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#c4c4c4"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { borderRadius: 5 }]}
        onPress={handleConfirmPassword}
      >
        <Text style={styles.buttonText}>Confirmar Senha</Text>
      </TouchableOpacity>
      {showModal && (
        <SenhaConfirmadaPage visible={showModal} onClose={onClose} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
    marginBottom: 10,
    backgroundColor: "#E7E7E7",
    borderRadius: 5,
  },
  input: {
    padding: 10,
    color: "black",
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    width: 300,
    marginTop: 10,
    backgroundColor: "#21B485",
    padding: 15,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ConfirmPasswordPage;
