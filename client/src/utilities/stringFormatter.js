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

  const hora = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (esHoy) return `Hoy ${hora}`;
  if (esManana) return `Mañana ${hora}`;
  return `${fecha.toLocaleDateString()} ${hora}`;
}