import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :root {
        // font-size: 62.5%;
    }

    body {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        color: ${({ theme }) => theme.COLORS.WHITE};
      
      

        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        
        }

        /* Firefox */
        input[type=number] {
        -moz-appearance: textfield;
        }   
    }

    body, input, textarea {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        outline: none;
    }

    button {
        font-family: 'Poppins', sans-serif;
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }
    
    

    /* Adicione estes estilos no seu arquivo CSS */
    .appRoutes {
        display: flex;
        position: relative;
        height: 100vh;
        width: 100%;
        overflow: hidden; /* Previne scroll duplo */
    }

    /* Estilos para a Sidebar */
    .sidebar {
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        width: ${props => props.isCollapsed ? '80px' : '250px'};
        transition: width 0.3s ease;
        z-index: 1000;
    }
    .topbar {
        position: fixed;
        top: 0;
        right: 0;
        width: calc(100% - ${props => props.isCollapsed ? '80px' : '250px'});
        height: 64px;
        z-index: 1000;
        background: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        transition: width 0.3s ease;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding-top: 64px; /* Altura da topbar */
        overflow-y: auto;
        transition: margin-left 0.3s ease;
    }

   

    /* Container para o conteúdo principal abaixo da topbar */
    .main-content {
        padding: 20px;
        margin-top: 64px;
    }
`;