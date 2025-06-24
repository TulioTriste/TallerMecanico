export const sendUpdateWhatsapp = (number, message) => {
  const messageEncoded = encodeURIComponent(message);

  window.open(`https://wa.me/${number}?text=${messageEncoded}`, "_blank");
};