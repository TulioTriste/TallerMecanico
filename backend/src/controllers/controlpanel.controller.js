import ControlPanelModel from "../models/controlpanel.model.js";

export const getCountRegisteredVehicles = async (req, res) => {
  try {
    const count = await ControlPanelModel.getCountRegisteredVehicles();
    res.json({count});
  } catch (error) {
    console.error("Error al obtener el conteo de vehículos registrados:", error);
    res.status(500).json({message: "Error al obtener el conteo de vehículos registrados"});
  }
};

export const getNextCita = async (req, res) => {
  try {
    const taller_id = req.params.taller_id;
    if (!taller_id) {
      return res.status(400).json({message: "El ID del taller es requerido"});
    }

    const nextCita = await ControlPanelModel.getNextCita(taller_id);
    if (!nextCita) {
      return res.json({nextCita: null});
    }

    res.json({nextCita});
  } catch (error) {
    console.error("Error al obtener la próxima cita:", error);
    res.status(500).json({message: "Error al obtener la próxima cita"});
  }
};

export const getOrdenesDeTrabajoCount = async (req, res) => {
  try {
    const taller_id = req.params.taller_id;
    if (!taller_id) {
      return res.status(400).json({message: "El ID del taller es requerido"});
    }

    const count = await ControlPanelModel.getOrdenesDeTrabajoCount(taller_id);
    res.json({count});
  } catch (error) {
    console.error("Error al obtener el conteo de órdenes de trabajo:", error);
    res.status(500).json({message: "Error al obtener el conteo de órdenes de trabajo"});
  }
};

export const getOrdenesActivasCount = async (req, res) => {
  try {
    const count = await ControlPanelModel.getCountOrdenesActivas();
    res.json({count});
  } catch (error) {
    console.error("Error al obtener el conteo de órdenes activas:", error);
    res.status(500).json({message: "Error al obtener el conteo de órdenes activas"});
  }
}

export const getClientesCount = async (req, res) => {
  try {
    const count = await ControlPanelModel.getCountClientes();
    res.json({count});
  } catch (error) {
    console.error("Error al obtener el conteo de clientes:", error);
    res.status(500).json({message: "Error al obtener el conteo de clientes"});
  }
}

export const getCitasHoyTotalCount = async (req, res) => {
  try {
    const count = await ControlPanelModel.getCountCitasTotalHoy();
    res.json({count});
  } catch (error) {
    console.error("Error al obtener el conteo de citas de hoy:", error);
    res.status(500).json({message: "Error al obtener el conteo de citas de hoy"});
  }
}

export const getOrdenesDeTrabajoCountByEstado = async (req, res) => {
  try {
    const {taller_id, estado_id} = req.params;
    if (!taller_id || !estado_id) {
      return res.status(400).json({message: "El ID del taller y el estado son requeridos"});
    }

    const count = await ControlPanelModel.getOrdenesDeTrabajoCountByEstado(taller_id, estado_id);
    res.json({count});
  } catch (error) {
    console.error("Error al obtener el conteo de órdenes de trabajo por estado:", error);
    res.status(500).json({message: "Error al obtener el conteo de órdenes de trabajo por estado"});
  }
};

export const getCountCitasProx7Dias = async (req, res) => {
  try {
    const {taller_id} = req.params;
    if (!taller_id) {
      return res.status(400).json({message: "El ID del taller es requerido"});
    }

    const count = await ControlPanelModel.getCountCitasProx7Dias(taller_id);
    res.json({count});
  } catch (error) {
    console.error("Error al obtener el conteo de citas próximas a 7 días:", error);
    res.status(500).json({message: "Error al obtener el conteo de citas próximas a 7 días"});
  }
};

export const getCountOTMes = async (req, res) => {
  try {
    const {taller_id} = req.params;
    if (!taller_id) {
      return res.status(400).json({message: "El ID del taller es requerido"});
    }

    const count = await ControlPanelModel.getCountOTMes(taller_id);
    res.json({count});
  } catch (error) {
    console.error("Error al obtener el conteo de órdenes de trabajo del mes:", error);
    res.status(500).json({message: "Error al obtener el conteo de órdenes de trabajo del mes"});
  }
};

export const getRecentOTs = async (req, res) => {
  try {
    const {taller_id, days} = req.params;
    if (!taller_id) {
      return res.status(400).json({message: "El ID del taller es requerido"});
    }

    if (!days || isNaN(days)) {
      return res.status(400).json({message: "El número de días es requerido y debe ser un número"});
    }

    const recentOTs = await ControlPanelModel.getRecentOTs(taller_id, days);
    res.json(recentOTs);
  } catch (error) {
    console.error("Error al obtener las órdenes de trabajo recientes:", error);
    res.status(500).json({message: "Error al obtener las órdenes de trabajo recientes"});
  }
};

export const getCitasHoy = async (req, res) => {
  try {
    const {taller_id} = req.params;
    if (!taller_id) {
      return res.status(400).json({message: "El ID del taller es requerido"});
    }

    const citasHoy = await ControlPanelModel.getCitasHoy(taller_id);
    res.json(citasHoy);
  } catch (error) {
    console.error("Error al obtener las citas de hoy:", error);
    res.status(500).json({message: "Error al obtener las citas de hoy"});
  }
};

export const getIngresosDelMes = async (req, res) => {
  try {
    const {taller_id} = req.params;
    if (!taller_id) {
      return res.status(400).json({message: "El ID del taller es requerido"});
    }

    const ingresos = await ControlPanelModel.getIngresosDelMes(taller_id);
    res.json({ingresos});
  } catch (error) {
    console.error("Error al obtener los ingresos del mes:", error);
    res.status(500).json({message: "Error al obtener los ingresos del mes"});
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await ControlPanelModel.getRoles();
    res.json(roles);
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    res.status(500).json({message: "Error al obtener los roles"});
  }
};

export const getEstados = async (req, res) => {
  try {
    const estados = await ControlPanelModel.getEstados();
    res.json(estados);
  } catch (error) {
    console.error("Error al obtener los estados:", error);
    res.status(500).json({message: "Error al obtener los estados"});
  }
};

export const addCita = async (req, res) => {
  try {
    const {taller_id} = req.params;
    const citaData = req.body;
    if (!citaData) {
      return res.status(400).json({message: "Los datos de la cita son requeridos"});
    }

    const newCita = await ControlPanelModel.addCita(taller_id, citaData);
    res.status(201).json(newCita);
  } catch (error) {
    console.error("Error al agregar la cita:", error);
    res.status(500).json({message: "Error al agregar la cita"});
  }
};

export const getCitasByTaller = async (req, res) => {
  try {
    const {taller_id} = req.params;
    if (!taller_id) {
      return res.status(400).json({message: "El ID del taller es requerido"});
    }

    const citas = await ControlPanelModel.getCitasByTaller(taller_id);
    res.json(citas);
  } catch (error) {
    console.error("Error al obtener las citas por taller:", error);
    res.status(500).json({message: "Error al obtener las citas por taller"});
  }
}