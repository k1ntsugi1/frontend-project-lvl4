

import { useContext } from "react";

import { AuthContext, SocketContext, BadWordsContext} from "../contexts";

const useAuth = () => useContext(AuthContext);

const useSocket = () => useContext(SocketContext);

const useBadWords = () => useContext(BadWordsContext)

export { useAuth, useSocket, useBadWords };