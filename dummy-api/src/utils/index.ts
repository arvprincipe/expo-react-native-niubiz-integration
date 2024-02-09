export function base64Encode(str: any) {
  const jsonString = JSON.stringify(str);
  return btoa(jsonString);
}

export function base64Decode(base64Str: any) {
  const decodedString = atob(base64Str);
  return JSON.parse(decodedString);
}

export function formatDate(dateString: string) {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];

  const formattedDate = `${monthName} ${parseInt(day, 10)}, ${year}`;
  return formattedDate;
}
