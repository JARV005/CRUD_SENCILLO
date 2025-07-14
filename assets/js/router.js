function showView(view) {
  const app = document.getElementById("app");
  if (view === "login") showLogin(app);
  if (view === "register") showRegister(app);
  if (view === "app") showApp(app);
}

window.addEventListener("hashchange", () => {
  const route = location.hash.replace("#", "") || "login";
  showView(route);
});
