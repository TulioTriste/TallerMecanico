import {createContext, useContext, useEffect, useState} from "react";
import {
  getRutByCorreoRequest,
  isValidEmailRequest,
  loginRequest,
  registerRequest,
  resetPasswordRequest,
  sendResetPasswordRequest,
  verifyTokenRequest
} from "../api/auth";
import Cookies from "js-cookie";
import {loginEmpleadoRequest} from "../api/empleado.js";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        res.data.user = {
          ...res.data.empleado,
          userType: "usuario",
        }
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["No se pudo conectar con el servidor"]);
      }
    }
    setLoading(false);
  };

  const signin = async (user) => {
    try {
      if (user.userType === "empleado") {
        const res = await loginEmpleadoRequest(user);
        if (res.status === 200) {
          res.data.empleado = {
            ...res.data.empleado,
            userType: user.userType,
          }
          setUser(res.data.empleado);
          setIsAuthenticated(true);
        }
      } else if (user.userType === "usuario") {
        const res = await loginRequest(user);
        if (res.status === 200) {
          res.data.user = {
            ...res.data.empleado,
            userType: user.userType, // Aseguramos que roles_id esté definido
          }
          setUser(res.data.user);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["No se pudo conectar con el servidor"]);
      }
    }
    setLoading(false);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  const getRutByCorreo = async (email) => {
    try {
      const res = await getRutByCorreoRequest(email);

      if (res.status === 200) {
        return res.data.usuario_rut;
      } else {
        setErrors([res.data.message || "Error al obtener el RUT."]);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el RUT:", error);
      return null;
    }
  }

  const isValidEmail = async (email) => {
    try {
      const res = await isValidEmailRequest(email);

      return res.status === 200 && res.data.found;
    } catch (error) {
      console.error("Error al validar el correo:", error);
      return false;
    }
  }

  const sentRecoverPasswordEmail = async (data) => {
    try {
      const res = await sendResetPasswordRequest(data);

      if (res.status === 200) {
        return true;
      } else {
        setErrors([res.data.message || "Error al enviar el correo de recuperación."]);
        return false;
      }
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error);
      return false;
    }
  }

  const resetPassword = async (data) => {
    try {
      const res = await resetPasswordRequest(data);

      if (res.status === 200) {
        return true;
      } else {
        setErrors([res.data.message || "Error al restablecer la contraseña."]);
        return false;
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      return false;
    }
  }

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        console.log("checklogin", res.data);
        setUser(res.data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }

      setLoading(false);
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
        getRutByCorreo,
        isValidEmail,
        sentRecoverPasswordEmail,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;