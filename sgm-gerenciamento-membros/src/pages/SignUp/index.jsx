import { Container, Form } from "./style";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { AlertModal } from "../../components/AlertaModal";
import { api } from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo_igreja.png";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleSignUp() {
    if (!name || !email || !password) {
      setAlertMessage("Preencha todos os campos!");
      setShowAlert(true);
      return;
    }

    setLoading(true);

    api
      .post("/users", { name, email, password })
      .then(() => {
        setAlertMessage("Usuário cadastrado com sucesso!");
        setShowAlert(true);
        navigate(-1);
        setLoading(false);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setAlertMessage("Erro: " + error.response.data.error);
          setShowAlert(true);
        } else {
          setAlertMessage("Não foi possível cadastrar");
          setShowAlert(true);
        }

        setLoading(false);
      });
  }

  return (
    <Container>
      <div className="logo">
        <img src={logoImage} alt="logo" width="150" height="180" />
        <h1>SGM</h1>
        <h2>Sistema Gestão de Membros</h2>
      </div>

      <Form>
        <h2>Crie sua conta</h2>

        <div className="inputs">
          <p>Seu nome</p>
          <Input
            placeholder="Exemplo: Maria da Silva"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          title={loading ? "Cadastrando" : "Criar conta"}
          onClick={handleSignUp}
          disabled={loading}
        />

        <p onClick={handleBack}> Já tenho uma conta</p>
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
