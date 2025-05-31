import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Plus,
  Home
} from 'lucide-react';
import { useWorkshop } from '../context/workshopContext';
import { useDarkMode } from '../context/darkModeContext';

const Workshops = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [selectedTaller, setSelectedTaller] = useState(null);

  const { workshops, cargarTalleres } = useWorkshop(); // Datos de ejemplo de los talleres

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTalleres = async () => {
      await cargarTalleres();
    }
    fetchTalleres();
  }, [cargarTalleres]);

  const handleTallerSelect = (taller) => {
    setSelectedTaller(taller.id);
    // Aquí se podría navegar al dashboard del taller
    console.log(`Seleccionado: ${taller.nombre}`);
  };

  const getDisponibilidad = (taller) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Convierte inicio_jornada y termino_jornada a minutos
    const inicio = taller.inicio_jornada;
    const termino = taller.termino_jornada;

    const inicioHoras = Math.floor(inicio / 100);
    const inicioMinutos = inicio % 100;
    const inicioTotal = inicioHoras * 60 + inicioMinutos;

    const terminoHoras = Math.floor(termino / 100);
    const terminoMinutos = termino % 100;
    const terminoTotal = terminoHoras * 60 + terminoMinutos;

    return currentMinutes >= inicioTotal && currentMinutes <= terminoTotal;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900/40' : 'bg-blue-100'}`}>
                <Wrench className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  MechaniTech
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Seleccione un taller para continuar
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => toggleDarkMode()}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              
              <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-blue-800 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-colors`}>
                <Plus className="w-4 h-4" />
                Nuevo Taller
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${darkMode ? 'bg-blue-900/10' : 'bg-blue-100/30'} blur-3xl`}></div>
        <div className={`absolute top-1/2 -left-48 w-96 h-96 rounded-full ${darkMode ? 'bg-indigo-900/10' : 'bg-indigo-100/30'} blur-3xl`}></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Título y descripción */}
        <div className="text-center mb-12">
          <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
            Sus Talleres
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Gestione sus <span className="text-blue-600">Talleres Mecánicos</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Seleccione el taller al que desea acceder para gestionar órdenes, clientes y vehículos
          </p>
        </div>

        {/* Grid de talleres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((taller) => (
            <div
              key={taller.taller_id}
              onClick={() => handleTallerSelect(taller)}
              className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedTaller === taller.taller_id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                darkMode ? 'bg-gray-800 shadow-blue-900/20' : 'bg-white shadow-gray-200/80'
              }`}>
                {/* Header de la tarjeta */}
                <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-900/40' : 'bg-blue-100'}`}>
                        <Home className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {taller.nombre}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            getDisponibilidad(taller) ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className={`text-sm font-medium ${
                            getDisponibilidad(taller) 
                              ? 'text-green-500' 
                              : 'text-red-500'
                          }`}>
                            {getDisponibilidad(taller) ? 'Abierto' : 'Cerrado'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {taller.direccion}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Próxima cita: {taller.proximaCita}00:00
                    </span>
                  </div>
                </div>

                {/* Estadísticas rápidas */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {taller.vehiculosEnServicio}
                          0
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Vehículos en servicio
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                          {taller.ordenesActivas}
                          0
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Órdenes activas
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de acción */}
                <div className="px-6 pb-6">
                <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                        getDisponibilidad(taller)
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => {
                        if (getDisponibilidad(taller)) {
                          navigate('/workshop/dashboard'); // Redirige al dashboard
                        } else {
                          // Opcional: acción alternativa si el taller no está activo
                          console.log('El taller no está activo');
                        }
                    }}
                    >
                    {getDisponibilidad(taller) ? 'Acceder al Dashboard' : 'Ver Información'}
                    </button>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Mensaje si no hay talleres */}
        {workshops.length === 0 && (
          <div className="text-center py-16">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Wrench className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No hay talleres registrados
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Agregue su primer taller para comenzar a gestionar su negocio
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Crear Primer Taller
            </button>
          </div>
        )}
      </div>

      {/* Footer simplificado */}
      <footer className={`mt-16 py-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 MechaniTech. Sistema de gestión para talleres mecánicos.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Workshops;