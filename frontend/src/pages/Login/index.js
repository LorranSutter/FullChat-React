import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import axios from 'axios';

import styles from './styles.module.css'
import socket from '../../services/socket';

const Login = () => {

    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarHeight] = useState('100%');
    const [avatarWidth, setAvatarWidth] = useState(100);

    const [cookies, setCookie] = useCookies();

    const history = useHistory();

    useEffect(() => {
        document.body.style.backgroundColor = "#49289e";
        document.body.style.margin = "0";

        axios
            .get('https://randomuser.me/api/?inc=login')
            .then(res => {
                if (res.status === 200) {
                    const usernameAPI = res.data.results[0].login.username;

                    setUsername(usernameAPI);
                    setAvatarUrl(`https://avatars.dicebear.com/v2/gridy/${usernameAPI}.svg?options[width][]=500&options[height][]=500`);

                    setAvatarWidth(document.getElementById('avatarImg').height * 1.25);
                } else {
                    history.push('/somethingWentWrong');
                    return function cleanup() { }
                }
            })
            .catch(err => {
                history.push('/somethingWentWrong');
                return function cleanup() { }
            });

    }, []);

    // FIXME think in a better way to resize avatar image
    window.addEventListener('resize', function () {
        if (document.getElementById('avatarImg') !== null) {
            setAvatarWidth(document.getElementById('avatarImg').height * 1.25);
        }
    });

    function handleInputChange(e) {
        const usernameInput = e.target.value;
        setUsername(usernameInput);
        setAvatarUrl(`https://avatars.dicebear.com/v2/gridy/${usernameInput}.svg?options[width][]=500&options[height][]=500`);
    }

    function handleSubmit(e) {
        e.preventDefault();

        try {
            setCookie('username', username);
            setCookie('avatar', avatarUrl);

            history.push('/rooms');
        } catch (error) {
            alert('Fail to login! Try again.');
        }

        socket.emit('connected', { username });
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.content}>
                <div className={styles.content_items}>
                    <div className={styles.avatar}>
                        <img src={avatarUrl} style={{ height: avatarHeight, width: avatarWidth }} alt="avatar" id="avatarImg" />
                    </div>
                    <div className={styles.side_container}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <h1>Full Chat</h1>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={handleInputChange}
                                required />
                            <button id="getStarted">Get Started</button>
                        </form>
                        <Link to="/admin/login" className={styles.admin_page}>
                            <button>Admin</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;