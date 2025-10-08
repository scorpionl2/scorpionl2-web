document.addEventListener("DOMContentLoaded", () => {
  const pantalla = document.getElementById("pantalla-inicial");
  const contenido = document.getElementById("contenido");

  pantalla.addEventListener("click", () => {
    pantalla.classList.add("fade-out");
    setTimeout(() => {
      pantalla.style.display = "none";
      contenido.style.display = "flex";
      setTimeout(() => contenido.classList.add("mostrar"), 100);
    }, 1000);
  });
});

// --- Partículas tipo Steam ---
const canvas = document.getElementById("particulas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particulas = [];
const numParticulas = 90;

for (let i = 0; i < numParticulas; i++) {
  particulas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.5, // Tamaño reducido
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    alpha: Math.random() * 0.7 + 0.3,
    brillo: Math.random() * 0.5 + 0.5,
  });
}

function animarParticulas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particulas) {
    // Gradiente suave tipo "brillo"
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
    grad.addColorStop(0, `rgba(0, 255, 255, ${p.alpha})`);
    grad.addColorStop(1, `rgba(0, 0, 0, 0)`);

    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
    ctx.fill();

    // Movimiento leve (como en Steam)
    p.x += p.dx * p.brillo;
    p.y += p.dy * p.brillo;

    // Rebote suave
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    // Oscilación de brillo
    p.alpha += (Math.random() - 0.5) * 0.02;
    if (p.alpha < 0.2) p.alpha = 0.2;
    if (p.alpha > 0.8) p.alpha = 0.8;
  }
  requestAnimationFrame(animarParticulas);
}

animarParticulas();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
