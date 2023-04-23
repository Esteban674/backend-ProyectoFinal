import { getManagerProducts } from "../dao/daoManager.js";

const data = await getManagerProducts();
export const managerProducts = new data.ManagerProductMongoDB;

export const getAllProducts = async (query) => {
  let { limit, page, sort, category } = query;
  let result = {};
  let categoryObj = category ? { category: category } : {};
  let options = {
    limit: limit ? parseInt(limit) : 10,
    page: page ? parseInt(page) : 1,
    sort: sort ? { price: parseInt(sort) } : {},
  };
  managerProducts.setConnection();
  let resultQuery = await managerProducts.model.paginate(categoryObj, options);

  result = {
    status: "success",
    payload: resultQuery.docs,
    totalPages: resultQuery.totalPages,
    prevPage:
      resultQuery.prevPage || null,
    nextPage:
      resultQuery.nextPage || null,
    page: resultQuery.page,
    hasPrevPage: resultQuery.hasPrevPage,
    hasNextPage: resultQuery.hasNextPage,
    prevLink:
      resultQuery.hasPrevPage != false
        ? `http://localhost:8080/api/products?limit=${options.limit}&page=${
            parseInt(options.page) - 1
          }&category=${category !== undefined ? category : "{}"}&sort=${
            options.sort.price ? options.sort.price : 1
          }`
        : null,
    nextLink:
      resultQuery.hasNextPage != false
        ? `http://localhost:8080/api/products?limit=${options.limit}&page=${
            parseInt(options.page) + 1
          }&category=${category !== undefined ? category : "{}"}&sort=${
            options.sort.price ? options.sort.price : 1
          }`
        : null,
  };
  return result;
};

export const getProductById = async (pid) => {
  const product = await managerProducts.getElementById(pid);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const addProduct = async (newProduct) => {
  const product = await managerProducts.addElement(newProduct);
  return product;
};

export const updateProduct = async (pid, updatedProduct) => {
  const product = await managerProducts.updateElement(pid, updatedProduct);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const deleteProduct = async (pid) => {
  const product = await managerProducts.deleteElement(pid);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};
