socket.on("add-chat", function(chatObject){
    //console.log("chatMessage");
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("left");
    chatDiv.innerHTML = `${chatObject.namee} : ${chatObject.chatMessage}`;
    chatList.append(chatDiv);
    chatList.scrollTop = chatList.scrollHeight;
})

socket.on("join-chat", function(name){
    //console.log("chatMessage");
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("join");
    chatDiv.innerHTML = `${name} joined chat`;
    chatList.append(chatDiv);
    chatList.scrollTop = chatList.scrollHeight;
})

socket.on("left-chat", function(name){
    //console.log("chatMessage");
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("leave");
    chatDiv.innerHTML = `${name} left chat`;
    chatList.append(chatDiv);
    chatList.scrollTop = chatList.scrollHeight;
})