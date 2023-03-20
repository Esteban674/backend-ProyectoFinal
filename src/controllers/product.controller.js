import { getManagerProducts } from "../dao/daoManager.js";

const data = await getManagerProducts();
const managerProducts = new data.ManagerProductMongoDB;


export const productController = {

  getAllProducts: async (req, res) => {

    try {
      let { limit, page, sort, query } = req.query;
      let result = {};
      let queryObj = query? JSON.parse(query) : {};
      let options = {
        limit: limit ? parseInt(limit) : 10,
        page: page ? parseInt(page) : 1,
        sort: sort ? { price: parseInt(sort) } : {}
      };
      managerProducts.setConnection();
      let resultQuery = await managerProducts.model.paginate(queryObj, options);

      result = {
        status: "success",
        payload: resultQuery.docs,
        totalPages: resultQuery.totalPages,
        prevPage: resultQuery.prevPage || null,
        nextPage: resultQuery.nextPage || null,
        page: resultQuery.page,
        hasPrevPage: resultQuery.hasPrevPage,
        hasNextPage: resultQuery.hasNextPage,
        prevLink: resultQuery.hasPrevPage != false ? `http://localhost:8080/api/products?limit=${options.limit}&page=${parseInt(options.page) - 1}&query=${query !== undefined? query : '{}'}&sort=${options.sort.price ? options.sort.price : 1}` : null,
        nextLink: resultQuery.hasNextPage != false ? `http://localhost:8080/api/products?limit=${options.limit}&page=${parseInt(options.page) + 1}&query=${query !== undefined? query : '{}'}&sort=${options.sort.price ? options.sort.price : 1}` : null
      };
  
      res.status(200).json(result);
  
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  ,

  getProductById: async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await managerProducts.getElementById(pid);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  },
  addProduct: async (req, res) => {
    try {
      const { title, description, price, thumbnail, code, stock, status, category } = req.body;
      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      };
      const product = await managerProducts.addElement(newProduct);
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { pid } = req.params;
      const { title, description, price, thumbnail, code, stock, status, category } = req.body;
      const updatedProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      };
      const product = await managerProducts.updateElement(pid, updatedProduct);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await managerProducts.deleteElement(pid);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  },
};

