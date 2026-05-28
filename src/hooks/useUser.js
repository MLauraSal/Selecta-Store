import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";

export const useUser = () => {
  return useContext(UsersContext);
};

export default useUser;