const cvs = document.querySelector("canvas");
const jyt = document.getElementById("joystick");
const scorE = document.getElementById("mscore");
const smlScore = document.getElementById("score");
const bigScore = document.getElementById("bigScore");
const showScore = document.getElementById("showScore");
const startGame = document.getElementById("startGame");
const bestScore = document.getElementById("bestScore");
const ctx = cvs.getContext("2d");
const topLayer = document.getElementById("top_layer");

// varibels ......
let x, y;

function getFullScreen() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullscreenElement ||
    document.msFullscreenElement
  );
}
//   document.addEventListener("fullscreenchange", () => {
//     console.log("change");
//   });
topLayer.addEventListener("click", () => {
  topLayer.style.display = "none";
  fullScreenPag();
});

function fullScreenPag() {
  if (getFullScreen()) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen().catch(
      setTimeout(() => {
        class Player {
          constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
          }
          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
          }
        }
        class Projectile {
          constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
          }
          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
          }
          update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
          }
        }
        class Enemy {
          constructor(x, y, speed, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
          }
          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
              this.x,
              this.y - this.radius / 3,
              this.radius / 1.5,
              0,
              Math.PI * 2,
              false
            );
            ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
            ctx.fill();
          }
          update() {
            this.draw();
            this.x = this.x + this.velocity.x * this.speed;
            this.y = this.y + this.velocity.y * this.speed;
          }
        }

        class Particle {
          constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
            this.alpha = 2;
          }
          draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
          }
          update() {
            this.draw();
            this.velocity.x *= friction;
            this.velocity.y *= friction;
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
            this.alpha -= 0.05;
          }
        }
        const friction = 1.05;
        var radiusIncrige = 0;
        let gameOver = false;
        var Score = 0;
        let FPS = 60;
        var LScore = 0;
        let projectiles = [];
        let enemies = [];
        let particles = [];
        let angle = 0;
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;
        let bulletDelay = 10;
        let fire = false;
        x = cvs.width / 2;
        y = cvs.height / 2;

        bestScore.innerHTML =
          localStorage.getItem("sbgames") == null
            ? 0
            : localStorage.getItem("sbgames");

        // send value draw for player ....
        let player = new Player(x, y, 10, "#ffffff");

        // reset fnction .......
        function reset() {
          projectiles = [];
          enemies = [];
          particles = [];
          Score = 0;
          radiusIncrige = 0;
          scorE.innerHTML = Score;
          showScore.innerText = Score;
        }

        function randomColor() {
          let color = "#";
          let m = Math.floor(Math.random() * 5);
          let hex = "0123456789ABCDEF".split("");
          for (let i = 0; i < 5; i++) {
            if (m === i) {
              color += "F";
            }
            color += hex[Math.floor(Math.random() * 15)];
          }
          return color;
        }

        function spwnEnemies() {
          if (!gameOver) {
            setTimeout(() => {
              const radius = Math.random() * 26 + 5 + radiusIncrige;
              let x;
              let y;
              let speed = Math.random() * 1.5 + 0.5;

              if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? -radius : cvs.width + radius;
                y = Math.random() * cvs.height;
              } else {
                x = Math.random() * cvs.width;
                y = Math.random() < 0.5 ? -radius : cvs.height + radius;
              }
              const color = randomColor();
              const angle = Math.atan2(cvs.width / 2 - x, cvs.height / 2 - y);
              const velocity = {
                x: Math.sin(angle),
                y: Math.cos(angle),
              };
              enemies.push(new Enemy(x, y, speed, radius, color, velocity));
              spwnEnemies();
            }, 1200 / (FPS / 40));
          }
        }
        // whice pointe click how to work.....
        addEventListener("click", (event) => {
          const angle = Math.atan2(event.clientX - x, event.clientY - y);
          const velocity = {
            x: Math.sin(angle) * 5,
            y: Math.cos(angle) * 5,
          };
          projectiles.push(new Projectile(x, y, 5, "#ffffff", velocity));
          Sounds.fire();
        });

        // start button click then how to work ......
        startGame.addEventListener("click", () => {
          gameOver = false;
          reset();
          spwnEnemies();
          animate();
          FPS = 60;
          bulletDelay = 10;
          bigScore.style.display = "none";
          smlScore.style.display = "flex";
          jyt.style.display = "flex";
        });

        //   move ment -----------------------

        // degree convert to radian
        function toRadian(degree) {
          return (degree * Math.PI) / 180;
        }

        // radian convert to Degree
        function toDegree(radian) {
          return (radian * 180) / Math.PI;
        }

        let jx,
          jy,
          sjx = window.innerWidth / 2,
          sjy = window.innerHeight / 2;

        // for joystick
        jyt.addEventListener("touchstart", (e) => {
          let x = e.touches[0].clientX - sjx;
          let y = e.touches[0].clientY - sjy;

          fire = true;
          let xangle = Math.atan2(y, x);
          angle = -(xangle - toRadian(90));
        });

        //   console.log(toRadian(90));
        jyt.addEventListener("touchmove", (e) => {
          jx = e.touches[0].clientX - sjx;
          jy = e.touches[0].clientY - sjy;

          let xangle = Math.atan2(jy, jx);
          angle = -(xangle - toRadian(90));
        });
        jyt.addEventListener("touchend", (e) => {
          fire = false;
        });
        jyt.style.display = "none";

        let max = 0;
        function animate() {
          if (!gameOver) {
            setTimeout(animate, 1000 / FPS);
          }
          //    --------------fire ------------------
          if (fire && max >= bulletDelay) {
            const velocity = {
              x: Math.sin(angle) * 5,
              y: Math.cos(angle) * 5,
            };
            projectiles.push(new Projectile(x, y, 5, "#ffffff", velocity));
            max = 0;
            Sounds.fire();
          }
          max++;
          ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
          ctx.fillRect(0, 0, x * 2, y * 2);
          player.draw();
          particles.forEach((particle, particleIndex) => {
            if (particle.alpha <= 0) {
              particles.splice(particleIndex, 1);
            } else {
              particle.update();
            }
          });

          projectiles.forEach((projectile, projectilesIndex) => {
            projectile.update();
            // for scrine outsite spon enemy ....
            if (
              projectile.x + projectile.radius < 0 ||
              projectile.x - projectile.radius > cvs.width ||
              projectile.y + projectile.radius < 0 ||
              projectile.y - projectile.radius > cvs.height
            ) {
              setTimeout(() => {
                projectiles.splice(projectilesIndex, 1);
              }, 0);
            }
          });

          enemies.forEach((enemy, enemiesIndex) => {
            enemy.update();

            // when enemy tuch player ......
            const distence = Math.hypot(player.x - enemy.x, player.y - enemy.y);
            if (distence - player.radius - enemy.radius < 1) {
              gameOver = true;
              Sounds.dead();
              bigScore.style.display = "flex";
              smlScore.style.display = "none";
              jyt.style.display = "none";
              if (localStorage.getItem("sbgames") < Score) {
                localStorage.setItem("sbgames", Score);
              }
              LScore = localStorage.getItem("sbgames");
              bestScore.innerHTML = LScore;
              showScore.innerText = Score;
            }
            projectiles.forEach((projectile, projectilesIndex) => {
              const distence = Math.hypot(
                projectile.x - enemy.x,
                projectile.y - enemy.y
              );

              // when projectile tuch enemy
              if (distence - projectile.radius - enemy.radius < 1) {
                // create explosions
                for (let i = 0; i < enemy.radius; i++) {
                  particles.push(
                    new Particle(
                      projectile.x,
                      projectile.y,
                      Math.random() * 1.5,
                      enemy.color,
                      {
                        x: (Math.random() - 0.5) * (Math.random() * 6),
                        y: (Math.random() - 0.5) * (Math.random() * 6),
                      }
                    )
                  );
                }
                // big enemy distroy to smol...
                if (enemy.radius - 8 > 10) {
                  enemy.radius -= 10;
                  Sounds.blast2();
                  Score += 10;
                  if (FPS >= 100) {
                    FPS += 0.01;
                  }
                  bulletDelay -= 0.005;
                  scorE.innerHTML = Score;
                  setTimeout(() => {
                    projectiles.splice(projectilesIndex, 1);
                  }, 0);
                } else {
                  Sounds.blast1();
                  Score += 15;
                  if (FPS >= 100) {
                    FPS += 0.015;
                  }
                  bulletDelay -= 0.0075;
                  radiusIncrige += 0.1;
                  scorE.innerHTML = Score;
                  enemies.splice(enemiesIndex, 1);
                  projectiles.splice(projectilesIndex, 1);
                }
              }
            });
          });
        }
      }, 500)
    );
  }
}


