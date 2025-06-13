export function formatCitaFecha(fechaStr) {
  if (!fechaStr) return "Sin citas";
  const fecha = new Date(fechaStr);
  const hoy = new Date();

  const esHoy =
    fecha.getDate() === hoy.getDate() &&
    fecha.getMonth() === hoy.getMonth() &&
    fecha.getFullYear() === hoy.getFullYear();

  const manana = new Date(hoy);
  manana.setDate(hoy.getDate() + 1);
  const esManana =
    fecha.getDate() === manana.getDate() &&
    fecha.getMonth() === manana.getMonth() &&
    fecha.getFullYear() === manana.getFullYear();

  const hora = fecha.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  if (esHoy) return `Hoy ${hora}`;
  if (esManana) return `Mañana ${hora}`;
  return `${fecha.toLocaleDateString()} ${hora}`;
};

export function formatFechaDDMMYYYYHHMM(fechaStr) {
  if (!fechaStr) return "";
  const fecha = new Date(fechaStr);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  const hora = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
};

export function formatFechaDDMMYYYY(fechaStr) {
  if (!fechaStr) return "";
  const fecha = new Date(fechaStr);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

export function formatFechaHHMM(fechaStr) {
  if (!fechaStr) return "";
  const fecha = new Date(fechaStr);
  const hora = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  return `${hora}:${minutos}`;
}