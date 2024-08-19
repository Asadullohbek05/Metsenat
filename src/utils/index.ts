import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import { AuthContextProps } from "../context/AuthContext";

const formatNumberWithSpaces = (num: number | undefined | null): string => {
  if (num === undefined || num === null) {
    return "";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const formatSum = (sum: string | number): string => {
  const sumStr = typeof sum === "number" ? sum.toString() : sum;
  const num = parseFloat(sumStr.replace(/,/g, ""));
  return isNaN(num) ? sumStr : formatNumberWithSpaces(num);
};

export const logOut = (
  navigate: NavigateFunction,
  setIsAuthenticated: AuthContextProps["setIsAuthenticated"]
) => {
  localStorage.removeItem("token");
  navigate("/");
  setIsAuthenticated(false);
  toast.info("Logged Out Successfully");
};

export { formatNumberWithSpaces, formatSum };
