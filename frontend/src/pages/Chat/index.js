import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import socket from '../../services/socket';

import styles from './styles.module.css'
import Message from './message';

const Chat = ({ match }) => {

    const [initialized, setInitialized] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [msgList, setMsgList] = useState([]);
    const [inputMsg, setInputMsg] = useState('');
    const chatListContainerRef = useRef(null);
    const inputRef = useRef(null);

    const history = useHistory();

    useEffect(() => {
        if (!initialized) {
            document.body.style.backgroundColor = "#e5e5e5";
            document.body.style.minWidth = "350px";
            document.body.style.minHeight = "475px";

            api
                .get(`/chat/${match.params.roomId}`)
                .then(res => {
                    setRoomName(res.data.chatRoom.name);
                    setMsgList(res.data.msgList);

                    // TODO emit socket.io join room username
                    socket.emit('joinRoom', { username: 'UsernameTestChat', room: match.params.roomId});

                    inputRef.current.focus();
                    chatListContainerRef.current.scrollTop = chatListContainerRef.current.scrollHeight;
                });

            setInitialized(true);
        }

        socket.on('message', message => {
            setMsgList([...msgList, message]);
            // FIXME TypeError: Cannot read property 'scrollHeight' of null
            // chatListContainerRef.current.scrollTop = chatListContainerRef.current.scrollHeight;
        });

        socket.on('messageJoinLeft', message => {
            message['joinLeftMsg'] = true;
            setMsgList([...msgList, message]);
            // FIXME TypeError: Cannot read property 'scrollHeight' of null
            // chatListContainerRef.current.scrollTop = chatListContainerRef.current.scrollHeight;
        });

    });

    // TODO emit socket.io left room username
    function handleClick(e) {
        e.preventDefault();

        socket.emit('leftRoom', { username: 'UserLeftChat', room: match.params.roomId });

        history.push('/rooms');
    }

    function handleChange(e) {
        setInputMsg(e.target.value);
    }

    // TODO emit socket.io submit msg username
    function handleSubmit(e) {
        e.preventDefault();

        if (inputMsg) {
            const data = {
                user: 'UserChatMsg',
                room: match.params.roomId,
                message: inputMsg,
                date: new Date()
            }

            socket.emit('chatMessage', data);

            setInputMsg('');
            inputRef.current.focus();
        }
    }

    return (
        <>
            <header className={styles.header_container}>
                <h2>{roomName}</h2>
                <a onClick={handleClick}>
                    <button>Change Room</button>
                </a>
            </header>
            <main className={styles.chat_container}>
                <div ref={chatListContainerRef} className={styles.chat_list_container}>
                    {msgList.map((msg, key) => (
                        <Message
                            key={msg._id || key}
                            user={msg.user}
                            msg={msg.message}
                            date={msg.date}
                            joinLeftMsg={msg.joinLeftMsg} >
                        </Message>
                    ))}
                </div>
                <div className={styles.input_msg_container}>
                    <form id="chat-form" className={styles.chat_form} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name={styles.msg}
                            id="msg"
                            placeholder="Write your message..."
                            autoComplete="off"
                            ref={inputRef}
                            value={inputMsg}
                            onChange={handleChange} />
                        <button>Send</button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Chat;