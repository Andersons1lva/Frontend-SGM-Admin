import { Container } from "./styles";

export function Button({ icon: Icon,image, title, ...rest }) {
    return (
        <Container
        type="button"
        {...rest}
        >
            {Icon && <Icon size={21} />}
            {image && <img src={image} alt="SVG Image" size={20} />}
            {title}
        </Container>
    );
}