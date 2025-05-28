import tallerModel from "../models/taller.model.js";

export const getWorkshop = async (req, res) => {
  try {
    const rut = req.user.rut;
    const talleres = await tallerModel.getTalleresByRut(rut);
    console.log("rut del usuario:", rut);
    console.log("Talleres obtenidosback:", talleres);
    res.json(talleres);
  } catch (error) {
    console.error("Error al obtener los talleres:", error);
    res.status(500).json({ message: "Error al obtener los talleres" });
  }
}