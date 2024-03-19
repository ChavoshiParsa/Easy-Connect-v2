import { io } from 'socket.io-client';

const URL = 'https://easy-connect-v2-server.onrender.com';

export const socket = io(URL, {
  autoConnect: false,
});
