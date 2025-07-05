import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import { Wrench } from "lucide-react";

export default function NoPlanWorkshops() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center pt-24 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="text-center">
        <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <Wrench className={`w-12 h-12 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>No tienes un plan activo</h3>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>Contrata un plan para poder crear y gestionar tus talleres mecánicos.</p>
        <button
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors"
          onClick={() => navigate("/plans")}
        >
          Ver planes y contratar
        </button>
      </div>
    </div>
  );
}
