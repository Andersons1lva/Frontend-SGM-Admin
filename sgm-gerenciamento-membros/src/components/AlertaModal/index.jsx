import { Container } from "./styles"



 export function AlertModal({ message, onClose }) {
  return (
    <Container>
  
      <div className="alert-modal">
        <p>{message}</p>
    
        <button onClick={onClose}>Fechar</button>

      </div>
   
    </Container>
  );
};