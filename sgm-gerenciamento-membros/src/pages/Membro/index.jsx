import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../styles/theme";
import { useState, useEffect } from "react";
import MembroService from "../../services/MembroService";
import Button from "@mui/material/Button";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Formulario from "../../pages/Formulario";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Membro = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [membro, setMembro] = useState([]);
  const [membroSelecionado, setMembroSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const data = await MembroService.getAllMembros();
        // Processa os dados para adicionar a idade calculada
        const membrosComIdade = data.map((membro) => {
          return {
            ...membro,
            idade: membro.data_nascimento
              ? calcularIdade(membro.data_nascimento)
              : membro.idade,
          };
        });

        setMembro(membrosComIdade);
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
      }
    };
    fetchMembros();
  }, []);

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Ajusta a idade se o aniversário ainda não tiver passado no ano atual
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idadeCalculada--;
    }

    return idadeCalculada;
  };

  const handleRowClick = (params, event) => {
    if (event.target.tagName === "BUTTON") return;
    navigate(`/detalhesMembro/${params.row.id}`);
  };

  const handleEdit = (membroId) => {
    const membroParaEditar = membro.find((m) => m.id === membroId);
    setMembroSelecionado(membroParaEditar);
    setModoEdicao(true);
  };

  const handleEditarSucesso = async () => {
    setModoEdicao(false);
    setMembroSelecionado(null);

    // Recarrega os dados dos membros
    try {
      const data = await MembroService.getAllMembros();

      // Processa os dados para adicionar a idade calculada
      const membrosComIdade = data.map((membro) => {
        return {
          ...membro,
          idade: membro.data_nascimento
            ? calcularIdade(membro.data_nascimento)
            : membro.idade,
        };
      });

      setMembro(membrosComIdade);
    } catch (error) {
      console.error("Erro ao recarregar membros:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await MembroService.deleteMembro(id.toString());
      setMembro(membro.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o membro:", error);
    }
  };

  if (modoEdicao) {
    return (
      <Formulario
        initialMemberData={membroSelecionado}
        onSubmitSuccess={handleEditarSucesso}
        modoEdicao={true}
      />
    );
  }

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      flex: 0.5,
      minWidth: 110,
    },
    {
      field: "sobrenome",
      headerName: "Sobrenome",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "numero_celular",
      headerName: "Celular",
      flex: 1,
      minWidth: 108,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "funcao_ministerial",
      headerName: "Ministério",
      flex: 1,
      minWidth: 125,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Ações",
      flex: isMobile ? 0.5 : 1,
      minWidth: isMobile ? 107 : 159,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{
              marginRight: isMobile ? 5 : 10,
              minWidth: isMobile ? "30px" : "auto",
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleEdit(params.row.id);
            }}
          >
            {isMobile ? <EditIcon /> : "Editar"}
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            style={{
              minWidth: isMobile ? "30px" : "auto",
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.row.id);
            }}
          >
            {isMobile ? <DeleteIcon /> : "Excluir"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="MEMBROS" subtitle="Gerenciamento dos Membros" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        width="100%"
        sx={{
          overflowX: "auto", // Permite scroll horizontal se necessário
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            paddingLeft: "10px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& ::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: colors.greenAccent[600],
            borderRadius: "8px",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={membro}
          columns={columns}
          onRowClick={(params, event) => handleRowClick(params, event)}
          autoHeight={isMobile} // Ajusta a altura automaticamente no mobile
          pageSize={isMobile ? 5 : 10} // Menos linhas por página no mobile
        />
      </Box>
    </Box>
  );
};

export default Membro;
