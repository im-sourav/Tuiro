let centerTouch = false;

// degree convert to radian
function toRadian(degree) {input
    return (degree * Math.PI) / 180;
  }
  
  // radian convert to Degree
  function toDegree(radian) {
    return (radian * 180) / Math.PI;
  }


let jx, jy, sjx, sjy;

// for joystick
const touchStart = (e) => {
  sjx = e.touches[0].clientX;
  sjy = e.touches[0].clientY;
  fire = true;
};
const joystick = (e) => {
    ctx.beginPath();
    ctx.arc(sjx, sjy, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = "#ff000088"; 
    ctx.fill();
    ctx.beginPath();
    ctx.arc(sjx, sjy, 100, 0, Math.PI * 2, false);
    ctx.fillStyle = "#ff000011";
    ctx.fill();
    jx = e.touches[0].clientX;
    jy = e.touches[0].clientY;
    let nx = jx - sjx;
    let ny = jy - sjy;
    let xangle = Math.atan2(ny, nx);
    angle = -(xangle + toDegree(90));
};
const touchEnd = (e) => {
  fire = false;
}; 
jyt.style.display = "none";
