import clienteModel from "../models/cliente.model.js";
import ClienteModel from "../models/cliente.model.js";

export const getClienteName = async (req, res) => {
  try {
    const {cliente_rut} = req.params;
    const userName = await clienteModel.getNameByRut(cliente_rut);
    res.json({userName});
  } catch (error) {
    console.error("Error al obtener el nombre del usuario:", error);
    res.status(500).json({message: "Error al obtener el nombre del usuario"});
  }
};

export const getClienteByRut = async (req, res) => {
  try {
    const {cliente_rut} = req.params;
    const cliente = await clienteModel.getClienteByRut(cliente_rut);
    if (!cliente) {
      return res.status(404).json({message: "Cliente no encontrado"});
    }
    res.json(cliente);
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    res.status(500).json({message: "Error al obtener el cliente"});
  }
};

export const createCliente = async (req, res) => {
  try {
    const cliente = req.body;
    const result = await clienteModel.createCliente(cliente);
    if (result === 0) {
      return res.status(400).json({message: "Error al crear el cliente"});
    }
    res.status(201).json({message: "Cliente creado exitosamente"});
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    res.status(500).json({message: "Error al crear el cliente"});
  }
}