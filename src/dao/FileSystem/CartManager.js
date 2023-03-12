import fs from 'fs';

export class CartManager {
  constructor(path) {
    this.path = path;
    CartManager.initFile(this.path);
  }

  async establecerID() {
    this.Carts = JSON.parse(await fs.promises.readFile(`${this.path}`, 'utf-8'));
    if(this.Carts.length === 0) {
        return 1;
    } else {
        let nextId = Math.max(...this.Carts.map(cart => cart.id)) + 1; 
        return nextId;
    }
  }

  static initFile(path) {
    if(!fs.existsSync(path)){
      fs.writeFileSync(`${path}`, JSON.stringify([]));
    }
  }

  async addCart(cart) {

    this.Carts = JSON.parse(await fs.promises.readFile(`${this.path}`, 'utf-8'));
    const id = await this.establecerID();
    cart = {id, ...cart};

    this.Carts = [...this.Carts, cart];

    await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.Carts));
    return "Carrito creado satisfactoriamente";
  }

  async addProductToCart(cid, pid, productToAdd) {

    this.Carts = JSON.parse(await fs.promises.readFile(`${this.path}`, 'utf-8'));

    if(this.Carts.some(cart => cart.id === parseInt(cid))){
      let index = this.Carts.findIndex(cart => cart.id === parseInt(cid));
    
      if(this.Carts[index].products.length > 0){
        let indexProd = this.Carts[index].products.findIndex(product => product.id === parseInt(pid));
        if(this.Carts[index].products.some(product => product.id === parseInt(pid))){
          this.Carts[index].products[indexProd].quantity = productToAdd.quantity;
          await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.Carts));
          return 'Cantidad del producto actualizado en el carrito';
  
        }else{
          this.Carts[index].products.push(productToAdd);
          await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.Carts));
          return 'Producto agregado al carrito';
        }
      }
      
      
    }else{
      return 'Carrito no encontrado';
    }
  }


  async getCarts() {

    try {
      this.Carts = JSON.parse(await fs.promises.readFile(`${this.path}`, 'utf-8'));
      return this.Carts;
    } catch (error) {
      return error.message;
    }
  }

  async getCartById(id) {

    this.Carts = JSON.parse(await fs.promises.readFile(`${this.path}`, 'utf-8'));
    const cart = this.Carts.find(cart => cart.id === parseInt(id)) || 'Cart not found';
    return cart;
  }

  async updateCart(id, fields) {

    // this.Carts = JSON.parse(await fs.promises.readFile(`${this.path}`, 'utf-8'));

    // if(this.Carts.some(cart => cart.id === parseInt(id))){
    //   let index = this.Carts.findIndex(cart => cart.id === parseInt(id));
    //   this.Carts[index].product = fields.product;
    //   this.Carts[index].quantity = fields.quantity;
    //   await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.Carts));
    //   return 'Carrito actualizado';
    // }else{
    //   return 'Carrito no encontrado';
    // }
  }

  async deleteCart(id) {
    this.Carts = JSON.parse(await fs.promises.readFile(`${this.path}`, 'utf-8'));
    if (this.Carts.some(cart => cart.id === parseInt(id))) {
      this.Carts = this.Carts.filter(cart => cart.id !== parseInt(id));
      await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.Carts));
      return 'Carrito eliminado';
    } else {
      return 'Carrito no encontrado';
    }
  }
}


