//app.js =>> backend code
//cd to webapp , then type
// npm init -y in the terminal
//now you can see a package.json file created
//npm i express nodemon socket.io
//the above means npm install followed by package names
//go to package.json file and three dependencies will be found there
//add nodemon to the "dev dependencies" bcz its required while development is going on

//nodemon will trigger changes in the code and reflect them on the ui, to start using it, write "npm start"


//express is a package that we installed
//used to write APIs in the backend
//const { response } = require("express");
const express = require("express");
//express has written the code of node.js in an easier way so that we can call API's easily


const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//this statement abobe is used to create a appplication or backend or server

app.use(express.static("public"));

let usersDb = [];
let filteredUsers = [];

io.on('connection',function(socket){
    console.log(socket.id + " connected !!");
    usersDb.push({id : socket.id});
    socket.on("join",function(username){
        for(let i = 0; i <  usersDb.length; i++)
        {
            if(usersDb[i].id ==socket.id)
            {
                usersDb[i].username =username;
                break;
            }
        }
        //console.log(usersDb);
        socket.broadcast.emit("join-chat",username);
    })
    socket.on("send-chat",function(chatMessage){
        //console.log(chatMessage);
        let namee;
        for(let i=0;i<usersDb.length;i++)
        {
            if(usersDb[i].id == socket.id)
            {
                namee = usersDb[i].username;  
                break;
            }
        }
        socket.broadcast.emit("add-chat", {namee ,chatMessage});
     
    })
    socket.on('disconnect',function(){
        let username;
        let filteredUsers = usersDb.filter(function(socketObject){
        if(socketObject.id ==socket.id)
        {
            username = socketObject.username;
            return false;
        }
        else return true;
        //return socketObject.id != socket.id;
        //find index and do => usersDb.splice(idx,1);
        
    }) 
    usersDb = filteredUsers;
    socket.broadcast.emit("left-chat", username)
    })
})
http.listen(3000 , function(){
    console.log("app started at port 3000");
})

