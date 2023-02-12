

const socket = io();

socket.emit('mensaje', "Hola me estoy conectando")

socket.on('evento-admin', datos => {
  console.log(datos)
})



socket.on('ListProducts', products => {
  document.getElementById('realTimeProductsContainer').innerHTML = updateList(products);
});

updateList = (products) => {
  const realTimeProductsTemplate = `
  <div id="realTimeProducts-template" type="text/x-handlebars-template" class="table-resposive">
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Thumbnail</th>
          <th scope="col">Code</th>
          <th scope="col">Stock</th>
          <th scope="col">Status</th>
          <th scope="col">Category</th>
        </tr>
      </thead>
      <tbody>
        {{#each productsReal}}
        <tr>
          <th scope="row">{{id}}</th>
          <td>{{this.title}}</td>
          <td>{{this.description}}</td>
          <td>{{this.price}}</td>
          <td>
            <div class="sizeThumbnails text-break">{{this.thumbnail}}</div>
          </td>
          <td>{{this.code}}</td>
          <td>{{this.stock}}</td>
          <td>{{this.status}}</td>
          <td>{{this.category}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </div>
  `
  let template = Handlebars.compile(realTimeProductsTemplate);
  let html = template({ productsReal: products });
  return html;
};

