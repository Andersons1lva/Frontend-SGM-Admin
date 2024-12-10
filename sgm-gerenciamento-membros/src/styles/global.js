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

    // button:hover, a:hover {
    //     filter: brightness(0.9);
    // }
    
    

    /* Adicione estes estilos no seu arquivo CSS */
    .appRoutes {
        display: flex;
        position: relative;
        height: 100vh;
        width: 100%;
    }

    /* Estilos para a Sidebar */
    .sidebar {
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        /* Ajuste a largura conforme necessário */
        width: 250px;
    }

    /* Estilos para o container principal */
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        /* Desloca o conteúdo para não sobrepor a sidebar */
        margin-left: 0px;
        min-height: 100vh;
    }

    /* Estilos para a Topbar */
    .topbar {
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 2;
    }

    /* Container para o conteúdo principal abaixo da topbar */
    .main-content {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }
`;