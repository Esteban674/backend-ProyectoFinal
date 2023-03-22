const navbar = document.querySelector('nav');
const categorySelect = document.querySelector('#category');
const limitSelect = document.querySelector('#limit');
const sortSelect = document.querySelector('#sort');

const navLinks = document.querySelectorAll('nav a');
let category = '';

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    category = link.dataset.category;
    fetchProducts();
  });
});

limitSelect.addEventListener('change', fetchProducts);
sortSelect.addEventListener('change', fetchProducts);

function fetchProducts() {
  const limit = limitSelect.value;
  const sort = sortSelect.value;
  const page =  1;
  const url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=${sort}&category=${category}`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const products = data.payload;
      const pagination = data;

      renderProducts(products, pagination);
    })
    .catch(error => console.error(error));
}

function renderProducts(products, pagination) {

  const context = {
    products: products,
    pagination: pagination,
    category: category
  };

  if (products.length > 0) {
    const source = document.getElementById("products-template").innerHTML;
    console.log(source);
    const template = Handlebars.compile(source);
    const html = template(context);
    document.querySelector('#products-container').innerHTML = html;
  } else {
    document.querySelector('#products-container').innerHTML = "No se encontraron productos.";
  }
}

