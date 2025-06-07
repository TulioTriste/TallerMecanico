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
};

export const getCountOTMes = async (req, res) => {
  try {
    const { taller_id } = req.params;
    if (!taller_id) {
      return res.status(400).json({ message: "El ID del taller es requerido" });
    }

    const count = await controlpanelModel.getCountOTMes(taller_id);
    res.json({ count });
  } catch (error) {
    console.error("Error al obtener el conteo de órdenes de trabajo del mes:", error);
    res.status(500).json({ message: "Error al obtener el conteo de órdenes de trabajo del mes" });
  }
};

export const getRecentOTs = async (req, res) => {
  try {
    const { taller_id, days } = req.params;
    if (!taller_id) {
      return res.status(400).json({ message: "El ID del taller es requerido" });
    }

    if (!days || isNaN(days)) {
      return res.status(400).json({ message: "El número de días es requerido y debe ser un número" });
    }

    const recentOTs = await controlpanelModel.getRecentOTs(taller_id, days);
    res.json(recentOTs);
  } catch (error) {
    console.error("Error al obtener las órdenes de trabajo recientes:", error);
    res.status(500).json({ message: "Error al obtener las órdenes de trabajo recientes" });
  }
};

export const getCitasHoy = async (req, res) => {
  try {
    const { taller_id } = req.params;
    if (!taller_id) {
      return res.status(400).json({ message: "El ID del taller es requerido" });
    }

    const citasHoy = await controlpanelModel.getCitasHoy(taller_id);
    res.json(citasHoy);
  } catch (error) {
    console.error("Error al obtener las citas de hoy:", error);
    res.status(500).json({ message: "Error al obtener las citas de hoy" });
  }
};

export const getIngresosDelMes = async (req, res) => {
  try {
    const { taller_id } = req.params;
    if (!taller_id) {
      return res.status(400).json({ message: "El ID del taller es requerido" });
    }

    const ingresos = await controlpanelModel.getIngresosDelMes(taller_id);
    res.json({ ingresos });
  } catch (error) {
    console.error("Error al obtener los ingresos del mes:", error);
    res.status(500).json({ message: "Error al obtener los ingresos del mes" });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await controlpanelModel.getRoles();
    res.json(roles);
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    res.status(500).json({ message: "Error al obtener los roles" });
  }
}