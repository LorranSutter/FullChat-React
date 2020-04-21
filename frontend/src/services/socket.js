import socketIOClient from 'socket.io-client';

import { baseURL } from './baseURL.json';

const socket = socketIOClient(baseURL);

export default socket;

export function socketUserConnected(username) {
    socket.emit('connected', { username });
}

export function socketUserDisconnected(username) {
    socket.emit('disconnected', { username });
}

export function socketUserJoinRoom(username, room) {
    socket.emit('joinRoom', { username, room });
}

export function socketUserLeftRoom(username, room) {
    socket.emit('leftRoom', { username, room });
}

export function socketUserMsg(data) {
    socket.emit('chatMessage', data);
}