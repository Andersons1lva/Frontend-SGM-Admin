import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 90.6rem;
  height: 100vh;

  margin: auto;
  padding: 14.2rem 4rem;

  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    gap: 0;
    color: white;
    margin-bottom: 4rem;

    h1 {
      font-size: clamp(3rem, 3rem + 1.5vw, 4.248rem);
      white-space: nowrap;
    }

    h1,
    h2 {
      margin: 1.5px; /* Remove margens extras */
    }

    .logo {
      display: flex;
      flex-direction: column;
      gap: 1.9rem;
    }

    svg {
      height: 5rem;
      width: 5rem;
    }
  }

  @media only screen and (min-width: 890px) {
    flex-direction: row;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  max-width: 30.8rem;
  width: 100%;
  padding: 2.5rem;
  border-radius: 1.6rem;

  background-color: #1e5245;

  > h2 {
    font-family: "Poppins", sans-serif;
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 2rem;
    text-align: center;

    margin-bottom: 1.6rem;
  }

  > p {
    margin-top: 1.25rem;
    cursor: pointer;
    text-align: center;
    color: white;
    font-size: 0.77rem;
  }

  > .inputs {
    margin-bottom: 1rem;
  }

  > .inputs p {
    font-size: 0.75rem;
    margin-bottom: 0.8px;
    color: white;
  }

  @media only screen and (max-width: 540px) {
    background-color: transparent;

    padding: 2rem;
    h2 {
      display: none;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: px  white;
  border-radius: 8px;
  background-color:transparent;
  color: gray;
  font-size: 16px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #007bff; /* Cor de foco */
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    background-color: #fff;
  }
`;

export const Option = styled.option`
  background-color: #fff;
  color: #333;
  padding: 10px;
  font-size: 16px;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;
