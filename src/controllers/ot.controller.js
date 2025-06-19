import OtModel from "../models/ot.model.js";
import * as path from "node:path";
import multer from "multer";

export const getOt = async (req, res) => {
  const {taller_id, ot_id} = req.params;
  try {
    const ot = await OtModel.getOtById(ot_id);
    if (!ot || ot.taller_id !== parseInt(taller_id)) {
      return res.status(404).json({message: "Orden de trabajo no encontrada"});
    }
    res.json(ot);
  } catch (error) {
    console.error("Error al obtener la orden de trabajo:", error);
    res.status(500).json({message: "Error interno del servidor"});
  }
};

export const addTaskToOt = async (req, res) => {
  const {ot_id} = req.params;
  const {task} = req.body;

  try {
    const result = await OtModel.addTaskToOt(ot_id, task);
    if (result) {
      res.status(200).json({message: "Tarea agregada correctamente"});
    } else {
      res.status(400).json({message: "Error al agregar la tarea"});
    }
  } catch (error) {
    console.error("Error al agregar la tarea a la OT:", error);
    res.status(500).json({message: "Error interno del servidor"});
  }
};

export const getTasksByOtId = async (req, res) => {
  const {ot_id} = req.params;

  try {
    const tasks = await OtModel.getTasksByOtId(ot_id);

    // parse varchar to json format
    tasks.forEach(task => {
      if (task.ruta_imagenes) {
        task.ruta_imagenes = JSON.parse(task.ruta_imagenes);
      }
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas de la OT:", error);
    res.status(500).json({message: "Error interno del servidor"});
  }
};

export const updateOrCreateTasks = async (req, res) => {
  const {ot_id} = req.params;
  const {tasks} = req.body;

  try {
    const result = await OtModel.updateOrCreateTasks(ot_id, tasks);
    if (result) {
      res.status(200).json({message: "Tareas actualizadas correctamente"});
    } else {
      res.status(400).json({message: "Error al actualizar las tareas"});
    }
  } catch (error) {
    console.error("Error al actualizar las tareas de la OT:", error);
    res.status(500).json({message: "Error interno del servidor"});
  }
};

export const uploadImages = async (req, res) => {
  try {
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    res.json({
      success: true,
      urls: imageUrls
    });
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al subir imágenes'
    });
  }
};

export const updateOt = async (req, res) => {
  const {ot_id} = req.params;
  const ot = req.body;

  try {
    const result = await OtModel.updateOt(ot_id, ot);
    if (result) {
      res.status(200).json({message: "Orden de trabajo actualizada correctamente"});
    } else {
      res.status(400).json({message: "Error al actualizar la orden de trabajo"});
    }
  } catch (error) {
    console.error("Error al actualizar la orden de trabajo:", error);
    res.status(500).json({message: "Error interno del servidor"});
  }
}