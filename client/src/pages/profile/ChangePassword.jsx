import {useState} from "react";
import {Eye, EyeOff, Lock} from "lucide-react";
import {useDarkMode} from "../../context/darkModeContext.jsx";
import {useAuth} from "../../context/authContext.jsx";
import {useNavigate} from "react-router-dom";
import {Message} from "../../Components/ui/Message.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {resetPasswordSchema} from "../../schemas/authSchema.js";

export default function ChangePassword() {
  const {errors: authErrors, isPasswordCorrect, updatePassword} = useAuth();
  const navigate = useNavigate();
  const {darkMode} = useDarkMode();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const {
    register,
    handleSubmit ,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (e) => {
    try {
      const currentPassRes = await isPasswordCorrect(currentPassword);
      if (!currentPassRes) {
        console.error("Contraseña actual incorrecta");
        return;
      }
      console.log(e);
      if (e.newPassword !== e.confirmNewPassword) {
        console.error("Las contraseñas nuevas no coinciden");
        return;
      }

      const updateRes = await updatePassword(e.newPassword);
      if (updateRes) {
        console.log("Contraseña actualizada correctamente");
        setCurrentPassword("");

        navigate("/profile");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Cambiar Contraseña</h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Actualiza tu contraseña de acceso
          </p>
        </div>

        {/* Formulario */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-lg p-6`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {authErrors?.length > 0 &&
              authErrors.map((error, i) => (
                <Message message={error} key={i} />
              ))}
            {/* Contraseña Actual */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Contraseña Actual
              </label>
              <div
                className={`flex rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center pl-4">
                  <Lock
                    className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type={showPassword.current ? "text" : "password"}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Ingresa tu contraseña actual"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="px-4"
                >
                  {showPassword.current ? (
                    <EyeOff
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  ) : (
                    <Eye
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Nueva Contraseña */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Nueva Contraseña
              </label>
              <div
                className={`flex rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center pl-4">
                  <Lock
                    className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type={showPassword.new ? "text" : "password"}
                  required
                  {...register("newPassword", { required: true})}
                  className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Ingresa tu nueva contraseña"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="px-4"
                >
                  {showPassword.new ? (
                    <EyeOff
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  ) : (
                    <Eye
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  )}
                </button>
              </div>
              <p>{errors.newPassword?.message}</p>
            </div>

            {/* Confirmar Nueva Contraseña */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirmar Nueva Contraseña
              </label>
              <div
                className={`flex rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center pl-4">
                  <Lock
                    className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  required
                  {...register("confirmNewPassword")}
                  className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Confirma tu nueva contraseña"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="px-4"
                >
                  {showPassword.confirm ? (
                    <EyeOff
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  ) : (
                    <Eye
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  )}
                </button>
              </div>
              <p>{errors.confirmNewPassword?.message}</p>
            </div>

            {/* Botón de Submit */}
            <div>
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Actualizar Contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
