import {useEffect, useState} from "react";
import {useDarkMode} from "../../context/darkModeContext.jsx";
import {useParams} from "react-router-dom";
import {useWorkshop} from "../../context/workshopContext.jsx";
import {Calendar, CarFront, DollarSign, FileText, Users} from "lucide-react";

export default function WorkOrderForm() {
  const {darkMode} = useDarkMode();
  const {id} = useParams();
  const {getTaller} = useWorkshop();
  const [taller, setTaller] = useState(null);

  // Lista hardcodeada de técnicos (después se reemplazará con datos reales)
  const tecnicos = [
    {id: 1, nombre: "Juan Pérez"},
    {id: 2, nombre: "Ana García"},
    {id: 3, nombre: "Carlos Rodríguez"},
    {id: 4, nombre: "María López"},
  ];

  const [formData, setFormData] = useState({
    cliente_rut: "",
    vehiculo_patente: "",
    tecnico: "",
    fecha_salida: "",
    descripcion: "",
    km_actual: "",
    precio: "",
  });

  const [searchTecnico, setSearchTecnico] = useState("");
  const [showTecnicos, setShowTecnicos] = useState(false);

  useEffect(() => {
    const loadTaller = async () => {
      try {
        const tallerData = await getTaller(id);
        setTaller(tallerData);
      } catch (error) {
        console.error("Error al cargar el taller:", error);
      }
    };
    loadTaller();
  }, [id]);

  const filteredTecnicos = tecnicos.filter((tecnico) =>
    tecnico.nombre.toLowerCase().includes(searchTecnico.toLowerCase()),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear objeto con todos los datos necesarios
    const ordenTrabajo = {
      ...formData,
      taller_id: id,
      fecha_entrada: new Date().toISOString(),
      estado_id: 1, // 1 = pendiente
      created_at: new Date().toISOString(),
    };

    try {
      // Aquí irá la lógica para enviar los datos
      console.log("Datos de la orden:", ordenTrabajo);
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Nueva Orden de Trabajo</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`p-6 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-sm`}
          >
            {/* Datos del Cliente */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Datos del Cliente</h2>

              {/* RUT Cliente */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  RUT Cliente
                </label>
                <input
                  type="text"
                  value={formData.cliente_rut}
                  onChange={(e) =>
                    setFormData({...formData, cliente_rut: e.target.value})
                  }
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-300"
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Ingrese RUT del cliente"
                />
              </div>

              {/* Patente Vehículo */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Patente Vehículo
                </label>
                <div className="relative">
                  <CarFront className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                  <input
                    type="text"
                    value={formData.vehiculo_patente}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vehiculo_patente: e.target.value,
                      })
                    }
                    className={`w-full pl-10 px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50 border-gray-300"
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Ingrese patente del vehículo"
                  />
                </div>
              </div>

              {/* Kilometraje */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kilometraje Actual
                </label>
                <input
                  type="number"
                  value={formData.km_actual}
                  onChange={(e) =>
                    setFormData({...formData, km_actual: e.target.value})
                  }
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-300"
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Ingrese kilometraje actual"
                />
              </div>
            </div>

            {/* Datos del Servicio */}
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Datos del Servicio</h2>

              {/* Técnico */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2">
                  Técnico Asignado
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                  <input
                    type="text"
                    value={searchTecnico}
                    onChange={(e) => {
                      setSearchTecnico(e.target.value);
                      setShowTecnicos(true);
                    }}
                    onClick={() => setShowTecnicos(true)}
                    className={`w-full pl-10 px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50 border-gray-300"
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Buscar técnico..."
                  />
                </div>

                {showTecnicos && (
                  <div
                    className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg ${
                      darkMode ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    {filteredTecnicos.map((tecnico) => (
                      <div
                        key={tecnico.id}
                        className={`px-4 py-2 cursor-pointer ${
                          darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setFormData({...formData, tecnico: tecnico.nombre});
                          setSearchTecnico(tecnico.nombre);
                          setShowTecnicos(false);
                        }}
                      >
                        {tecnico.nombre}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fecha Estimada de Salida */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Fecha Estimada de Salida
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                  <input
                    type="date"
                    value={formData.fecha_salida}
                    onChange={(e) =>
                      setFormData({...formData, fecha_salida: e.target.value})
                    }
                    className={`w-full pl-10 px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50 border-gray-300"
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Descripción del Servicio
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400"/>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) =>
                      setFormData({...formData, descripcion: e.target.value})
                    }
                    className={`w-full pl-10 px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50 border-gray-300"
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    rows="4"
                    placeholder="Descripción detallada del servicio a realizar"
                  />
                </div>
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm font-medium mb-2">Precio</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                  <input
                    type="number"
                    value={formData.precio}
                    onChange={(e) =>
                      setFormData({...formData, precio: e.target.value})
                    }
                    className={`w-full pl-10 px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50 border-gray-300"
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Ingrese el precio"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botón Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium transition-colors`}
            >
              Crear Orden de Trabajo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
