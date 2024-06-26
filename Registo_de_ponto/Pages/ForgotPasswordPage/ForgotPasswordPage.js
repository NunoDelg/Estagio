import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");

  const handleResetPassword = () => {
    console.log("Solicitação de redefinição de senha para o email:", email);
    navigation.navigate("ConfirmPasswordPage");
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
        Esqueceu sua senha?
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Insira o seu e-mail"
          value={email}
          onChangeText={setEmail}
          secureTextEntry
          placeholderTextColor="#c4c4c4"
          
        />
      </View>
      <TouchableOpacity
        onPress={handleResetPassword}
        style={[styles.button, { backgroundColor: "#21B485" }]}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Enviar Código</Text>
      </TouchableOpacity>
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
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    width: 300,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#E7E7E7",
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
    width: 300,
    marginTop: 10,
    backgroundColor: "#21B485",
    padding: 15,
    alignItems: "center",
    width: 200,
  },
  placeholderText: {
    borderRadius: 5,
  },
});

export default ForgotPasswordPage;
