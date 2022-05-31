

import { useContext } from "react";

import { AuthContext, ModalContex} from "../contexts";

const useAuth = () => useContext(AuthContext);

const useModal = () => useContext(ModalContex)

export { useAuth, useModal };