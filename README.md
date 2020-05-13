<h1 align="center">
  Full Chat - React JS
</h1>

<p align="center">
  Chat application with message and events history using Node.js, Socket.IO and ReactJS as final Project for BCDV1017 - Full Stack Development IV from <a href='https://www.georgebrown.ca/programs/blockchain-development-program-t175/'>Blockchain Development</a> program from <a href='https://www.georgebrown.ca'>George Brown College</a>.
</p>

<p align="center">
  This application was developed using <a href='https://reactjs.org/'>React</a> as frontend, but also you can check this application implemented using Pug template <a href='https://github.com/LorranSutter/FullChat'>here</a>.
</p>

<p align="center">
    <a href='#straight_ruler-Development-pipeline-and-challenges'>Development and challenges</a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#runner-how-to-run">How to run</a>&nbsp;&nbsp;|&nbsp;&nbsp;    
    <a href="#book-Resources-and-technologies-computer">Resources and technologies</a>
</p>
 
<div align="center">

<img src="https://github.com/LorranSutter/FullChat/blob/assets/preview.gif?raw=true" alt="Preview Chat" height=200/>

<img src="https://res.cloudinary.com/lorransutter/image/upload/v1589245407/FullChat_React_admin.gif" height=200 alt="Preview Admin">

</div>

## :straight_ruler: Development pipeline and challenges

This project is an extension from this [another project](https://github.com/LorranSutter/FullChat) implemented using Pug. You may check the whole development pipeline there if you want. Here I will just talk about the differences and new challenges.

1. As mentioned in the previous project, I have started creating a wireframe in [Figma](https://www.figma.com/). Just add another page for admin login and you can check the result [here](https://www.figma.com/file/vnNwlNAq3iDuazxRo2eULX/Full-Chat?node-id=0%3A1).

2. One of the main differences between use a frontend framework or libray such as React, Angular or Vue instead of a template like Pug, is that you must turn your backend into a API properly. What I mean with that? Using Pug you send a rendered HTML from backend to the client, something like that:

    ```js
    exports.index = async (req, res, next) => {
        const roomsList = await room.find();
        res.render('rooms',
        {
            title: 'Rooms',
            roomsList: roomsList
        });
    }
    ```

    In the code above, a view called *index* will get *roomsList* data and render to the client. Using React, things get easier to the backend, which is resposible only to send data in JSON format, like as follows:

    ```js
    exports.index = async (req, res, next) => {
        const roomsList = await room.find();
        res.send({ roomsList });
    }
    ```

    As you can imagine, detaching of backend and frontend becomes clearer and easier to manage. It was time to turn all controllers from backend into "data emitters".

3. Due to admin login to access messages and events history, I have decided to use a new and better way to manage authentication than my previous projects. This [article](https://stormpath.com/blog/token-authentication-scalable-user-mgmt) helped me a lot to understand how token authentication works, specially [JWT](https://jwt.io/). So I was able to implement token authentication in the backend and, in frontend development step, I was able to manage tokens using [React-cookie](https://www.npmjs.com/package/react-cookie).

4. Backend done and having pug template from previous project, I have started to convert all interface to React. It was the first time I was working with React to build a bigger project, so I admit that I did not took the best practices to build reusable components. Indeed, all pages were actually made simply with a single or a few components.

    Although I have employed few components, it did not prevent me to learn better and apply modern tools such as hooks and react navigation. Also, after build most of the project, I discovered a fantastic project called [Scrimba](https://scrimba.com/), where I was able to took a free [React Hooks Course](https://scrimba.com/course/greacthooks). It allowed me to learn more about hooks and React.memo, which made it possible to optimize my code.

<!-- Continue here? I do not know if I have something else to talk about -->

## :runner: How to run

Open your terminal in the folder you want to clone the project

```sh
# Clone this repo
git clone https://github.com/LorranSutter/FullChat-React.git

# Go to the project
cd FullChat-React

# Go to each folder and install dependencies
cd backend
npm install

cd ../frontend
npm install
```

Now you will need two opened terminals to run the project. One for the backend and another one for the frontend or mobile.

Backend will run on http://localhost:5000/

Frontend will run on http://localhost:3000/

```sh
# Go to backend
cd backend

# Run the project
npm start

## In the another terminal ##

# Go to frontend
cd frontend

# Run the project
npm start
```

If you want to use your own mongodb account, replace the following variable with your own mongo URL:

```sh
# Go to backend/db/config.js
MONGOURI = <your-url>
```

Then you may populate your database using the following command:

```sh

cd backend

node populatedb.js
```

## :book: Resources and technologies :computer:

1. Resources
    - [React auth](https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#beb6)
    - [Token Authentication](https://stormpath.com/blog/token-authentication-scalable-user-mgmt)
    - [Chat example](https://medium.com/dataseries/how-to-build-a-chat-app-with-react-socket-io-and-express-190d927b7002)
        - [Repo](https://bitbucket.org/hauyeung/react-chat-tutorial-app/src/master/)
    - [JavaScript Mastery video](https://www.youtube.com/watch?v=ZwFA3YMfkoc)
        - [Repo](https://github.com/adrianhajdin/project_chat_application)
    - [Figma](https://www.figma.com/)
    - [Scrimba](https://scrimba.com/)
    - [Learn React Hooks](https://scrimba.com/course/greacthooks)

2. Technologies
    - [React](https://reactjs.org/)
    - [React navigation](https://reactnavigation.org/)
    - [React Icons](https://www.npmjs.com/package/react-icons)
    - [React-cookie](https://www.npmjs.com/package/react-cookie)
    - [JWT](https://jwt.io/)
    - [ExpressJS](http://expressjs.com/)
    - [Moment](https://momentjs.com/)
    - [Mongoose](https://mongoosejs.com/)
    - [Socket.IO](https://socket.io/)
    - [Async](https://caolan.github.io/async/v3/)
    - [ESlint](https://eslint.org/)
    - [Nodemon](https://www.npmjs.com/package/nodemon)
