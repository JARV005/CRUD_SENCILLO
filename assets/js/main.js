document.addEventListener("DOMContentLoaded", () => {
  const route = location.hash.replace("#", "") || "login";
  showView(route);
});
