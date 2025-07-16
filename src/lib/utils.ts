import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const getDataFromSessionStorage = (key: string) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getUserFromStorage() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}