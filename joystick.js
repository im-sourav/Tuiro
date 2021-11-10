
let centerTouch = false;

// degree convert to radian
function toRadian(degree) {input
    return (degree * Math.PI) / 180;
  }
  
  // radian convert to Degree
  function toDegree(radian) {
    return (radian * 180) / Math.PI;
  }


let jx, jy, sjx = window.innerWidth / 2, sjy = window.innerHeight / 2;

// for joystick
const touchStart = (e) => {
  fire = true;
};

const joystick = (e) => {
    jx = e.touches[0].clientX - sjx;
    jy = e.touches[0].clientY - sjy;

    let xangle = Math.atan2(jy, jx);
    angle = -(xangle + toDegree(90));
};
const touchEnd = (e) => {
  fire = false;
}; 
jyt.style.display = "none"; 