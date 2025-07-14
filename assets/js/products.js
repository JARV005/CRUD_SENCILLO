function showLogin(container) {
  container.innerHTML = `
    <h2>Iniciar sesión</h2>
    <form id="loginForm">
      <input type="email" class="form-control mb-2" id="loginEmail" placeholder="Correo" required />
      <input type="password" class="form-control mb-2" id="loginPassword" placeholder="Contraseña" required />
      <button class="btn btn-primary">Ingresar</button>
      <button type="button" class="btn btn-link" id="toRegister">¿No tienes cuenta?</button>
    </form>
  `;

  document.getElementById("toRegister").addEventListener("click", () => location.hash = "register");

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    const res = await fetch(`${API}/users?email=${email}&password=${password}`);
    const data = await res.json();
    if (data.length > 0) {
      saveUserSession(data[0]);
      location.hash = "app";
    } else {
      alert("Credenciales incorrectas");
    }
  });
}

function showRegister(container) {
  container.innerHTML = `
    <h2>Registro</h2>
    <form id="registerForm">
      <input type="email" class="form-control mb-2" id="registerEmail" placeholder="Correo" required />
      <input type="password" class="form-control mb-2" id="registerPassword" placeholder="Contraseña" required />
      <button class="btn btn-success">Registrarse</button>
      <button type="button" class="btn btn-link" id="toLogin">¿Ya tienes cuenta?</button>
    </form>
  `;

  document.getElementById("toLogin").addEventListener("click", () => location.hash = "login");

  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = registerEmail.value;
    const password = registerPassword.value;
    await fetch(`${API}/users`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    });
    alert("Registro exitoso");
    location.hash = "login";
  });
}

function showApp(container) {
  const user = getUserSession();
  if (!user) {
    location.hash = "login";
    return;
  }

  container.innerHTML = `
    <div class="d-flex justify-content-between mb-3">
      <h2>Mis Productos</h2>
      <button class="btn btn-danger" id="logout">Cerrar sesión</button>
    </div>
    <form id="productForm">
      <input class="form-control mb-2" id="nombre" placeholder="Nombre" required />
      <input class="form-control mb-2" id="precio" placeholder="Precio" type="number" required />
      <input class="form-control mb-2" id="categoria" placeholder="Categoría" required />
      <textarea class="form-control mb-2" id="descripcion" placeholder="Descripción" required></textarea>
      <input type="hidden" id="productId" />
      <button class="btn btn-primary">Guardar producto</button>
    </form>
    <div id="productList" class="row mt-4"></div>
  `;

  document.getElementById("logout").addEventListener("click", logout);

  document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = productId.value;
    const producto = {
      userId: user.id,
      nombre: nombre.value,
      precio: precio.value,
      categoria: categoria.value,
      descripcion: descripcion.value
    };

    if (id) {
      await fetch(`${API}/products/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(producto)
      });
    } else {
      await fetch(`${API}/products`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(producto)
      });
    }

    productForm.reset();
    cargarProductos(user.id);
  });

  cargarProductos(user.id);
}

async function cargarProductos(userId) {
  const res = await fetch(`${API}/products?userId=${userId}`);
  const productos = await res.json();
  const lista = document.getElementById("productList");
  lista.innerHTML = "";
  productos.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">${p.descripcion}</p>
          <p><strong>Categoría:</strong> ${p.categoria}</p>
          <p><strong>Precio:</strong> $${p.precio}</p>
          <button class="btn btn-sm btn-warning me-2 edit-btn" data-id="${p.id}">Editar</button>
          <button class="btn btn-sm btn-danger delete-btn" data-id="${p.id}">Eliminar</button>
        </div>
      </div>
    `;
    lista.appendChild(col);
  });

  // Agregar eventos después de que los botones están en el DOM
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const producto = productos.find(p => p.id == id);
      editarProducto(producto);
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => { 
      const id = btn.getAttribute("data-id");
      await fetch(`${API}/products/${id}`, { method: "DELETE" });
      cargarProductos(userId);
    });
  });
}

function editarProducto(p) {
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("precio").value = p.precio;
  document.getElementById("categoria").value = p.categoria;
  document.getElementById("descripcion").value = p.descripcion;
  document.getElementById("productId").value = p.id;
}