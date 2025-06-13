import vehiculoModel from "../models/vehiculo.model.js";

export const getVehiculoName = async (req, res) => {
  try {
    const {patente} = req.params;
    const vehiculoName = await vehiculoModel.getVehiculoName(patente);
    res.json({vehiculoName});
  } catch (error) {
    console.error("Error al obtener el nombre del vehículo:", error);
    res.status(500).json({message: "Error al obtener el nombre del vehículo"});
  }
};