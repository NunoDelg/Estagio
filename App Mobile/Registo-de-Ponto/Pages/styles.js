import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  loginText: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    width: 300,
    marginBottom: 10,
  },
  smallInput: {
    height: 50,
    backgroundColor: "#E7E7E7",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  loginButton: {
    marginTop: 20,
    width: 200,
    padding: 5,
    backgroundColor: "#21B485",
    borderRadius: 5,
    shadowRadius: 5,
  },
  forgotPasswordButtonContainer: {
    width: 300,
    alignItems: "center",
  },
  forgotPasswordButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  passwordInput: {
    borderWidth: 0,
    borderBottomWidth: 0,
  },
});
