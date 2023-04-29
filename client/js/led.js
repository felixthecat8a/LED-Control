const socket = io();

const buttonOnOff = document.getElementById("buttonOnOff");
let isOn = false;
buttonOnOff.addEventListener("click", handleOnOff);
function handleOnOff() {
    if (isOn) {
        isOn = false;
        buttonOnOff.textContent = "Turn On";
        socket.emit('switchOnOff', { isOn:isOn });
    } else {
        isOn = true;
        buttonOnOff.textContent = "Turn Off";
        socket.emit('switchOnOff', { isOn:isOn });
    }
}
