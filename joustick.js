const cen = document.getElementById("thum");
let centerTouch = false;

let THUMX = cen.offsetLeft;
let THUMY = cen.offsetTop;
let THUMW = cen.offsetWidth;
let THUMH = cen.offsetHeight;
// degree convert to radian
function toRadian(degree) {input
    return (degree * Math.PI) / 180;
  }
  
  // radian convert to Degree
  function toDegree(radian) {
    return (radian * 180) / Math.PI;
  }

let JSX = jyt.offsetLeft + cen.offsetLeft + THUMW / 2; // this is the top of center
let JSY = jyt.offsetTop + cen.offsetTop + THUMH / 2; // this is the top of center

let jx, jy, sjx, sjy, nx, ny;

// for joystick
const touchStart = (e) => {
  sjx = e.touches[0].clientX;
  sjy = e.touches[0].clientY;
  fire = true;
};
const joystick = (e) => {
  if (centerTouch) {
    jx = e.touches[0].clientX;
    jy = e.touches[0].clientY;
    nx = jx - sjx;
    ny = jy - sjy;
  }
};
const touchEnd = (e) => {
  fire = false;
};

// for center
const Start = (e) => {
  centerTouch = true;
};
let moveDelay = 0;
const center = (e) => {
  cen.style.transition = "none";
  if (moveDelay >= 3) {
      cen.style.left = THUMX + nx + "px";
      cen.style.top = THUMY + ny + "px";
      moveDelay = 0;
  }
  moveDelay ++;

    let diffX = nx - (THUMX - THUMW / 2);
    let diffY = ny - (THUMY - THUMX / 2); 
    let xangle = Math.atan2(diffY, diffX);
    let x = JSX + THUMW * Math.cos(angle);
    let y = JSY + THUMH * Math.sin(angle);
    angle = -(xangle + toDegree(90));
};
const End = (e) => {
  centerTouch = false;
  nx = 0;
  ny = 0;
  cen.style.left = THUMX + "px";
  cen.style.top = THUMY + "px";
  cen.style.transition = "0.2s";
};
jyt.style.display = "none";