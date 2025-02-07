import { Box, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../styles/theme";
import { useState, useEffect } from "react";
import MembroService from "../../services/MembroService";
import Button from "@mui/material/Button";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Formulario from "../../pages/Formulario"

const Membro = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleRowClick = (params, event) =>{
    if (event.target.tagName === "BUTTON") {
      return;
    }
    navigate(`/detalhesMembro/${params.row.id}`);
  }

  // Estado para armazenar os membros
  const [membro, setMembro] = useState([]);
  const [membroSelecionado, setMembroSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Função para buscar os membros da API
  const fetchMembros = async () => {
    
    try {
      const data = await MembroService.getAllMembros();
      setMembro(data); 
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
    }
  };

  // Carrega os membros da API ao montar o componente
  useEffect(() => {
    fetchMembros();
  }, []); // Executa apenas uma vez ao montar o componente

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
      width: 50,
      sortable: true,
      resizable: false,
    },
    {
      field: "idade",
      headerName: "Idade",
      type: "text",
      headerAlign: "center",
      align: "center",
      width: 50,
      sortable: true,
      resizable: false,
    },
    {
      field: "numero_celular",
      headerName: "Celular",
      flex: 1,
      align: "center",
      headerAlign: "center",
      width: 100,
      sortable: true,
      resizable: false,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 2,
      align: "center",
      headerAlign: "center",
      width: 200,
      sortable: true,
      resizable: false,
    },
    {
      field: "funcao_ministerial",
      headerName: "Ministério ",
      align: "center",
      flex: 1,
      headerAlign: "center",
      width: 100,
      sortable: true,
      resizable: false,
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 50,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      resizable: false,
      disableColumnMenu: true,
      minWidth: 170,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(params.row.id)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Excluir
          </Button>
        </>
      ),
    },
  ];

  // Função para editar um membro
  const handleEdit = (membroId) => {
    const membroParaEditar = membro.find((m)=> m.id === membroId);
    setMembroSelecionado(membroParaEditar);
    setModoEdicao(true);
  };

  const handleEditarSucesso = () => {
    setModoEdicao(false);
    setMembroSelecionado(null);
    // Aqui você pode adicionar a lógica para atualizar a lista de membros
  };

  if (modoEdicao) {
    return (
      <Formulario
        initialMemberData={membroSelecionado}
        onSubmitSuccess={handleEditarSucesso}
        modoEdicao ={true}
      />
    );
  }

  // Função para excluir um membro
  const handleDelete = async (id) => {
    try {
      await MembroService.deleteMembro(id.toString());
      setMembro(membro.filter((member) => member.id !== id)); // Atualiza a lista removendo o membro excluído
    } catch (error) {
      console.error("Erro ao excluir o membro:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="MEMBROS" subtitle="Gerenciamento dos Membros" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",            
            paddingLeft:"15px",
          },
          "& .name-column--cell": {
            // color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          // Estilização para a barra de rolagem
          "& ::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
            
          },
          "& ::-webkit-scrollbar-track": {
            backgroundColor: `${colors.primary[400]} !important`,
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: `${colors.greenAccent[600]} !important`,
            borderRadius: "8px",
          },
          "& ::-webkit-scrollbar-thumb:hover": {
            backgroundColor: `${colors.blueAccent[700]} !important`,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            // backgroundColor: colors.greenAccent[600],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          }
        }}
      >
        {/* Agora usando o estado 'team' para preencher a tabela */}
        <DataGrid rows={membro} columns={columns} onRowClick={(params,event) =>handleRowClick(params,event)} />
      </Box>
    </Box>
  );
};

export default Membro;
