import tallerModel from "../models/taller.model.js";
import EmpleadoModel from "../models/empleado.model.js";

export const getWorkshops = async (req, res) => {
  try {
    const rut = req.user.rut;

    if (req.user.tipo === 'empleado' || req.user.tipo === 'practicante') {
      const empleado = await EmpleadoModel.getByRut(rut);
      if (!empleado) {
        return res.status(404).json({message: "Empleado no encontrado"});
      }
      const taller = await tallerModel.getTallerById(empleado.taller_id);
      if (!taller) {
        return res.status(404).json({message: "Taller no encontrado"});
      }
      return res.json([taller]);
    }

    const talleres = await tallerModel.getTalleresByRut(rut);

    res.json(talleres);
  } catch (error) {
    console.error("Error al obtener los talleres:", error);
    res.status(500).json({message: "Error al obtener los talleres"});
  }
}

export const getTaller = async (req, res) => {
  try {
    const id = req.params.taller_id;
    const taller = await tallerModel.getTallerById(id);

    if (!taller) {
      return res.status(404).json({message: "Taller no encontrado"});
    }

    res.json(taller);
  } catch (error) {
    console.error("Error al obtener el taller:", error);
    res.status(500).json({message: "Error al obtener el taller"});
  }
}