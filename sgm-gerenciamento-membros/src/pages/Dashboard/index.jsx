import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PersonIcon from "@mui/icons-material/Person3";
import BoyIcon from "@mui/icons-material/Boy";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman2";
import CakeIcon from "@mui/icons-material/Cake";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import MembroService from "../../services/MembroService";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [memberCount, setMemberCount] = useState(0);
  const [totalHomens, setTotalHomens] = useState(0);
  const [totalMulheres, setTotalMulheres] = useState(0);
  const [totalCasais, setTotalCasais] = useState(0);
  const [totalSolteiros, setTotalSolteiros] = useState(0);
  const [aniversarianteDoMes, setAniversarianteDoMes] = useState(0);
  const [jovens, setJovens] = useState(0);
  const [progressHomens, setProgressHomens] = useState(0);
  const [progressMulheres, setProgressMulheres] = useState(0);
  const [progressJovens, setProgressJovens] = useState(0);
  const [progressCasais, setProgressCasais] = useState(0);
  const [progressSolteiros, setProgressSolterios] = useState(0);
  const [progressMembro, setProgressMembro] = useState(0);


  const fetchAllData = async () => {
    try {
      const response = await MembroService.getAllMembros();

      if (Array.isArray(response)) {
        setMemberCount(response.length);
        setTotalHomens(response.filter((m) => m.sexo === "Masculino").length);
        setTotalMulheres(response.filter((m) => m.sexo === "Feminino").length);
        setTotalCasais(response.filter((m) => m.estadoCivil === "Casado").length);
        setTotalSolteiros(response.filter((m) => m.estadoCivil === "Solteiro").length);
        setJovens(response.filter((m) => m.idade >= 15 && m.idade <= 35).length);

        // Calcular progresso
        setProgressHomens((response.filter((m) => m.sexo === "Masculino").length / response.length
          ).toFixed(2)
        );
        setProgressMulheres((response.filter((m) => m.sexo === "Feminino").length / response.length
          ).toFixed(2)
        );
        setProgressCasais((response.filter((m) => m.estadoCivil === "Casado").length / response.length
          ).toFixed(2)
        );
        setProgressSolterios((response.filter((m) => m.estadoCivil === "Solteiro").length / response.length
          ).toFixed(2)
        );
        setProgressJovens((response.filter((m) => m.idade >= 15 && m.idade <= 35).length / response.length
          ).toFixed(2)
        );
        setProgressMembro(((response.length / response.length) * 100).toFixed(2));
      }
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };

  const fetchAniversarianteDoMes = async () => {
    try {
      const response = await MembroService.aniversarianteDoMes();
      // Verifica se response é um array
      if (Array.isArray(response)) {
        // Filtra os membros que fazem aniversário no mês atual
        const aniversariantes = response
          .map((membro) => {
            const data = new Date(membro.data_nascimento + "T00:00:00");
            const dia = data.getDate();
            return {
              nome: `${membro.nome} ${membro.sobreNome}`,
              dia,
            };
          })
          .sort((a, b) => a.dia - b.dia); // Ordena por dia do mês

        setAniversarianteDoMes(aniversariantes);
      }
    } catch (error) {
      console.error("Erro ao buscar aniversariante: ", error);
      setAniversarianteDoMes([]);
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchAniversarianteDoMes();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Bem-vindo ao seu painel" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Baixar relatórios
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title={memberCount?.toString() || "0"}
            subtitle="Membros"
            progress={progressMembro}
            // increase="+14%"
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title={totalHomens?.toString() || "0"}
            subtitle="Homens"
            progress={progressHomens}
            increase={`${(progressHomens * 100).toFixed(0)}%`}
            icon={
              <ManIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title={totalMulheres?.toString() || "0"}
            subtitle="Mulheres"
            progress={progressMulheres}
            increase={`${(progressMulheres * 100).toFixed(0)}%`}
            icon={
              <WomanIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title={jovens}
            subtitle="Jovens"
            progress={progressJovens}
            increase={`${(progressJovens * 100).toFixed(0)}%`}
            icon={
              <EmojiPeopleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title={totalCasais?.toString() || "0"}
            subtitle="Casais"
            progress={progressCasais}
            increase={`${(progressCasais * 100).toFixed(0)}%`}
            icon={
              <SupervisorAccountIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title={totalSolteiros?.toString() || "0"}
            subtitle="Solteiros"
            progress={progressSolteiros}
            increase={`${(progressSolteiros * 100).toFixed(0)}%`}
            icon={
              <BoyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title={"0"}
            subtitle=""
            progress="0.80"
            increase="+43%"
            icon={
              <BoyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title={"0"}
            subtitle=""
            progress="0.80"
            increase="+43%"
            icon={
              <BoyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ANIVERSARIANTE DO MÊS */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="20px"
          borderRadius="8px"
        >
          <CakeIcon
            sx={{
              color: colors.greenAccent[600],
              fontSize: "26px",
              mb: "10px",
            }}
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            color={colors.grey[100]}
            mb="20px"
            paddingLeft="15px"
          >
            Aniversariantes do Mês
          </Typography>

          <Box
            gridRow="span 1"
            width="100%"
            maxHeight="280px"
            overflow="auto"
            paddingLeft="15px"
            sx={{
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: colors.primary[400],
              },
              "&::-webkit-scrollbar-thumb": {
                background: colors.greenAccent[500],
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: colors.greenAccent[400],
              },
              paddingRight: "15px",
            }}
          >
            {Array.isArray(aniversarianteDoMes) &&
            aniversarianteDoMes.length > 0 ? (
              aniversarianteDoMes.map((aniversariante, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  p="2px"
                  borderBottom={`1px solid ${colors.grey[700]}`}
                  sx={{
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    color={colors.grey[100]}
                    paddingLeft="10px"
                  >
                    <span
                      style={{
                        color: colors.greenAccent[500],
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {aniversariante.dia} -
                    </span>
                    <span
                      style={{ color: colors.grey[100], fontWeight: "bold" }}
                    >
                      {aniversariante.nome}
                    </span>
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography
                variant="h6"
                color={colors.grey[100]}
                textAlign="center"
              >
                Nenhum aniversariante este mês
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="20px"
          borderRadius="8px"
        >
          <Box
            gridRow="span 1"
            width="100%"
            maxHeight="280px"
            overflow="auto"
            paddingLeft="15px"
            sx={{
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: colors.primary[400],
              },
              "&::-webkit-scrollbar-thumb": {
                background: colors.greenAccent[500],
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: colors.greenAccent[400],
              },
              paddingRight: "15px",
            }}
          >
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
