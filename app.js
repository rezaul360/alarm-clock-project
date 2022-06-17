const currentTime = document.querySelector("h1"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector("button");

let alarmTime,
  isAlarmSet = false,
  ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
  let amPm = i == 1 ? "AM" : "PM";
  let option = `<option value="${amPm}">${amPm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  //getting hour, minute, second
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    amPm = "AM";

  if (h >= 12) {
    h = h - 12;
    amPm = "PM";
  }
  // if hour value is 0, set this value to 12
  h = h == 0 ? (h = 12) : h;
  // adding 0 before hr, min, sec if this value is less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  let mainTime = `${h}: ${m}: ${s} ${amPm}`;
  currentTime.innerText = mainTime;
  if (alarmTime == `${h}: ${m}: ${amPm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

// alarm set
function setAlarm() {
  if (isAlarmSet) {
    //if isAlarmset is true
    alarmTime = ""; //clear the value of alarmTime
    ringtone.pause(); // pause the ringtone
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    setAlarmBtn.style.color = "#fff";
    return (isAlarmSet = false); // return isAlarmSet value of false
  }
  //getting hour, minute, second select tag value
  let time = `${selectMenu[0].value}: ${selectMenu[1].value}: ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please select a valid time to set alarm");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
  setAlarmBtn.style.color = "red";
}

setAlarmBtn.addEventListener("click", setAlarm);
