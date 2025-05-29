import { useState, useEffect } from 'react';
import { 
  Car, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Calendar, 
  DollarSign, 
  Plus,
  Moon, 
  Sun,
  Wrench
} from 'lucide-react';

export default function WorkOrderForm() {
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage?.getItem('darkMode');
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [formData, setFormData] = useState({
    vehiculo: '',
    placa: '',
    modelo: '',
    año: '',
    kilometraje: '',
    cliente: '',
    telefono: '',
    email: '',
    fechaIngreso: '',
    descripcionProblema: '',
    observaciones: '',
    costoEstimado: ''
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900');
    }
  }, [darkMode]);

  useEffect(() => {
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    if (darkMode) {
      document.body.className = 'bg-gray-900';
    } else {
      document.body.className = 'bg-gradient-to-br from-gray-50 to-gray-100';
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Aquí iría la lógica para enviar los datos al backend
      console.log('Datos del formulario:', formData);
      
      // Simular un delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mostrar mensaje de éxito o redirigir
      alert('Orden de trabajo creada exitosamente');
      
      // Limpiar formulario
      setFormData({
        vehiculo: '',
        placa: '',
        modelo: '',
        año: '',
        kilometraje: '',
        cliente: '',
        telefono: '',
        email: '',
        fechaIngreso: '',
        descripcionProblema: '',
        observaciones: '',
        costoEstimado: ''
      });
      
    } catch (error) {
      console.error('Error al crear la orden de trabajo:', error);
      alert('Error al crear la orden de trabajo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Header con toggle de modo oscuro */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
              darkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <Wrench className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Nueva Orden de Trabajo
            </h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Registra los detalles del vehículo y el servicio requerido
            </p>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${
              darkMode
                ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Formulario */}
        <div className={`rounded-xl shadow-md p-8 border ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="space-y-8">
            {/* Información del Vehículo */}
            <div>
              <h2 className={`text-xl font-semibold mb-4 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Car className="w-6 h-6 mr-2" />
                Información del Vehículo
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Vehículo/Marca
                  </label>
                  <input
                    type="text"
                    name="vehiculo"
                    value={formData.vehiculo}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                    }`}
                    placeholder="ej. Toyota Corolla"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Placa
                  </label>
                  <input
                    type="text"
                    name="placa"
                    value={formData.placa}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                    }`}
                    placeholder="ABC-123"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Modelo
                  </label>
                  <input
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                    }`}
                    placeholder="ej. XLi"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Año
                  </label>
                  <input
                    type="number"
                    name="año"
                    value={formData.año}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                    }`}
                    placeholder="2020"
                    min="1900"
                    max="2025"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Kilometraje
                  </label>
                  <input
                    type="number"
                    name="kilometraje"
                    value={formData.kilometraje}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                    }`}
                    placeholder="150000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Información del Cliente */}
            <div>
              <h2 className={`text-xl font-semibold mb-4 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <User className="w-6 h-6 mr-2" />
                Información del Cliente
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Nombre del Cliente
                  </label>
                  <input
                    type="text"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                    }`}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Teléfono
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                          : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                      }`}
                      placeholder="+56 9 1234 5678"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                          : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                      }`}
                      placeholder="cliente@email.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles del Servicio */}
            <div>
              <h2 className={`text-xl font-semibold mb-4 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <FileText className="w-6 h-6 mr-2" />
                Detalles del Servicio
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Fecha de Ingreso
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="date"
                      name="fechaIngreso"
                      value={formData.fechaIngreso}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                          : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Costo Estimado
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="number"
                      name="costoEstimado"
                      value={formData.costoEstimado}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                          : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                      }`}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Descripción del Problema
                  </label>
                  <textarea
                    name="descripcionProblema"
                    value={formData.descripcionProblema}
                    onChange={handleInputChange}
                    rows={4}
                    className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                    }`}
                    placeholder="Describe el problema o servicio requerido..."
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Observaciones Adicionales
                  </label>
                  <textarea
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleInputChange}
                    rows={3}
                    className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 border'
                        : 'border-gray-300 text-gray-900 placeholder-gray-500 border'
                    }`}
                    placeholder="Observaciones adicionales, historial previo, etc."
                  />
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
                  darkMode
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando orden...
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Crear Orden de Trabajo
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}