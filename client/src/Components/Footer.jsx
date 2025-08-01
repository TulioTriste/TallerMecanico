import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useDarkMode } from "../context/darkModeContext";
import logoTaller from "../assets/logo-taller-modif.png";
import mercadoPagoLogo from "../Components/Icons/MP_RGB_HANDSHAKE_pluma_horizontal.png";

export default function Footer() {
  const { darkMode } = useDarkMode();

  return (
    <footer
      className={`shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-600"
      } py-8`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y Redes Sociales */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={logoTaller}
              alt="TallerConectados"
              className="h-16 w-auto mb-4"
            />
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/tallermec"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com/tallermec"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Contacto</h5>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:contacto@tallermec.cl"
                  className="hover:text-blue-500 transition-colors"
                >
                  contacto@tallermec.cl
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a
                  href="tel:+56912345678"
                  className="hover:text-blue-500 transition-colors"
                >
                  +569 1234 5678
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Av. Principal 1234, Santiago</span>
              </li>
            </ul>
          </div>

          {/* Enlaces Útiles */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Enlaces Útiles</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/servicios"
                  className="hover:text-blue-500 transition-colors"
                >
                  Nuestros Servicios
                </a>
              </li>
              <li>
                <a
                  href="/citas"
                  className="hover:text-blue-500 transition-colors"
                >
                  Agendar Cita
                </a>
              </li>
              <li>
                <a
                  href="/terminos"
                  className="hover:text-blue-500 transition-colors"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="/privacidad"
                  className="hover:text-blue-500 transition-colors"
                >
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Medios de Pago */}
          <div className="flex flex-col items-start md:items-start p-0 m-0">
            <h5 className="font-semibold text-lg mb-4">Medios de Pago</h5>
            <div className="flex flex-col items-start justify-start h-full min-h-[64px] w-full p-0 m-0">
              <img
                src={mercadoPagoLogo}
                alt="Mercado Pago"
                className="h-20 w-auto object-contain p-0 m-0"
                style={{ maxWidth: "220px" }}
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`mt-8 pt-8 ${
            darkMode ? "border-t border-gray-700" : "border-t border-gray-200"
          } text-center`}
        >
          <p>
            &copy; {new Date().getFullYear()} TallerConectados. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
