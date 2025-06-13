import {Link} from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ir al inicio
        </Link>

        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-4">¡Ups! Página no encontrada</p>
        <p className="mt-2">La página que buscas no existe</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}
