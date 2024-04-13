window.onload = () => {

    let user = document.getElementById("user").innerHTML
    let latestMsg = "";

    document.getElementById("inputField").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("send").click();
        }
    })

    document.getElementById("send").onclick = function() {
        let message = document.getElementById("inputField").value.trim().replace(/[\r\n]+/gm, " ");
        if ( message != "" ) {
            let formData = new FormData()
            formData.append('message', `${message}`)
            let init = {
                method: "POST",
                body: formData,
                credentials: "include"
            }
            fetch(`chatmsg.php`, init).then( response => {
                if (response.status == 200) {
                    document.getElementById("inputField").value = ""
                    textarea.style.height = 'auto';
                    textarea.style.height = `${textarea.scrollHeight}px`;
                    fetchMsg()
                } else if (response.status == 401) {
                    window.location.replace("login.php");
                } else {
                    console.log("HTTP return status: "+response.status);
                }
            })
        }
    }

    let textarea = document.getElementById("inputField")
    textarea.oninput = function() {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    let msgidAfter = "";
    fetchMsg()
    setInterval(fetchMsg, 5000)

    function fetchMsg() {
        fetch(`chatmsg.php${msgidAfter}`).then( response => {
            if (response.status == 200) { response.json().then( rawMessages => {
                let organizedMessage = "";
                for ( let eachMessage of rawMessages ) {
                    if ( eachMessage[3] == user ) {
                        organizedMessage += `<div class="chatBubble me"> <div class="messageHeader"> <div class="sender">${eachMessage[3]}</div>`
                        organizedMessage += `<div class="sendingTime">${formatTime(eachMessage[1])}</div> </div>`
                        organizedMessage += `<div class="sendingMessage">${eachMessage[2]}</div> </div>`
                    } else {
                        organizedMessage += `<div class="chatBubble"> <div class="messageHeader"> <div class="sender">${eachMessage[3]}</div>`
                        organizedMessage += `<div class="sendingTime">${formatTime(eachMessage[1])}</div> </div>`
                        organizedMessage += `<div class="sendingMessage">${eachMessage[2]}</div> </div>`
                    }
                }
                if ( organizedMessage != "" ) {
                    latestMsg += organizedMessage
                    msgidAfter = `?msgidAfter=${rawMessages[rawMessages.length-1][0]}`
                    document.getElementById("chatbox").innerHTML = latestMsg
                    document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight
                }
            })} else if (response.status == 401) {
                window.location.replace("login.php");
            } else {
                console.log("HTTP return status: "+response.status);
            }
        })
    }

    function formatTime(rawTime) {
        let date = new Date(rawTime*1000)
        let hour = "0" + date.getHours()
        let minute = "0" + date.getMinutes()
        let second = "0" + date.getSeconds()
        return ( hour.slice(-2) + ":" + minute.slice(-2) + ":" + second.slice(-2) )
    }
}