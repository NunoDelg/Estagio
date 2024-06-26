import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegistrosPage from "./Pages/RegistrosPage";
import RegistosEquipesPage from "./Pages/RegistosEquipesPage";
import HistoricoPage from "./Pages/HistoricoPage";
import HistoricoAnualPage from "./Pages/HistoricoAnualPage"; 
import HistoricoMensalPage from "./Pages/HistoricoMensalPage"; 
import UtilizadoresPage from "./Pages/UtilizadoresPage";
import AdicionarContaPage from "./Pages/AdicionarContaPage";
import EditarUtilizadorPage from "./Pages/EditarUtilizadorPage";
import DetalhesEquipePage from "./Pages/DetalhesEquipePage";
import DetalhesPessoaPage from "./Pages/DetalhesPessoaPage";
import ContaPage from "./Pages/ContaPage";
import GerarQRCodePage from "./Pages/GerarQRCodePage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import CreateNewPasswordPage from "./Pages/CreateNewPasswordPage";
import RegistoAgrupado from "./Pages/RegistoAgrupado";
import DetalheEquipeAgrupado from "./Pages/DetalheEquipeAgrupado";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/registros" component={RegistrosPage} />
          <Route path="/registos-equipas" component={RegistosEquipesPage} />
          <Route path="/historico" component={HistoricoPage} />
          <Route path="/historico-anual" component={HistoricoAnualPage} />
          <Route path="/historico-mensal" component={HistoricoMensalPage} /> 
          <Route path="/detalhes-pessoa/:nome" component={DetalhesPessoaPage} />
          <Route path="/utilizadores" component={UtilizadoresPage} />
          <Route path="/adicionar-conta" component={AdicionarContaPage} />
          <Route path="/editar-utilizador/" component={EditarUtilizadorPage} />
          <Route
            path="/detalhes-equipe/:departamento"
            component={DetalhesEquipePage}
          />
          <Route
            path="/detalhe-equipe-agrupado/:departamento"
            component={DetalheEquipeAgrupado}
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
          <Route path="/registo-agrupado" component={RegistoAgrupado} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
