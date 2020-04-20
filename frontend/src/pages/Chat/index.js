import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import styles from './styles.module.css'
import Message from './message';

const Chat = ({ match }) => {

    const [roomName, setRoomName] = useState('');
    const [msgList, setMsgList] = useState([]);

    const history = useHistory();

    useEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.minWidth = "350px";
        document.body.style.minHeight = "475px";

        api
            .get(`/chat/${match.params.roomId}`)
            .then(res => {
                console.log('chat response');
                console.log(res);

                setRoomName(res.data.chatRoom.name);
                setMsgList(res.data.msgList)
            });

    }, []);

    // TODO emit socket.io leave room
    function handleClick(e) {
        e.preventDefault();

        history.push('/rooms');
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
                <div className={styles.chat_list_container}>
                    {msgList.map(msg => (
                        <Message
                            key={msg._id}
                            user={msg.user}
                            msg={msg.message}
                            date={msg.date}
                        ></Message>
                    ))}
                </div>
                <div className={styles.input_msg_container}>
                    <form action="#" id="chat-form" className={styles.chat_form}>
                        <input type="text" name={styles.msg} id="msg" placeholder="Write your message..." autoComplete="off" />
                        <button>Send</button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Chat;