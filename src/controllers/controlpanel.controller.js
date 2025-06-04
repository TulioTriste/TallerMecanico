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
    const taller_id = req.params.id;
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
}