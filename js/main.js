const table = document.getElementById("productsTable");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const pageInfo = document.getElementById("pageInfo");

let skip = 0;
const limit = 10;
let filtros = {};

function cargarProductos() {
  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  if (filtros.busqueda) {
    url = `https://dummyjson.com/products/search?q=${filtros.busqueda}`;
  }

  if (filtros.categoria) {
    url = `https://dummyjson.com/products/category/${filtros.categoria}`;
  }

  if (filtros.ordenar) {
    url += `?sortBy=${filtros.ordenar.campo}&order=${filtros.ordenar.tipo}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderizarTabla(data.products.slice(0, limit));
      pageInfo.textContent = `Página ${skip / limit + 1}`;
    });
}

function renderizarTabla(productos) {
  table.innerHTML = "";
  productos.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td><img src="${p.thumbnail}"></td>
        <td>${p.title}</td>
        <td>$${p.price}</td>
        <td>${p.category}</td>
        <td>
          <button onclick="editarProducto(${p.id})">Editar</button>
          <button onclick="eliminarProducto(${p.id}, this)">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function cargarCategorias() {
  fetch("https://dummyjson.com/products/category-list")
    .then(res => res.json())
    .then(data => {
      data.forEach(cat => {
        categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      });
    });
}

function editarProducto(id) {
  const titulo = prompt("Nuevo título:");
  const precio = prompt("Nuevo precio:");

  if (!titulo || !precio) return;

  fetch(`https://dummyjson.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: titulo, price: precio })
  })
  .then(() => {
    alert("Producto actualizado");
    cargarProductos();
  });
}

function eliminarProducto(id, btn) {
  if (!confirm("¿Eliminar producto?")) return;

  fetch(`https://dummyjson.com/products/${id}`, { method: "DELETE" })
    .then(() => {
      btn.closest("tr").remove();
      alert("Producto eliminado");
    });
}

document.getElementById("searchBtn").onclick = () => {
  filtros.busqueda = searchInput.value;
  skip = 0;
  cargarProductos();
};

categorySelect.onchange = () => {
  filtros.categoria = categorySelect.value;
  skip = 0;
  cargarProductos();
};

document.getElementById("sortSelect").onchange = e => {
  const [campo, tipo] = e.target.value.split("-");
  filtros.ordenar = { campo, tipo };
  cargarProductos();
};

document.getElementById("nextBtn").onclick = () => {
  skip += limit;
  cargarProductos();
};

document.getElementById("prevBtn").onclick = () => {
  if (skip >= limit) skip -= limit;
  cargarProductos();
};

cargarCategorias();
cargarProductos();
