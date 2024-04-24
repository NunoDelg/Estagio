import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegistrosPage from "./Pages/RegistrosPage";
import RegistosEquipesPage from "./Pages/RegistosEquipesPage";
import HistoricoPage from "./Pages/HistoricoPage";
import UtilizadoresPage from "./Pages/UtilizadoresPage";
import AdicionarContaPage from "./Pages/AdicionarContaPage";
import EditarUtilizadorPage from "./Pages/EditarUtilizadorPage";
import DetalhesEquipePage from "./Pages/DetalhesEquipePage";
import DetalhesPessoaPage from "./Pages/DetalhesPessoaPage";
import ContaPage from "./Pages/ContaPage";
import GerarQRCodePage from "./Pages/GerarQRCodePage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import CreateNewPasswordPage from "./Pages/CreateNewPasswordPage";


const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/registros" component={RegistrosPage} />
          <Route path="/registos-equipas" component={RegistosEquipesPage} />
          <Route path="/historico" component={HistoricoPage} />
          <Route path="/utilizadores" component={UtilizadoresPage} />
          <Route path="/adicionar-conta" component={AdicionarContaPage} />
          <Route
            path="/editar-utilizador/:username"
            component={EditarUtilizadorPage}
          />
          <Route
            path="/detalhes-equipe/:departamento"
            component={DetalhesEquipePage}
          />
          <Route
            path="/detalhes/:nome/:departamento"
            component={DetalhesPessoaPage}
          />
          <Route path="/conta" component={ContaPage} />
          <Route path="/gerar-qrcode" component={GerarQRCodePage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route
            exact
            path="/create-new-password"
            component={CreateNewPasswordPage}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
