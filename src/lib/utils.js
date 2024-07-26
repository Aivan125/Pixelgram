import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const units = [
    { name: "year", seconds: 60 * 60 * 24 * 365 },
    { name: "month", seconds: 60 * 60 * 24 * 30 },
    { name: "week", seconds: 60 * 60 * 24 * 7 },
    { name: "day", seconds: 60 * 60 * 24 },
    { name: "hour", seconds: 60 * 60 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (let unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.name}${interval !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

/**
 * Calcula la fecha de hoy a las 00:00:00.000 y la devuelve en formato ISO.
 
 */
export function getStartOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString();
}

/**
 * Calcula la fecha de mañana a las 00:00:00.000 (es decir, el final del día de hoy)
 * y la devuelve en formato ISO.
 
 */
export function getEndOfToday() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toISOString();
}

export const getTopSixFollowedUsers = (getUsers) => {
  // Ordenar el array basado en el número de followers (de mayor a menor)
  const sortedUsers = getUsers.sort((a, b) => {
    const followersA = a.friendship?.followers
      ? Object.keys(a.friendship.followers).length
      : 0;
    const followersB = b.friendship?.followers
      ? Object.keys(b.friendship.followers).length
      : 0;
    return followersB - followersA;
  });

  // Tomar los primeros 6 usuarios
  return sortedUsers.slice(0, 6);
};
