(function(){
  const byId = (id) => document.getElementById(id);
  const grid = byId("projectsGrid");
  const search = byId("projectSearch");
  const year = byId("year");
  if (year) year.textContent = new Date().getFullYear();

  function render(list) {
    if (!grid) return;
    grid.innerHTML = "";
    list.forEach(p => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <img class="project-thumb" src="${p.image}" alt="${p.title} preview" loading="lazy" />
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
        </div>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="chip">${t}</span>`).join("")}
        </div>
        <div class="project-actions">
          <a class="link" href="${p.link}" target="_blank" rel="noopener">Live ↗</a>
          <a class="link" href="${p.source}" target="_blank" rel="noopener">Source ↗</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function filterProjects(q){
    const needle = q.trim().toLowerCase();
    if (!needle) return PROJECTS;
    return PROJECTS.filter(p => {
      return p.title.toLowerCase().includes(needle)
        || p.description.toLowerCase().includes(needle)
        || p.tags.some(t => t.toLowerCase().includes(needle));
    });
  }

  render(PROJECTS);

  if (search) {
    search.addEventListener("input", (e) => {
      const v = e.target.value || "";
      render(filterProjects(v));
    });
  }
})();

// === Subtle particle field background ===
(function(){
  const c = document.getElementById('bgParticles');
  if(!c) return;
  const ctx = c.getContext('2d');

  let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let W = 0, H = 0;
  function resize(){
    W = c.width  = Math.floor(innerWidth * DPR);
    H = c.height = Math.floor(innerHeight * DPR);
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  addEventListener('resize', resize);

  const N = 80;
  const P = Array.from({length: N}, () => ({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: 1 + Math.random()*1.8
  }));

  // Helper: get current theme color
  function getColor() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return isLight ? 'rgba(14,165,233,0.7)' : 'rgba(255,255,255,0.9)'; // blue for light, white for dark
  }

  function step(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    const color = getColor();

    // lines
    for (let i = 0; i < N; i++){
      for (let j = i + 1; j < N; j++){
        const dx = P[i].x - P[j].x;
        const dy = P[i].y - P[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140){
          ctx.globalAlpha = 1 - dist / 140;
          ctx.strokeStyle = color;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(P[i].x, P[i].y);
          ctx.lineTo(P[j].x, P[j].y);
          ctx.stroke();
        }
      }
    }

    // dots
    ctx.globalAlpha = 0.9;
    for (const p of P){
      p.x += p.vx; p.y += p.vy;
      if (p.x < -50) p.x = innerWidth + 50;
      if (p.x > innerWidth + 50) p.x = -50;
      if (p.y < -50) p.y = innerHeight + 50;
      if (p.y > innerHeight + 50) p.y = -50;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  // rerender color instantly when toggling theme
  const observer = new MutationObserver(() => {});
  document.getElementById("themeToggle")?.addEventListener("click", () => setTimeout(step, 100));
  step();
})();



