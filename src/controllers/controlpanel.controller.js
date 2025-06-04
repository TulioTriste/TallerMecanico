import controlpanelModel from "../models/controlpanel.model.js";

export const getCountRegisteredVehicles = async (req, res) => {
  try {
    const count = await controlpanelModel.getCountRegisteredVehicles();
    res.json({ count });
  } catch (error) {
    console.error("Error al obtener el conteo de vehículos registrados:", error);
    res.status(500).json({ message: "Error al obtener el conteo de vehículos registrados" });
  }
};

export const getNextCita = async (req, res) => {
  try {
    const taller_id = req.params.taller_id;
    if (!taller_id) {
      return res.status(400).json({ message: "El ID del taller es requerido" });
    }
    
    const nextCita = await controlpanelModel.getNextCita(taller_id);
    if (!nextCita) {
      return res.json({ nextCita: null });
    }

    res.json({ nextCita });
  } catch (error) {
    console.error("Error al obtener la próxima cita:", error);
    res.status(500).json({ message: "Error al obtener la próxima cita" });
  }
};

export const getOrdenesDeTrabajoCount = async (req, res) => {
  try {
    const taller_id = req.params.taller_id;
    if (!taller_id) {
      return res.status(400).json({ message: "El ID del taller es requerido" });
    }

    const count = await controlpanelModel.getOrdenesDeTrabajoCount(taller_id);
    res.json({ count });
  } catch (error) {
    console.error("Error al obtener el conteo de órdenes de trabajo:", error);
    res.status(500).json({ message: "Error al obtener el conteo de órdenes de trabajo" });
  }
};

export const getOrdenesDeTrabajoCountByEstado = async (req, res) => {
  try {
    const { taller_id, estado_id } = req.params;
    if (!taller_id || !estado_id) {
      return res.status(400).json({ message: "El ID del taller y el estado son requeridos" });
    }

    const count = await controlpanelModel.getOrdenesDeTrabajoCountByEstado(taller_id, estado_id);
    res.json({ count });
  } catch (error) {
    console.error("Error al obtener el conteo de órdenes de trabajo por estado:", error);
    res.status(500).json({ message: "Error al obtener el conteo de órdenes de trabajo por estado" });
  }
};

export const getCountCitasProx7Dias = async (req, res) => {
  try {
    const { taller_id } = req.params;
    if (!taller_id) {
      return res.status(400).json({ message: "El ID del taller es requerido" });
    }

    const count = await controlpanelModel.getCountCitasProx7Dias(taller_id);
    res.json({ count });
  } catch (error) {
    console.error("Error al obtener el conteo de citas próximas a 7 días:", error);
    res.status(500).json({ message: "Error al obtener el conteo de citas próximas a 7 días" });
  }
}