var favicon = document.getElementById( 'favicon' ),
		favc = document.createElement( 'canvas'),
		favctx = favc.getContext( '2d' ),
		faviconGrid = [
			[ 1, 1, 1, 1, 1,  ,  , 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
			[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
			[ 1,  ,  , 1, 1, 1, 1,  ,  , 1, 1, 1, 1,  ,  , 0 ],
			[ 1,  , 1, 1, 1, 1, 1,  ,  , 1, 1, 1, 1, 1,  , 0 ],
			[ 1,  , 1, 1,  ,  , 1,  ,  , 1, 1,  , 1, 1,  , 1 ],
			[ 1,  , 1, 1,  ,  ,  ,  ,  , 1, 1,  , 1, 1,  , 1 ],
			[ 1,  , 1, 1, 1, 1,  ,  ,  , 1, 1, 1, 1,  ,  , 1 ],
			[ 1,  ,  , 1, 1, 1, 1,  ,  , 1, 1, 1, 1,  ,  , 1 ],
			[ 1,  ,  ,  ,  , 1, 1,  ,  , 1, 1,  , 1, 1,  , 1 ],
			[ 1,  , 1,  ,  , 1, 1,  ,  , 1, 1,  , 1, 1,  , 1 ],
			[  ,  , 1, 1, 1, 1, 1,  ,  , 1, 1, 1, 1, 1,  , 1 ],
			[  ,  , 1, 1, 1, 1,  ,  ,  , 1, 1, 1, 1,  ,  , 1 ],
			[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
			[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1 ],
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1,  ,  , 1, 1, 1, 1, 1 ]
		];
	favc.width = favc.height = 16;
	favctx.beginPath();
	for( let y = 0; y < 16; y++ ) {
		for( let x = 0; x < 16; x++ ) {
			if( faviconGrid[ y ][ x ] === 1 ) {
				favctx.rect( x, y, 1, 1 );
			}
		}
	}
	favctx.fill();
	favicon.href = favc.toDataURL();