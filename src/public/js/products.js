const productsContainer = document.getElementById("products-container");
const productsTemplate = document.getElementById("products-template").innerHTML;
const limitSelect = document.getElementById("limit");
const sortSelect = document.getElementById("sort");
const categoryLinks = document.querySelectorAll("[data-category]");

let page = 1;
let limit = limitSelect.value;
let sort = sortSelect.value;
let category = "";
let currentPage;

function renderProducts(products) {
  const data = {
    products: products.payload,
    pagination: products,
    category: category,
    currentPage: currentPage
  };
  console.log(data);
  const html = Handlebars.compile(productsTemplate)(data);
  productsContainer.innerHTML = html;
}

function fetchProducts() {
  const url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=${sort}&category=${category}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      currentPage = data.page;
      renderProducts(data);
    })
    .catch(error => console.error(error));
}

limitSelect.addEventListener("change", () => {
  limit = limitSelect.value;
  page = 1;
  fetchProducts();
});

sortSelect.addEventListener("change", () => {
  sort = sortSelect.value;
  page = 1;
  fetchProducts();
});

categoryLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    category = link.getAttribute("data-category");
    page = 1;
    fetchProducts();
  });
});

fetchProducts();
