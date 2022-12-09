const ele = document.getElementById("whatsappOpneIn");
const phone = document.getElementById('phone');
const phoneRGEX = /^[ 0-9()+-]*$/;

window.onload = async function() {
    phone.focus();
    const permission = await navigator.permissions.query({ name: 'clipboard-read' });
    navigator.clipboard
        .readText()
        .then((clipText) => (console.log(clipText)));
    setTimeout(async()=> {
        navigator.clipboard.readText().then((text) => {
            console.log(text);
        })
        .catch(err => {
            console.error('Error in copying text: ', err);
        });
        // phone.value = text;
    }, 3000)
 }

phone.addEventListener("keypress", function(e) {
    const phoneNumber = phone.value
    if(!phoneRGEX.test(phoneNumber)){
        ele.classList.add('error');
    }else
        ele.classList.remove('error');
})

if(ele.addEventListener) ele.addEventListener("submit", openWSP, false);
else if(ele.attachEvent) ele.attachEvent('onsubmit', openWSP);

function openWSP(event){
    event.preventDefault();
    ele.classList.remove('error');
    const phoneNumber = phone.value

    if(!phoneRGEX.test(phoneNumber)){
        ele.classList.add('error');
        return false;
    }

    var phoneNumberParsed = phoneNumber.replace(/[- ()]/g, '').replace('+54', '');
    var newURL = 'https://wa.me/+54' + encodeURIComponent(phoneNumberParsed);
    window.open(newURL, "_blank")
}