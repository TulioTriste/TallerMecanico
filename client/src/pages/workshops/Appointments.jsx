// src/pages/workshops/Appointments.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Search, Filter } from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext";
import { useControlPanel } from "../../context/controlPanelContext";
import StringFormatter from "../../utilities/stringFormatter";

export default function Appointments() {
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const { getCitas } = useControlPanel(); // Asumiendo que tienes esta función en tu contexto
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  // Cargar las citas
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const citas = await getCitas(id);
        setAppointments(citas);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las citas:", error);
        setLoading(false);
      }
    };

    loadAppointments();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Cargando citas...</h1>
          <p className="text-gray-500">
            Por favor, espera mientras se cargan los datos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-24 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Citas</h1>

          {/* Controles */}
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por RUT o patente..."
                className={`pl-10 pr-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tabla de citas */}
        <div
          className={`rounded-lg shadow overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  RUT Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Patente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Fecha Creación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {appointments.map((cita) => (
                <tr
                  key={cita.id}
                  className={darkMode ? "bg-gray-800" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {cita.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {cita.cliente_rut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {cita.patente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {StringFormatter.formatFechaDDMMYYYY(cita.hora)}
                  </td>
                  <td className="px-6 py-4 text-sm">{cita.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {StringFormatter.formatFechaDDMMYYYY(cita.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className={`px-3 py-1 rounded-lg ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                      }`}
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Total de citas: {appointments.length}
        </div>
      </div>
    </div>
  );
}
