import { useState, useEffect } from "react";
import {
  Lock,
  ArrowLeft,
  Moon,
  Sun,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import {useSearchParams} from "react-router-dom";
import {resetPasswordSchema} from "../../schemas/authSchema.js";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/authContext.jsx";

export default function RecoverPasswordApprovePage() {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPassword } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode.toString());
    }
  }, [darkMode]);

  useEffect(() => {
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    if (darkMode) {
      document.body.className = "bg-gray-900";
    } else {
      document.body.className = "bg-gradient-to-br from-gray-50 to-gray-100";
    }
  }, []);

  const onSubmit = async (data) => {
    setError("");
    setSuccess(false);

    try {
      setLoading(true);

      data = {
        password: data.newPassword,
        token: token,
        email: email,
      }

      const res = await resetPassword(data);
      if (res) {
        setSuccess(true);
      } else {
        setError("Error al cambiar la contraseña. Por favor, inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error al cambiar la contraseña:", err);
      setError("Error al cambiar la contraseña. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center text-red-600 dark:text-red-400">
            <h1 className="text-2xl font-bold">Error</h1>
            <p>Token no proporcionado. Por favor, verifica el enlace.</p>
          </div>
        </div>
    );
  }

  if (!email) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center text-red-600 dark:text-red-400">
            <h1 className="text-2xl font-bold">Error</h1>
            <p>Correo electrónico no proporcionado. Por favor, verifica el enlace.</p>
          </div>
        </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div className="w-full max-w-md mx-auto">
        {/* Dark mode toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${
              darkMode
                ? "bg-gray-800 text-yellow-300 hover:bg-gray-700"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
            }`}
            aria-label={
              darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
              darkMode ? "bg-blue-900" : "bg-blue-100"
            }`}
          >
            <Lock
              className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
            />
          </div>
          <h2
            className={`text-3xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Cambiar contraseña
          </h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Ingresa tu nueva contraseña para continuar
          </p>
        </div>

        {/* New Password Form */}
        <div
          className={`rounded-xl shadow-md p-6 border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {error && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                darkMode
                  ? "bg-red-900 border border-red-800 text-red-200"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {error}
            </div>
          )}

          {success ? (
            <div
              className={`text-center py-6 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
            >
              <div
                className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
                  darkMode ? "bg-green-900" : "bg-green-100"
                }`}
              >
                <Check
                  className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                ¡Contraseña actualizada!
              </h3>
              <p
                className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Tu contraseña ha sido cambiada exitosamente.
              </p>
              <a
                href="/login"
                className={`inline-flex items-center justify-center w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                }`}
              >
                Ir al inicio de sesión
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                {/* Nueva contraseña */}
                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      {...register("newPassword")}
                      className={`block w-full pr-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 border"
                          : "border border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff
                          className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                        />
                      ) : (
                        <Eye
                          className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirmar contraseña */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      {...register("confirmNewPassword")}
                      className={`block w-full pr-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 border"
                          : "border border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                        />
                      ) : (
                        <Eye
                          className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
                    darkMode
                      ? "bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {loading ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Cambiando...
                    </span>
                  ) : (
                    "Cambiar contraseña"
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <a
              href="/login"
              className={`inline-flex items-center text-sm font-medium ${
                darkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver al inicio de sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
