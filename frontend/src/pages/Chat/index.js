import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import api from '../../services/api';
import socket from '../../services/socket';

import styles from './styles.module.css'
import Message from './message';

const Chat = ({ match }) => {

    const [roomName, setRoomName] = useState('');
    const [username, setUsername] = useState('');
    const [msgList, setMsgList] = useState([]);
    const [inputMsg, setInputMsg] = useState('');
    const chatListContainerRef = useRef(null);
    const inputRef = useRef(null);

    const [cookies, setCookie] = useCookies();

    const history = useHistory();

    useEffect(() => {

        if (!cookies.username || !cookies.avatar) {
            history.push('/somethingWentWrong', { message: 'You must choose your user name first' });
            return function cleanup() { }
        }

        api
            .get(`/chat/${match.params.roomId}`)
            .then(res => {
                if (res.status === 200) {
                    setUsername(cookies.username)
                    setRoomName(res.data.chatRoom.name);
                    setMsgList(res.data.msgList);

                    socket.emit('joinRoom', { username: cookies.username, room: match.params.roomId });

                    inputRef.current.focus();
                } else {
                    history.push('/somethingWentWrong');
                    return function cleanup() { }
                }
            })
            .catch(err => {
                history.push('/somethingWentWrong', { 'message': err });
                return function cleanup() { }
            });

        socket.on('message', message => {
            setMsgList(msgList => [...msgList, message]);
        });

        socket.on('messageJoinLeft', message => {
            message['joinLeftMsg'] = true;
            setMsgList(msgList => [...msgList, message]);
        });
    }, []);

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.minWidth = "350px";
        document.body.style.minHeight = "475px";
        document.body.style.margin = "0";
    }, []);

    useLayoutEffect(() => {
        chatListContainerRef.current.scrollTop = chatListContainerRef.current.scrollHeight;
    }, [msgList]);

    function handleClick(e) {
        e.preventDefault();

        socket.emit('leftRoom', { username: username, room: match.params.roomId });

        history.push('/rooms');
    }

    function handleChange(e) {
        setInputMsg(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (inputMsg) {
            const data = {
                user: username,
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
                <button onClick={handleClick}>Change Room</button>
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