import styled from "styled-components";

export const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    width: 100%;
    height: 3.8rem;
    padding: 1.2rem 3.3rem;
    gap: 0.8rem;
    border: 0;
    border-radius: 0.5rem;
    
    font-weight: 500;
    font-size: 1.2rem;

    color: ${({ theme }) => theme.COLORS.WHITE};
    background-color: #70d8bd;
`;