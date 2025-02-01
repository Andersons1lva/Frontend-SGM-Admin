// DetalhesMembro.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, Divider,useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import MembroService from "../../services/MembroService";
import { tokens } from "../../styles/theme";

// Componente para exibir cada campo de informação
const InfoField = ({ label, value }) => (
  <Box mb={4}>
    <Typography variant="subtitle2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1">
      {value || '-'}
    </Typography>
  </Box>
);

const DetalhesMembro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [membro, setMembro] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const carregarDetalhes = async () => {
    try {
      const detalhes = await MembroService.buscarPorId(id);
      setMembro(detalhes); 
    } catch (error) {
      console.error("Erro ao buscar membros por id:", error);
    }
  };

  // Carrega os membros da API ao montar o componente
  useEffect(() => {
    carregarDetalhes();
  }, [id]);

  if (!membro) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  // Função para formatar datas
  const formatarData = (dataString) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <Box p={3}>
      {/* Cabeçalho com botão de voltar */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{ mb: 3,background: `${colors.primary[400]} !important` }}
      >
        Voltar
      </Button>

      <Paper elevation={3} sx={{ p: 1.5, background: `${colors.primary[400]} !important`}}>
        {/* Título */}
        <Typography variant="h1" gutterBottom>
          {membro.nome} {membro.sobrenome}
        </Typography>

        {/* Informações Pessoais */}
        <Typography variant="h4" color='secondary' gutterBottom sx={{ mt: 1 }}>
          Informações Pessoais
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap={2}>
          <InfoField label="Idade" value={membro.idade} />
          <InfoField label="RG" value={membro.rg} />
          <InfoField label="CPF" value={membro.cpf} />
          <InfoField label="Estado Civil" value={membro.estado_civil} />
          <InfoField label="Nacionalidade" value={membro.nascionalidade} />
          <InfoField label="Naturalidade" value={membro.naturalidade} />
          <InfoField label="Sexo" value={membro.sexo} />
          <InfoField label="Data de Nascimento" value={formatarData(membro.data_nascimento)} />          
          <InfoField label="Data de Casamento" value={formatarData(membro.data_casamento)} />
        </Box>

        <Divider sx={{ mt: 2, mb: 2 }} />
        
        {/* Informações de Contato */}
        <Typography variant="h4" color='secondary' gutterBottom sx={{ mt: 1 }}>
          Contato
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap={3}>
          <InfoField label="Celular" value={membro.numero_celular} />
          <InfoField label="Telefone Fixo" value={membro.telefone_fixo} />
          <InfoField label="Email" value={membro.email} />
        </Box>

        <Divider sx={{ mt: 2, mb: 2 }} />
        
        {/* Informações Familiares */}
        <Typography variant="h4" color='secondary' gutterBottom sx={{ mt: 1 }}>
          Informações Familiares
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap={3}>
          <InfoField label="Nome do Pai" value={membro.nome_pai} />
          <InfoField label="Nome da Mãe" value={membro.nome_mae} />
        </Box>

        <Divider sx={{ mt: 2, mb: 2 }} />
        
        {/* Informações Ministeriais */}
        <Typography variant="h4" color='secondary' gutterBottom sx={{ mt: 1 }}>
          Informações Ministeriais
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap={3}>
          <InfoField label="Função Ministerial" value={membro.funcao_ministerial} />
          <InfoField label="Data de Batismo" value={formatarData(membro.data_batismo)} />
          <InfoField label="Tempo de Membro" value={membro.tempo_membro} />
        </Box>

        <Divider sx={{ mt: 2, mb: 2 }} />
        
        {/* Endereço */}
        <Typography variant="h4" color='secondary' gutterBottom sx={{ mt: 1 }}>
          Endereço
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={3}>
          <InfoField label="Rua" value={membro.endereco.rua} />
          <InfoField label="Número" value={membro.endereco.numero} />
          <InfoField label="Complemento" value={membro.endereco.complemento} />
          <InfoField label="CEP" value={membro.endereco.cep} />
          <InfoField label="Cidade" value={membro.endereco.cidade} />
        </Box>
      </Paper>
    </Box>
  );
};

export default DetalhesMembro;