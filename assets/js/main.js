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

