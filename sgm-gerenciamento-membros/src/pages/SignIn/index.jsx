import { Container, Form } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { AlertModal } from "../../components/AlertaModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo_igreja.png";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  function handleSignIn() {
    signIn({ email, password })
      .then(() => {
        setLoading(false);
        const isAuthenticated = localStorage.getItem("@sgm:token") !== null;
        if (isAuthenticated) {
          navigate("/");
        }
      })
      .catch((error) => {
        setAlertMessage(error.message);
        setShowAlert(true);
        setLoading(false);
      });
  }

  function handleSignUp() {
    navigate("/register");
  }

  return (
    <Container>
      <div className="logo">
        <img src={logoImage} alt="logo" width="150" height="180" />
        <h1>SGM</h1>
        <h2>Sistema Gestão de Membros</h2>
      </div>

      <Form>
        <h2>Faça login</h2>

        <div className="inputs">
          <p>Email</p>
          <Input
            placeholder="Exemplo: exemplo@exemplo.com.br"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputs">
          <p>Senha</p>
          <Input
            placeholder="No mínimo 6 caracteres"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          title={loading ? "Entrando" : "Entrar"}
          onClick={handleSignIn}
          disabled={loading}
        />

        <p onClick={handleSignUp}>Criar conta</p>
      </Form>
      {showAlert && (
        <AlertModal
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </Container>
  );
}
