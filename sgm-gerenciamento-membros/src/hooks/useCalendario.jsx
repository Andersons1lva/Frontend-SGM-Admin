import { useState, useEffect, useCallback } from 'react';
import calendarioService from '../services/CalendarioService';

export const useCalendario = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const events = await calendarioService.getAllEventos();
      setCurrentEvents(events);
    } catch (error) {
      setError('Falha ao carregar eventos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateEvent = async (selected) => {
    const titulo = prompt("Insira um novo título para o seu evento.");
    if (!titulo) return null;

    const eventData = {
      titulo,
      inicio: selected.startStr,
      fim: selected.endStr,
      dia_todo: selected.allDay,
    };

    try {
      const newEvent = await calendarioService.criarEventos(eventData);
      await loadEvents();
      return newEvent;
    } catch (error) {
      alert("Erro ao criar evento. Tente novamente.");
      return null;
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await calendarioService.deleteEventos(eventId);
      await loadEvents();
      return true;
    } catch (error) {
      alert("Erro ao deletar evento. Tente novamente.");
      return false;
    }
  };

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    currentEvents,
    setCurrentEvents,
    loading,
    error,
    handleCreateEvent,
    handleDeleteEvent,
    refreshEvents: loadEvents
  };
};