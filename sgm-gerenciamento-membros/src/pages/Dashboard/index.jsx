import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import MembroService from "../../services/MembroService";

const Dashboard = ({ loading }) => {
  const [memberStats, setMemberStats] = useState({});
  console.log(memberStats);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("@sgm:token");
        if (!token) {
          console.error("Token JWT não encontrado");
          return;
        }

        const response = await MembroService.getAllMembros(token); // Substitua pela URL da sua API
        console.log(response);

        const responseText = await response.text(); // Obter resposta em texto bruto
        console.log("Resposta em texto bruto:", responseText);

        if (response.ok) {
          const data = JSON.parse(responseText);
          setMemberStats(data);
        } else {
          console.error("Erro na requisição:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Dados para o BarChart
  const ageChartData =
    memberStats.ageDistribution?.map((item) => ({
      x: item.range,
      y: item.count,
  })) || [];

  return (
    <Grid container spacing={3}>
      {/* Título do Dashboard */}
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          
        </Typography>
      </Grid>

      {/* Estatísticas Gerais */}
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total de Membros</Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h4">{memberStats.nome}</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Membros Ativos</Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h4">{memberStats.activeMembers}</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Membros Inativos</Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h4">
                {memberStats.inactiveMembers}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Gráfico de Distribuição por Idade */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Distribuição por Idade
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>
              {/* {loading ? (
                <CircularProgress />
              ) : (
                <BarChart
                  data={ageChartData}
                  xAxis={[{ dataKey: "x" }]}
                  series={[{ dataKey: "y", label: "Quantidade de Membros" }]}
                  width={300}
                  height={150}
                />
              )} */}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
