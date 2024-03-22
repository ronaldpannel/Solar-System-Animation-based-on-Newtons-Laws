class Body {
  constructor(mass, pos, vel, color) {
    this.mass = mass;
    this.pos = pos;
    this.vel = vel;
    this.r = this.mass;
    this.color = color;
    this.path = [];
    G = Number(gravityConstantSlider.value);
  }
  draw(context) {
    for (let i = 0; i < this.path.length - 2; i++) {
      context.beginPath();
      context.strokeStyle = "white";
      context.lineWidth = 2;
      context.moveTo(this.path[i].x, this.path[i].y);
      context.lineTo(this.path[i + 1].x, this.path[i + 1].y);
      context.stroke();
    }
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    context.fill();
  }
  update() {
    G = Number(gravityConstantSlider.value);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.path.push(this.pos.copy());
    if (this.path.length > 100) {
      this.path.splice(0, 1);
    }
  }
  applyForce(f) {
    this.vel.x += f.x / this.mass;
    this.vel.y += f.y / this.mass;
  }
  attract(child) {
    let r = Vector.dist(this.pos, child.pos);
    let f = this.pos.copy().sub(child.pos);
    f.setMag((G * this.mass * child.mass) / (r * r));
    child.applyForce(f);
  }
  drawText(context){
    context.save()
    context.fillStyle = 'white'
    context.font = "16px Arial";
    context.fillText(`${G}`, -120, -260);
    context.restore()
  }
}
