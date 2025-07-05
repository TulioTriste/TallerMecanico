class StringFormatter {
  static formatCitaFecha(fechaStr) {
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

  static formatFechaDDMMYYYYHHMM(fechaStr) {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    const hora = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
  };

  static formatFechaDDMMYYYY(fechaStr) {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  static formatFechaHHMM(fechaStr) {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const hora = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    return `${hora}:${minutos}`;
  }

  static formatNumber(number) {
    return number.toLocaleString('es-CL');
  }

  static formatRut(rut) {
    if (!rut) return "";
    // Elimina puntos y guiones, y filtra caracteres válidos
    let cleaned = rut.replace(/\./g, "").replace(/-/g, "").replace(/[^0-9kK]/g, "");
    if (cleaned.length < 2) return cleaned;

    const body = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1).toUpperCase();

    // Formatea el cuerpo del RUT con puntos cada 3 dígitos
    let formatted = "";
    for (let i = body.length - 1, count = 1; i >= 0; i--, count++) {
      formatted = body[i] + formatted;
      if (count % 3 === 0 && i !== 0) {
        formatted = "." + formatted;
      }
    }

    return `${formatted}-${dv}`;
  }
}

export default StringFormatter;