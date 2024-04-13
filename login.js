window.onload = () => {

    // Alert messages
    let missingEmail = "Missing Email address!!"
    let validHKU = "Please enter a valid HKU @connect email address"
    let noEmailFound = "Cannot find your email record"
    let failEmail = "Failed to login. Unknown User!!"
    let missingPwd = "Please provide the password"
    let failPwd = "Failed to login. Incorrect password!!"
    let reged = "You have registered before!!"
    let failReg = "Failed to register. Already registered before!!"
    let mismatchPwd = "Mismatch passwords!!"
    
    let errorMsg = document.getElementById("errorMsg").innerHTML

    for ( let eachLoginField of document.querySelectorAll(".loginField") ) {
        eachLoginField.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("loginBttn").click();
            }
        })
    }

    for ( let eachRegField of document.querySelectorAll(".regField") ) {
        eachRegField.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("regBttn").click();
            }
        })
    }

    // Login Email Verify
    document.getElementById("loginUser").onblur = function() {
        errorMsg = document.getElementById("errorMsg").innerHTML
        if ( !document.getElementById("loginUser").value ) {
            if ( errorMsg==validHKU || errorMsg==noEmailFound || errorMsg==failEmail || errorMsg==reged || errorMsg==failReg || errorMsg==mismatchPwd ) {
                document.getElementById("errorMsg").innerHTML = ""
            }
        } else {
            if ( !validEmail(document.getElementById("loginUser").value) ) {
                document.getElementById("errorMsg").innerHTML = validHKU
            } else {
                fetch(`check.php?email=${document.getElementById("loginUser").value}`).then(response => {
                    if (response.status==200) {response.json().then(exist=> {
                        if (!exist) {
                            document.getElementById("errorMsg").innerHTML = noEmailFound
                        } else {
                            if ( errorMsg==missingEmail || errorMsg==validHKU || errorMsg==noEmailFound || errorMsg==failEmail || errorMsg==reged || errorMsg==failReg || errorMsg==mismatchPwd ) {
                                document.getElementById("errorMsg").innerHTML = ""
                            }
                        }
                    })} else {
                        console.log("HTTP return status: "+response.status);
                    }
                })
            }
        }
    }

    // Login Password Verify
    document.getElementById("loginPassword").onblur = function() {
        errorMsg = document.getElementById("errorMsg").innerHTML
        if ( !document.getElementById("loginPassword").value ) {
            if ( errorMsg==failPwd || errorMsg==reged || errorMsg==failReg || errorMsg==mismatchPwd ) {
                document.getElementById("errorMsg").innerHTML = ""
            }
        } else {
            if ( errorMsg==missingPwd || errorMsg==failPwd || errorMsg==reged || errorMsg==failReg || errorMsg==mismatchPwd ) {
                document.getElementById("errorMsg").innerHTML = ""
            }
        }
    }

    // Reg Email Verify
    document.getElementById("regUser").onblur = function() {
        errorMsg = document.getElementById("errorMsg").innerHTML
        if ( !document.getElementById("regUser").value ) {
            if ( errorMsg==validHKU || errorMsg==reged || errorMsg==failReg || errorMsg==noEmailFound || errorMsg==failEmail || errorMsg==failPwd ) {
                document.getElementById("errorMsg").innerHTML = ""
            }
        } else {
            if ( !validEmail(document.getElementById("regUser").value) ) {
                document.getElementById("errorMsg").innerHTML = validHKU
            } else {
                fetch(`check.php?email=${document.getElementById("regUser").value}`).then(response => {
                    if (response.status==200) {response.json().then(exist=> {
                        if (exist) {
                            document.getElementById("errorMsg").innerHTML = reged
                        } else {
                            if ( errorMsg==missingEmail || errorMsg==validHKU || errorMsg==reged || errorMsg==failReg || errorMsg==noEmailFound || errorMsg==failEmail || errorMsg==failPwd ) {
                                document.getElementById("errorMsg").innerHTML = ""
                            }
                        }
                    })} else {
                        console.log("HTTP return status: "+response.status);
                    }
                })
            }
        }
    }

    // Reg Password Verify
    document.getElementById("regPassword").onblur = function() {
        errorMsg = document.getElementById("errorMsg").innerHTML
        if ( errorMsg==missingPwd ) {
            if ( document.getElementById("regPassword").value || document.getElementById("confirm").value ) {
                document.getElementById("errorMsg").innerHTML = ""
            }
        } else if ( errorMsg==mismatchPwd) {
            if ( document.getElementById("regPassword").value == document.getElementById("confirm").value ) {
                document.getElementById("errorMsg").innerHTML = ""
            }
        } else if ( errorMsg==noEmailFound || errorMsg==failEmail || errorMsg==failPwd ) {
            document.getElementById("errorMsg").innerHTML = ""
        }
    }

    //Confirm Password Verify
    document.getElementById("confirm").onblur = function() {
        errorMsg = document.getElementById("errorMsg").innerHTML
        if ( errorMsg==missingPwd ) {
            if ( document.getElementById("regPassword").value || document.getElementById("confirm").value ) {
                document.getElementById("errorMsg").innerHTML = ""
            }
        } else if ( errorMsg==mismatchPwd) {
            if ( document.getElementById("regPassword").value == document.getElementById("confirm").value ) {
                document.getElementById("errorMsg").innerHTML = ""
            }
        } else if ( errorMsg==noEmailFound || errorMsg==failEmail || errorMsg==failPwd ) {
            document.getElementById("errorMsg").innerHTML = ""
        }
    }

    document.getElementById("loginBttn").onclick = function() {
        if ( !document.getElementById("loginUser").value ) {
            document.getElementById("errorMsg").innerHTML = missingEmail
        } else if ( !validEmail(document.getElementById("loginUser").value) ) {
            document.getElementById("errorMsg").innerHTML = validHKU
        } else if ( !document.getElementById("loginPassword").value ) {
            document.getElementById("errorMsg").innerHTML = missingPwd
        } else {
            document.getElementById("loginForm").submit();
        }
    }

    document.getElementById("regBttn").onclick = function() {
        if ( !document.getElementById("regUser").value ) {
            document.getElementById("errorMsg").innerHTML = missingEmail
        } else if ( !validEmail(document.getElementById("regUser").value) ) {
            document.getElementById("errorMsg").innerHTML = validHKU
        } else if ( !document.getElementById("regPassword").value ) {
            document.getElementById("errorMsg").innerHTML = missingPwd
        } else if ( document.getElementById("regPassword").value != document.getElementById("confirm").value ) {
            document.getElementById("errorMsg").innerHTML = mismatchPwd
        } else {
            document.getElementById("registerForm").submit();
        }
    }

    document.getElementById("switchReg").onclick = function() {
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "block";
    }

    document.getElementById("switchLogin").onclick = function() {
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "block";
    }

    function validEmail(input) {
        var validRegex = /^\S+@connect.hku.hk$/;
        if (input.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    }
}