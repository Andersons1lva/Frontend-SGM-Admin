// import FullCalendar from "@fullcalendar/react";
// import { formatDate } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../styles/theme";
// import calendarioService from "../../services/CalendarioService";
// import { useState, useEffect } from "react";

// const Calendar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [currentEvents, setCurrentEvents] = useState([]);
  
//   // Breakpoints para responsividade
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const isTablet = useMediaQuery('(max-width:960px)');

//   useEffect(() => {
//     loadEvents();
//   }, []);

//   const loadEvents = async () => {
//     try {
//       const eventos = await calendarioService.getAllEventos();
//       const formattedEvents = eventos.map(evento => ({
//         id: evento.id,
//         title: evento.titulo,
//         start: evento.inicio,
//         end: evento.fim,
//         allDay: evento.dia_todo
//       }));
//       setCurrentEvents(formattedEvents);
//     } catch (error) {
//       console.error("Erro ao carregar eventos:", error);
//       setCurrentEvents([]);
//     }
//   };

//   const handleDateClick = async (selected) => {
//     const title = prompt("Por favor, digite um título para seu evento");
//     const calendarApi = selected.view.calendar;
//     calendarApi.unselect();

//     if (title) {
//       try {
//         const newEvento = {
//           title,
//           start: selected.startStr,
//           end: selected.endStr,
//           allDay: selected.allDay
//         };

//         const createdEvent = await calendarioService.criarEventos(newEvento);

//         calendarApi.addEvent({
//           id: createdEvent.id,
//           title: createdEvent.titulo,
//           start: createdEvent.inicio,
//           end: createdEvent.fim,
//           allDay: createdEvent.dia_todo,
//         });
//         await loadEvents();
//       } catch (error) {
//         console.error("Erro ao criar evento:", error);
//         alert("Erro ao criar evento. Por favor, tente novamente.");
//       }
//     }
//   };

//   const handleEventClick = async (selected) => {
//     if (window.confirm(`Tem certeza que deseja deletar o evento '${selected.event.title}'`)) {
//       try {
//         await calendarioService.deleteEventos(selected.event.id);
//         selected.event.remove();
//         await loadEvents();
//       } catch (error) {
//         console.error("Erro ao deletar evento:", error);
//         alert("Erro ao deletar evento. Por favor, tente novamente.");
//       }
//     }
//   };

//   // Configurações responsivas do calendário
//   const getCalendarConfig = () => ({
//     height: isMobile ? "50vh" : "75vh",
//     headerToolbar: isMobile ? {
//       left: "prev,next",
//       center: "title",
//       right: "dayGridMonth,listMonth"
//     } : {
//       left: "prev,next today",
//       center: "title",
//       right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
//     }
//   });

//   return (
//     <Box m={isMobile ? "10px" : "20px"}>
//       <Header title="Calendário" subtitle="Calendário de Eventos." />      
//       <Box 
//         display="flex" 
//         flexDirection={isTablet ? "column" : "row"}
//         marginBottom={1}
//         gap={1}
//       >
//         {/* CALENDAR SIDEBAR */}
//         <Box
//           sx={{
//             width: isTablet ? "100%" : "300px",
//             maxHeight: isTablet ? "30vh" : "73.3vh",
//             overflowY: "auto",
//             mt: 2,
//             position: "relative",
//             paddingRight: "16px",
//             "&::-webkit-scrollbar": {
//               width: "8px",
//               position: "absolute",
//               right: 0,
//             },
//             "&::-webkit-scrollbar-track": {
//               backgroundColor: colors.primary[400],
//             },
//             "&::-webkit-scrollbar-thumb": {
//               backgroundColor: colors.blueAccent[100],
//               borderRadius: "4px",
//             },
//             "&::-webkit-scrollbar-thumb:hover": {
//               backgroundColor: colors.primary[100],
//             },
//           }}
//         >         
//           <Box>
//             <Typography variant="h5" align="center" fontWeight="bold">Eventos</Typography>
//           </Box>
//           <List>
//             {currentEvents.map((event) => (
//               <ListItem
//                 key={event.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[500],
//                   margin: "10px",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <ListItemText
//                   primary={event.title}
//                   secondary={
//                     <Typography>
//                       {formatDate(event.start, {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </Typography>
//                   }                  
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* CALENDAR */}
//         <Box flex="1">
//           <FullCalendar
//             height={isMobile ? "50vh" : "75vh"}
//             plugins={[
//               dayGridPlugin,
//               timeGridPlugin,
//               interactionPlugin,
//               listPlugin,
//             ]}
//             headerToolbar={isMobile ? {
//               left: "prev,next",
//               center: "title",
//               right: "dayGridMonth,listMonth"
//             } : {
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             locale="pt-br"
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             events={currentEvents}            
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Calendar;


