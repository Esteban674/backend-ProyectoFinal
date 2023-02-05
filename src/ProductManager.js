import fs from 'fs';

class Product {
  static _id = 1;
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = Product._id++;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  };
}

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    ProductManager.initFile(this.path);
  }

  static initFile(path) {
    if(!fs.existsSync(path)){
      fs.writeFileSync(`${path}`, JSON.stringify([]));
    }
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    //verifica que esten completos todos los campos
    if (!(title && description && price && thumbnail && code && stock)) {
      console.log('Es obligatorio completar todos los campos');
      return;
    };

    this.products = [...this.products, new Product(title, description, price, thumbnail, code, stock)];

    await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.products));
  }

  async getProducts() {

    try {
      const lectura = await fs.promises.readFile(`${this.path}`, 'utf-8');
      this.products = JSON.parse(lectura);
      // console.log(this.products);
      return this.products;
    } catch (error) {
      console.log(error.message);
      console.log([]);
    }
  }

  async getProductById(id) {

    const lectura = await fs.promises.readFile(`${this.path}`, 'utf-8');
    this.products = JSON.parse(lectura);
    const product = this.products.find(product => product.id === id) || 'Product not found';
    // console.log(product);
    return product;
  }

  async updateProduct(id, fields) {

    const lectura = await fs.promises.readFile(`${this.path}`, 'utf-8');
    this.products = JSON.parse(lectura);
    let product = this.products.find(product => product.id === id) || 'Product not found';
    let productUpdated = { ...product, ...fields }
    this.products = [productUpdated, ...this.products.filter(product => product.id !== id)];
    // console.log(this.products);
    await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.products));

  }

  async deleteProduct(id) {
    const lectura = await fs.promises.readFile(`${this.path}`, 'utf-8');
    this.products = JSON.parse(lectura);
    if (this.products.some(product => product.id === id)) {
      this.products = this.products.filter(product => product.id !== id);
      await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.products));
    } else {
      console.log('El id ingresado no pertenece a un producto existente');
    }
  }
}


//Creamos una instancia de ProductManager
const ProductManager1 = new ProductManager('./src/productos.txt');

export default ProductManager1;

//COMENTAR DESPUES DE CADA USO DE LAS LLAMADAS

//Llamamos al metodo getProducts
// ProductManager1.getProducts();



//Llamamos al metodo addProdcuts
// ProductManager1.addProduct('Samsung Galaxy S22', 'Samsung Galaxy S22 Ultra 5G 256GB', 365999, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672237493/productos/200x310/70009797_xm5efx.webp', 'SM-S908E', 8);

// ProductManager1.addProduct('Motorola Edge 30', 'Motorola Edge 30 Fusion 5G 256GB', 199999, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672237764/productos/200x310/70010681_mrgve5.webp', 'XT-22431', 12);

// ProductManager1.addProduct('Samsung Galaxy S21', 'Samsung Galaxy S21 Fan Edition 5G 128GB', 194999, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672237992/productos/200x310/70009819_sezq5k.webp', 'SM-G990E', 18);

// ProductManager1.addProduct('Moto G200 5G', 'Moto G200 5G 108 mpx con flash Dual LED', 116799, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672238048/productos/200x310/70009850_xk8qfc.webp', 'XT2175-1', 12);

// ProductManager1.addProduct('Samsung Galaxy Tab S8', 'Samsung Galaxy Tab S8 Plus WiFi', 339999, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672238084/productos/200x310/7004649_fuwtha.webp', 'SM-8700N', 7);

// ProductManager1.addProduct('Lenovo Yoga', 'Lenovo Yoga Tab 13 WiFi 128GB', 142999, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672238110/productos/200x310/7004493_riibbm.webp', 'YT-K606F', 10);

// ProductManager1.addProduct('Samsung Galaxy Tab S6', 'Samsung Galaxy Tab S6 Lite WiFi', 117999, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672238163/productos/200x310/7004681_y70nxx.webp', 'SM-X200', 8);

// ProductManager1.addProduct('Lenovo Tab P11', 'Lenovo Tab P11 WiFi 128GB con Teclado', 86999, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672238201/productos/200x310/7004492_vvdtrj.webp', 'TB-J606F', 15);

// ProductManager1.addProduct('Samsung Galaxy A13', 'Samsung Galaxy A13 128GB', 54399, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672238242/productos/200x310/70010089_y1tazn.webp', 'SM-A135M', 9);

// ProductManager1.addProduct('Moto E32 64GB', 'Moto E32 64GB 16 mpx con Flash LED', 43999, 'https://res.cloudinary.com/dmehzrcf1/image/upload/v1672238287/productos/200x310/70010259_cwscml.webp', 'XT2227-1', 11);




// Llamamos nuevamente al metodo getProducts
// ProductManager1.getProducts();



//Llamamos al metodo getProductsById
// ProductManager1.getProductById(2);


//Llamamos al metodo updateProduct
// ProductManager1.updateProduct(1, {title:'producto modificado', price:123});

//Llamamos al metodo deleteProduct
// ProductManager1.deleteProduct(3);


