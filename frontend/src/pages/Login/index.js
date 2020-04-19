import React from 'react';

import './styles.css'

const Login = () => {

    // FIXME Override css

    return (
        <div className="login-container">
            <div className="content">
                <div className="content-items">
                    <div className="avatar">
                        <img src="#" alt="avatar" id="avatarImg" />
                    </div>
                    <div className="side-container">
                        {/* TODO action="/rooms" */}
                        <form action="#" method="post" class="form">
                            <h1>Full Chat</h1>
                            <input type="text" name="username" id="username" placeholder="Username" />
                            {/* TODO href="rooms" */}
                            <a href="#">
                                <button id="getStarted">Get Started</button>
                            </a>
                        </form>
                        {/* TODO href="loginAdmin" */}
                        <a href="#" className="admin-page">
                            <button>Admin</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;