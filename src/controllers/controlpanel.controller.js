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