
import { Container, Form } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { AlertModal } from '../../components/AlertaModal';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
                const isAuthenticated = localStorage.getItem('@sgm:token') !== null;
                if (isAuthenticated) {
                    navigate("/")
                }
            })
            .catch((error) => {
                setAlertMessage(error.message);
                setShowAlert(true);
                setLoading(false);
            });
    }


    function handleSignUp() {
        navigate("/register")
    }


    return (
        <Container>

            <div className="logo">
                <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#065E7C" />
                </svg>
                <h1>food explorer</h1>
            </div>


            <Form>
                <h2>Faça login</h2>

                <div className="inputs">
                    <p>Email</p>
                    <Input
                        placeholder="Exemplo: exemplo@exemplo.com.br"
                        type="text"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="inputs">
                    <p>Senha</p>
                    <Input
                        placeholder="No mínimo 6 caracteres"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <Button
                    title={loading ? "Entrando" : "Entrar"}
                    onClick={handleSignIn}
                    disabled={loading}
                />


                <p onClick={handleSignUp}>Criar conta</p>




            </Form>
            {showAlert && <AlertModal message={alertMessage} onClose={() => setShowAlert(false)} />}
        </Container>

    );
}