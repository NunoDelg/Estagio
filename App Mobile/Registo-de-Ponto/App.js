import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import LoginPage from "./Pages/LoginPage/LoginPage";
import QRScanPage from "./Pages/QRScanPage/QRScanPage";
import QRSuccessPage from "./Pages/QRSuccessPage/QRSuccessPage";
import HistoricoPage from "./Pages/HistoricoPage/HistoricoPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import ConfirmPasswordPage from "./Pages/ConfirmPasswordPage/ConfirmPasswordPage";
import SenhaConfirmadaPage from "./Pages/SenhaConfirmadaPage/SenhaConfirmadaPage";
import UserPage from "./Pages/UserPage/UserPage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QRScanPage"
            component={QRScanPage}
            options={{ title: "Digitalizar QR Code", headerShown: false }}
          />
          <Stack.Screen
            name="QRSuccessPage"
            component={QRSuccessPage}
            options={{ title: "Registro concluído", headerShown: false }}
          />
          <Stack.Screen
            name="HistoricoPage"
            component={HistoricoPage}
            options={{
              title: "Histórico",
              headerStyle: {
                backgroundColor: "#21B485",
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="ForgotPasswordPage"
            component={ForgotPasswordPage}
            options={{ title: "Recuperação de senha", headerShown: false }}
          />
          <Stack.Screen
            name="ConfirmPasswordPage"
            component={ConfirmPasswordPage}
            options={{ title: "Confirmação de senha", headerShown: false }}
          />

          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SenhaConfirmadaPage"
            component={SenhaConfirmadaPage}
          />

          <Stack.Screen
            name="UserPage"
            component={UserPage}
            options={{ title: "Página do Usuário", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
