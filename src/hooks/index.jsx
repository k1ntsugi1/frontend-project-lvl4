

import { useContext } from "react";

import { AuthContext, ModalContex, SocketContex} from "../contexts";

const useAuth = () => useContext(AuthContext);

const useModal = () => useContext(ModalContex);

const useSocket = () => useContext(SocketContex);

export { useAuth, useModal,useSocket };