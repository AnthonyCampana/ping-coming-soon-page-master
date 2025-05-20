const notificationButton = document.getElementById("submit");
const input = document.getElementById("textBox")
const errorMessage = document.getElementsByClassName("error-message")[0];
const image = document.getElementsByClassName("dashboard")[0];
const viewport = window.matchMedia('(max-width: 750px)');
const form = document.getElementById("form");

function validatePrefix(prefix) {
    let quoteClosure = true;
        
        for (let i = 0; i < prefix.length; i++) {
            if(quoteClosure) {
                if((33 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 39) || prefix.charCodeAt(i) === 42 || prefix.charCodeAt(i) === 43 || (45 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 47) || prefix.charCodeAt(i) === 61 || prefix.charCodeAt(i) == 63 || (123 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 126)) {
                    if(prefix.charAt(i) === '"' ) {
                        quoteClosure = false
                    } else if(prefix.charAt(i) === '.') {
                        if(i === 0 || i === prefix.length -1) {
                            return false;
                        } else if(prefix.charAt(i+1) === '.') {
                            return false;
                        }
                    }
                } else if((48 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 57) || (65 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 90) || (97 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 122)) {
                } else {
                    return false
                }
            } else {
                if(prefix.charAt(i) === '"') {
                    quoteClosure = true;
                } else if(i == prefix.length-1) {
                    return false;
                }
            }
        }
        return true;
}

function validateDomain(domain) {
    let IPaddress = false;
    for (let i = 0; i < domain.length; i++) {
        console.log(domain.charAt(i));
        if(!IPaddress) {
            if(domain.charCodeAt(i) === 45 || domain.charCodeAt(i) === 46 || (48 <= domain.charCodeAt(i) && domain.charCodeAt(i) <= 57) || (65 <= domain.charCodeAt(i) && domain.charCodeAt(i) <= 91) || (97 <= domain.charCodeAt(i) && domain.charCodeAt(i) <= 122)) {
                if(domain.charAt(i) === '-' && (i === 0 || i === domain.length -1)) {
                    return false
                } else if(domain.charAt(i) == '.' && domain.length - (i+1) < 2) {
                    return false;
                } else if(domain.charAt(i) === '[') {
                    IPaddress = true;
                }
            }
        } else {
            if(domain.charAt(i) === ']' && i != domain.length-1) {
                return false;
            }  
        }
    }
    return false;
}

notificationButton.addEventListener('click', (e) => {
    e.preventDefault()

    email = input.value;

    if(viewport.matches){
        if(email.indexOf("@") != -1) {
            [prefix, domain] = email.split("@");
            if(validatePrefix(prefix) & validateDomain(domain)) {
                errorMessage.style.display = "none";
                notificationButton.style.marginTop = "1.3rem";
                form.style.height = "11.2rem";
                image.style.marginTop = "8.6rem";

            } else {
                input.style.border = "1px solid hsl(354, 100%, 66%)"
                form.style.height = "15.2rem";
                notificationButton.style.marginTop = "5.3rem";
                image.style.marginTop = "2.8rem";
                errorMessage.style.display = "block";
            }
        } else {
            input.style.border = "1px solid hsl(354, 100%, 66%)"
            form.style.height = "15.2rem";
            notificationButton.style.marginTop = "5.3rem";
            image.style.marginTop = "2.8rem";
            errorMessage.style.display = "block";
        }
    } else {
        if(email.indexOf("@") != -1){
            [prefix, domain] = email.split("@");
            if(validatePrefix(prefix) & validateDomain(domain)) {
                errorMessage.style.display = "none"
                image.style.marginTop = "4.9rem"
                input.style.border = "1px solid hsl(0, 0%, 59%, .2)"

            } else {
                input.style.border = "1px solid hsl(354, 100%, 66%)"
                errorMessage.style.display = "block"
                image.style.marginTop = "3.9rem"
            }
        } else {
            input.style.border = "1px solid hsl(354, 100%, 66%)"
            errorMessage.style.display = "block"
            image.style.marginTop = "3.9rem"
        }
    }
});