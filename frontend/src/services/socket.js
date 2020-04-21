import socketIOClient from 'socket.io-client';

import { baseURL } from './baseURL.json';

const socket = socketIOClient(baseURL);

export default socket;