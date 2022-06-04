

import { useContext } from "react";

import { AuthContext, ModalContext, SocketContext, BadWordsContext} from "../contexts";

const useAuth = () => useContext(AuthContext);

const useModal = () => useContext(ModalContext);

const useSocket = () => useContext(SocketContext);

const useBadWords = () => useContext(BadWordsContext)

export { useAuth, useModal, useSocket, useBadWords };