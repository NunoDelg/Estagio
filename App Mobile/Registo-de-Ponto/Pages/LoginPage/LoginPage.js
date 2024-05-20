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
import { URL } from "../../conf";
import { styles } from "../styles";

const LoginPage = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${URL}/more-api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: String(email).split(" ")[0],
          password: password,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Erro de rede");
      }

      if (response.status === 200) {
        if (responseData) {
          navigation.navigate("QRScanPage", {
            Users_idUsers: responseData.idUsers,
          });
        }
      } else {
        Alert.alert("Erro", responseData.message);
      }
    } catch (error) {
      console.error("Erro do Fetch:", error.message);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordPage");
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
