import { io } from "socket.io-client";

const socket = io("https://backend-projectyd-production.up.railway.app"); // backend URL

export default socket;
