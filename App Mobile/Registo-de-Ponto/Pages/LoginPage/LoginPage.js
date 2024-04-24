import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles";

const LoginPage = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Botão de login pressionado");
    console.log(email);
    console.log(password);

    try {
      const response = await fetch("http://192.168.0.149:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email,
          Password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        await AsyncStorage.setItem("token", responseData.token);
        navigation.navigate("QRScanPage");
      } else {
        Alert.alert("Erro", responseData.message);
      }
    } catch (error) {
      console.error("Erro do Fetch:", error.message);
      Alert.alert(
        "Erro",
        "Não foi possível fazer login. Por favor, tente novamente."
      );
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordPage");
  };

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccountPage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../src/image/Logotipo_Completo.png")}
        />
      </View>
      <Text style={styles.loginText}>Faça o seu login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.smallInput, styles.passwordInput]}
          placeholderTextColor="#c4c4c4"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.smallInput, styles.passwordInput]}
          placeholderTextColor="#c4c4c4"
          secureTextEntry
        />
      </View>
      <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
        Entrar
      </Button>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordButton}>
          Esqueceu a palavra-passe
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
