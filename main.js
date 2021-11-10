const cvs = document.querySelector('canvas');
const scorE = document.getElementById('mscore');
const smlScore = document.getElementById('score');
const bigScore = document.getElementById('bigScore');
const showScore = document.getElementById('showScore');
const startGame = document.getElementById('startGame');
const bestScore = document.getElementById('bestScore');
const ctx = cvs.getContext('2d');
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

// varibels ......
const x = cvs.width / 2;
const y = cvs.height / 2;
const friction = 1;
var radiusIncrige = 0;
let animateID;
var Score = 0;
var LScore = 0;
let projectiles = [];
let enemies = [];
let particles = [];

//all draw function ............
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
        this.alpha -= 0.01;
    }
}

// send value draw for player ....
let player = new Player(x, y, 10, 'white');

// reset fnction .......
function reset() {
    projectiles = [];
    enemies = [];
    particles = [];
    Score = 0;
    scorE.innerHTML = Score;
    showScore.innerText = Score;
}

function spwnEnemies() {
    setInterval(() => {
        const radius = (Math.random() * 26) + 5 + radiusIncrige;
        let x;
        let y;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : cvs.width + radius;
            y = Math.random() * cvs.height;
        } else {
            x = Math.random() * cvs.width;
            y = Math.random() < 0.5 ? 0 - radius : cvs.height + radius;
        }
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const angle = Math.atan2(cvs.width / 2 - x, cvs.height / 2 - y);
        const velocity = {
            x: Math.sin(angle),
            y: Math.cos(angle)
        };
        enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 1000);
}

function animate() {
    animateID = requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
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
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > cvs.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > cvs.height) {
            setTimeout(() => {
                projectiles.splice(projectilesIndex, 1);
            }, 0);
        }
    })
    enemies.forEach((enemy, enemiesIndex) => {
        enemy.update();

        // when enemy tuch player ......
        const distence = Math.hypot(player.x - enemy.x,
            player.y - enemy.y);
        if (distence - player.radius - enemy.radius < 1) {
            cancelAnimationFrame(animateID);
            bigScore.style.display = "flex";
            smlScore.style.display = "none";
            if (LScore < Score) {
                localStorage.setItem("sbgame", Score);
                LScore = localStorage.getItem("sbgame");
                bestScore.innerHTML = LScore;
            }
            showScore.innerText = Score;
        }
        projectiles.forEach((projectile, projectilesIndex) => {
            const distence = Math.hypot(projectile.x - enemy.x,
                projectile.y - enemy.y);

            // when projectile tuch enemy
            if (distence - projectile.radius - enemy.radius < 1) {

                // create explosions
                for (let i = 0; i < enemy.radius; i++) {
                    particles.push(new Particle(projectile.x, projectile.y,
                        Math.random() * 2, enemy.color, { x: (Math.random() - 0.5) * (Math.random() * 6), y: (Math.random() - 0.5) * (Math.random() * 6) }
                    ))
                }
                // big enemy distroy to smol...
                if (enemy.radius - 8 > 10) {
                    enemy.radius -= 10;
                    Score += 10;
                    scorE.innerHTML = Score;
                    setTimeout(() => {
                        projectiles.splice(projectilesIndex, 1);
                    }, 0);
                } else {
                    setTimeout(() => {
                        Score += 15;
                        radiusIncrige += 0.1;
                        scorE.innerHTML = Score;
                        enemies.splice(enemiesIndex, 1);
                        projectiles.splice(projectilesIndex, 1);
                    }, 0);
                }
            }
        })
    })
}

// whice pointe click how to work.....
addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientX - x, event.clientY - y);
    const velocity = {
        x: Math.sin(angle) * 5,
        y: Math.cos(angle) * 5
    };
    projectiles.push(new Projectile(x, y, 5, 'white', velocity));
});

// start button click then how to work ......
startGame.addEventListener('click', () => {
    reset();
    animate();
    spwnEnemies();
    bigScore.style.display = "none";
    smlScore.style.display = "flex";
    
})

