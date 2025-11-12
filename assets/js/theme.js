(function(){
  const root = document.documentElement;
  const key = "theme";
  function set(theme){ root.setAttribute("data-theme", theme); localStorage.setItem(key, theme); }
  const saved = localStorage.getItem(key);
  if (saved) set(saved);
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    set(current === "light" ? "dark" : "light");
  });
})();