import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../styles/theme";
import calendarioService from "../../services/CalendarioService";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  
  // Breakpoints para responsividade
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const eventos = await calendarioService.getAllEventos();
      const formattedEvents = eventos.map(evento => ({
        id: evento.id,
        title: evento.titulo,
        start: moment(evento.inicio).toDate(),
        end: moment(evento.fim).toDate(),
        allDay: evento.dia_todo,
        dia: evento.dia
      }));
      setCurrentEvents(formattedEvents);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
      setCurrentEvents([]);
    }
  };

  const handleSelectSlot = async (slotInfo) => {
    const title = prompt("Por favor, digite um título para seu evento");
    if (title) {
      try {
        const newEvento = {
          title,
          start: slotInfo.start,
          end: slotInfo.end,
          allDay: slotInfo.action === "select"
        };

        const createdEvent = await calendarioService.criarEventos(newEvento);

        setCurrentEvents([...currentEvents, {
          id: createdEvent.id,
          title: createdEvent.titulo,
          start: new Date(createdEvent.inicio),
          end: new Date(createdEvent.fim),
          allDay: createdEvent.dia_todo,
        }]);
      } catch (error) {
        console.error("Erro ao criar evento:", error);
        alert("Erro ao criar evento. Por favor, tente novamente.");
      }
    }
  };

  const handleSelectEvent = async (event) => {
    if (window.confirm(`Tem certeza que deseja deletar o evento '${event.title}'`)) {
      try {
        await calendarioService.deleteEventos(event.id);
        setCurrentEvents(currentEvents.filter(evt => evt.id !== event.id));
      } catch (error) {
        console.error("Erro ao deletar evento:", error);
        alert("Erro ao deletar evento. Por favor, tente novamente.");
      }
    }
  };

  return (
    <Box m={isMobile ? "10px" : "20px"}>
      <Header title="Calendário" subtitle="Calendário de Eventos." />      
      <Box 
        display="flex" 
        flexDirection={isTablet ? "column" : "row"}
        marginBottom={1}
        gap={1}
      >
        {/* CALENDAR SIDEBAR */}
        <Box
          sx={{
            width: isTablet ? "100%" : "300px",
            maxHeight: isTablet ? "30vh" : "73.3vh",
            overflowY: "auto",
            mt: 2,
            position: "relative",
            paddingRight: "16px",
            "&::-webkit-scrollbar": {
              width: "8px",
              position: "absolute",
              right: 0,
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
          <Box>
            <Typography variant="h5" align="center" fontWeight="bold">Eventos</Typography>
          </Box>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {moment(event.start).format("LL")}
                    </Typography>
                  }                  
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1">
          <Calendar
            localizer={localizer}
            events={currentEvents}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            allDayAccessor="allDay"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            views={['month', 'week', 'day', 'agenda']}
            style={{ height: isMobile ? "50vh" : "75vh" }}
            messages={{
              today: 'Hoje',
              previous: 'Anterior',
              next: 'Próximo',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia',
              agenda: 'Agenda',
              date: 'Data',
              time: 'Hora',
              event: 'Evento',
              noEventsInRange: 'Não há eventos neste intervalo.',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarComponent;