import React, { useEffect } from 'react';

import styles from './styles.module.css'
import Message from './message';

const Chat = () => {

    useEffect(() => {
        document.body.style.minWidth = "350px";
        document.body.style.minHeight = "475px";
    }, []);

    return (
        <>
            <header className={styles.header_container}>
                <h2>Room Name</h2>
                {/* TODO href="/rooms" */}
                <a href="#">
                    <button>Change Room</button>
                </a>
            </header>
            <main className={styles.chat_container}>
                <div className={styles.chat_list_container}>
                    {[1, 2, 3, 4, 5].map((x, key) => (
                        <Message
                            key={key}
                            user='Username'
                            msg='Message'
                            date='Some date'
                        ></Message>
                    ))}
                </div>
                <div className={styles.input_msg_container}>
                    <form action="#" id="chat-form" className={styles.chat_form}>
                        <input type="text" name={styles.msg} id="msg" placeholder="Write your message..." autocomplete="off" />
                        <button>Send</button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Chat;