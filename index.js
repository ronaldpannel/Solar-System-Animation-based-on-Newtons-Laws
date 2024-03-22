/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const gravityConstantSlider = document.getElementById("gravConstSlider");
const destabilizeSlider = document.getElementById("destabilizeSlider");

canvas.width = 600;
canvas.height = 600;
let planets = [];
let numPlanets = 5;
let G;
let destabilize = 0.09;

 


const sun = new Body(40, new Vector(0, 0), new Vector(0, 0), "orange");
for (let i = 0; i < numPlanets; i++) {
  let r = randomIntFromRange(sun.r, canvas.width / 2 - 10);
  let angle = Math.random() * (Math.PI * 2);
  let planetPos = new Vector(r * Math.cos(angle), r * Math.sin(angle));

  //planet velocity
  let planetVel = planetPos.copy();
  planetVel.rotate(Math.PI / 2);
  planetVel.setMag(Math.sqrt((G * sun.mass) / planetPos.mag()));

  if (Math.random() < 0.2) {
    planetVel.mult(-1);
  }
  planetVel.mult(randomIntFromRange(1 - destabilize, 1 + destabilize));
  planets.push(
    new Body(randomIntFromRange(5, 30), planetPos, planetVel, "blue")
  );
}

function animate() {
  console.log(G);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  for (let i = 0; i < planets.length; i++) {
    sun.attract(planets[i]);
    planets[i].update();
    planets[i].draw(ctx);
    planets[i].drawText(ctx)
  }
  sun.draw(ctx);

  ctx.restore();

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
