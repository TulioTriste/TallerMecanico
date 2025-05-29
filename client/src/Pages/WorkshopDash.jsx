import { useState, useEffect } from 'react';
import { 
  Wrench, 
  Car, 
  Users, 
  Calendar, 
  Clipboard, 
  DollarSign,
  ArrowLeft,
  Settings,
  Plus,
  MoreVertical,
  Clock,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle2,
  Timer,
  Zap
} from 'lucide-react';
import { useWorkshop } from '../context/workshopContext';
import { useParams } from 'react-router-dom';

const WorkshopDash = () => {
  const [darkMode, setDarkMode] = useState(false);

  const { id } = useParams();
  const [taller, setTaller] = useState(null);
  const { getTaller } = useWorkshop();

  useEffect(() => {
    const fetchTaller = async () => {  
      const taller = await getTaller(id); // Suponiendo que el ID del taller es 1
      setTaller(taller);
      console.log("Taller obtenido:", taller);
    };
    fetchTaller();
  }, [getTaller, id]);

  // Datos del taller actual (normalmente vendrían de props o estado global)

  // Estadísticas del dashboard
  const estadisticas = {
    vehiculosEnServicio: 8,
    ordenesActivas: 12,
    clientesHoy: 15,
    ingresosDia: 450000,
    ordenesCompletadas: 23,
    tiempoPromedioServicio: "2.5 horas"
  };

  // Órdenes recientes
  const ordenesRecientes = [
    {
      id: "ORD-001",
      cliente: "Juan Pérez",
      vehiculo: "Toyota Corolla 2019",
      servicio: "Cambio de aceite y filtros",
      estado: "en_proceso",
      tecnico: "Carlos Silva",
      horaInicio: "09:30",
      estimado: "11:00"
    },
    {
      id: "ORD-002", 
      cliente: "María González",
      vehiculo: "Honda Civic 2020",
      servicio: "Revisión de frenos",
      estado: "completado",
      tecnico: "Ana López",
      horaInicio: "08:00",
      estimado: "10:30"
    },
    {
      id: "ORD-003",
      cliente: "Pedro Martínez",
      vehiculo: "Nissan Sentra 2018",
      servicio: "Alineación y balanceo",
      estado: "pendiente",
      tecnico: "Luis Rojas",
      horaInicio: "14:00",
      estimado: "15:30"
    }
  ];

  // Citas próximas
  const citasProximas = [
    {
      id: 1,
      cliente: "Roberto Silva",
      vehiculo: "Ford Focus 2021",
      servicio: "Mantención 10.000 km",
      hora: "10:30",
      telefono: "+56 9 8765 4321"
    },
    {
      id: 2,
      cliente: "Carmen Díaz",
      vehiculo: "Chevrolet Sail 2019",
      servicio: "Revisión técnica",
      hora: "11:45",
      telefono: "+56 9 5555 6666"
    },
    {
      id: 3,
      cliente: "Miguel Torres",
      vehiculo: "Hyundai Accent 2020",
      servicio: "Cambio de neumáticos",
      hora: "15:00",
      telefono: "+56 9 7777 8888"
    }
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'completado':
        return darkMode ? 'text-green-400 bg-green-900/30' : 'text-green-700 bg-green-100';
      case 'en_proceso':
        return darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-700 bg-blue-100';
      case 'pendiente':
        return darkMode ? 'text-yellow-400 bg-yellow-900/30' : 'text-yellow-700 bg-yellow-100';
      default:
        return darkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-700 bg-gray-100';
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'completado': return 'Completado';
      case 'en_proceso': return 'En Proceso';
      case 'pendiente': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <ArrowLeft className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900/40' : 'bg-blue-100'}`}>
                  <Wrench className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {taller.nombre}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {taller.direccion}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-500 font-medium">Abierto</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              
              <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-blue-800 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-colors`}>
                <Plus className="w-4 h-4" />
                Nueva Orden
              </button>
              
              <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <Settings className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${darkMode ? 'bg-blue-900/5' : 'bg-blue-100/20'} blur-3xl`}></div>
        <div className={`absolute top-1/2 -left-48 w-96 h-96 rounded-full ${darkMode ? 'bg-indigo-900/5' : 'bg-indigo-100/20'} blur-3xl`}></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vehículos en Servicio</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {estadisticas.vehiculosEnServicio}
                </p>
              </div>
              <Car className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Órdenes Activas</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {estadisticas.ordenesActivas}
                </p>
              </div>
              <Clipboard className={`h-8 w-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Clientes Hoy</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {estadisticas.clientesHoy}
                </p>
              </div>
              <Users className={`h-8 w-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ingresos Hoy</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  ${estadisticas.ingresosDia.toLocaleString()}
                </p>
              </div>
              <DollarSign className={`h-8 w-8 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completadas</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {estadisticas.ordenesCompletadas}
                </p>
              </div>
              <CheckCircle2 className={`h-8 w-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tiempo Promedio</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  {estadisticas.tiempoPromedioServicio}
                </p>
              </div>
              <Timer className={`h-8 w-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            </div>
          </div>
        </div>

        {/* Contenido principal en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Órdenes recientes */}
          <div className="lg:col-span-2">
            <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Órdenes de Trabajo Recientes
                  </h3>
                  <button className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:opacity-80`}>
                    Ver todas
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {ordenesRecientes.map((orden) => (
                    <div key={orden.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(orden.estado)}`}>
                            {getEstadoTexto(orden.estado)}
                          </div>
                          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {orden.id}
                          </span>
                        </div>
                        <button className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600`}>
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cliente</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{orden.cliente}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{orden.vehiculo}</p>
                        </div>
                        
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Servicio</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{orden.servicio}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Técnico: {orden.tecnico}</p>
                        </div>
                        
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Horario</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {orden.horaInicio} - {orden.estimado}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="w-3 h-3 text-blue-500" />
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Est. {orden.estimado}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Citas próximas */}
          <div className="space-y-8">
            {/* Citas de hoy */}
            <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Citas de Hoy
                  </h3>
                  <Calendar className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {citasProximas.map((cita) => (
                    <div key={cita.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {cita.hora}
                        </span>
                        <button className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600`}>
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {cita.cliente}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {cita.vehiculo}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {cita.servicio}
                      </p>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full mt-4 py-2 px-4 rounded-lg border-2 border-dashed ${darkMode ? 'border-gray-600 text-gray-400 hover:border-gray-500' : 'border-gray-300 text-gray-600 hover:border-gray-400'} transition-colors`}>
                  + Agendar nueva cita
                </button>
              </div>
            </div>

            {/* Alertas rápidas */}
            <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Alertas
                  </h3>
                  <AlertCircle className={`h-5 w-5 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                        Orden ORD-001 se está retrasando
                      </span>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                        Nueva cotización pendiente
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDash;