import VehiculoModel from "../models/vehiculo.model.js";

export const getVehiculoName = async (req, res) => {
  try {
    const {patente} = req.params;
    const vehiculoName = await VehiculoModel.getVehiculoName(patente);
    res.json({vehiculoName});
  } catch (error) {
    console.error("Error al obtener el nombre del vehículo:", error);
    res.status(500).json({message: "Error al obtener el nombre del vehículo"});
  }
};

export const getVehiculoByPatente = async (req, res) => {
  try {
    const {patente} = req.params;
    const vehiculo = await VehiculoModel.getVehiculoByPatente(patente);
    if (!vehiculo) {
      return res.status(404).json({message: "Vehículo no encontrado"});
    }
    res.json(vehiculo);
  } catch (error) {
    console.error("Error al obtener el vehículo por patente:", error);
    res.status(500).json({message: "Error al obtener el vehículo por patente"});
  }
}