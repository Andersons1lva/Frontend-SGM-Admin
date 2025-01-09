import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../styles/theme";
import calendarioService from "../../services/CalendarioService";
import { useState, useEffect } from "react";


const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  // Carregar eventos ao iniciar o componente
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () =>{
    try {
      const eventos = await calendarioService.getAllEventos();
      const formattedEvents = eventos.map(evento =>({
          id: evento.id,
          title: evento.titulo,
          start: evento.inicio,
          end: evento.fim,
          allDay: evento.dia_todo
      }));
      setCurrentEvents(formattedEvents);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
      setCurrentEvents([]);
    }
  }

  const handleDateClick = async (selected) => {
    const title = prompt("Por favor, digite um título para seu evento");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      try {
        const newEvento = {
          title,
          start: selected.startStr,
          end: selected.endStr,
          allDay: selected.allDay
        };

        const createdEvent = await calendarioService.criarEventos(newEvento);

        calendarApi.addEvent({
          id: createdEvent.id,
          title: createdEvent.titulo,
          start: createdEvent.inicio,
          end: createdEvent.fim,
          allDay: createdEvent.dia_todo,
        });
        await loadEvents();
      } catch (error) {
        console.error("Erro ao criar evento:", error);
        alert("Erro ao criar evento. Por favor, tente novamente.");
      }
    }
   
  };

  const handleEventClick = async (selected) => {
    if (window.confirm(`Tem certeza que deseja deletar o evento '${selected.event.title}'`)) {
      try {
        // Deletar evento no backend
        await calendarioService.deleteEventos(selected.event.id);
        
        // Remover evento do calendário
        selected.event.remove();
        
        // Recarregar eventos para atualizar a lista lateral
        await loadEvents();
      } catch (error) {
        console.error("Erro ao deletar evento:", error);
        alert("Erro ao deletar evento. Por favor, tente novamente.");
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendário" subtitle="Calendário de Eventos." />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          paddingRight="15px"
          sx={{
            maxHeight: "73.3vh", // altura máxima
            minWidth: "10vh",
            overflowY: "auto", // adiciona scroll vertical
            mt: 2, // margem do topo
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: colors.primary[400],
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.blueAccent[100],
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: colors.primary[100],
            },
          }}
        >
          <Typography variant="h5" align="center">Eventos</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            locale="pt-br"
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents} // Usar os eventos do estado
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;