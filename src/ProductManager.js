import Product from "./Product.js";
import { writeFileSync, readFileSync, existsSync } from 'fs';

export default class ProductManager {
  static #lastProductId;

  static #defaultPersistFilePath = './ProductManager.json';

  static #persistFileOptions = {
    encoding: 'utf-8',
  };

  #products = [];

  constructor(persistFilePath) {
    this.path = (persistFilePath ?? ProductManager.#defaultPersistFilePath);
    this.#init();
  }

  /**
   
   * @param {Product} product - El producto que va a agregarse a la colección.
   */
  addProduct = (product) => {
    if(!this.#products.some(p => p.code === product.code)) {
      product.id = ProductManager.#getNewProductId();

      this.#products.push(product);

      this.#persist();

      return product.id;
    }

    throw new Error(`There is already a product with code ${product.code}.`);
  }

  /**
    @param {int} productId 
    @param {Product} updateProduct 
    @returns 
    @throws 
   */
  updateProduct = (productId, updateProduct) => {
    const productFoundIndex = this.#products.findIndex(product => product.id === productId);

    if (productFoundIndex !== -1) {
      const newProduct = new Product(
        updateProduct.title,
        updateProduct.description,
        updateProduct.price,
        updateProduct.thumbnail,
        updateProduct.code,
        updateProduct.stock
      );

      newProduct.id = productId;

      this.#products = [
        ...this.#products.slice(0, productFoundIndex),
        newProduct,
        ...this.#products.slice(productFoundIndex + 1)
      ];

      this.#persist();

      return true;
    } else {
      throw new Error(`No product was updated. Product with id ${productId} was not found.`);
    }
  }

  /**
   * @param {int} productId 
   * @returns 
   * @throws 
   */
  deleteProduct = (productId) => {
    const productFoundIndex = this.#products.findIndex(product => product.id === productId);

    if (productFoundIndex !== -1) {
      this.#products = [
        ...this.#products.slice(0, productFoundIndex),
        ...this.#products.slice(productFoundIndex + 1)
      ];

      this.#persist();

      return this.#products.length;
    } else {
      throw new Error(`No product was deleted. Product with id ${productId} was not found.`);
    }
  }

  /**
   *
   * @returns  Ahi nos devuelve la colección de productos.
   */
  getProducts = () => {
    return this.#products;
  }

  /**
   * @param {int} productId 
   * @returns 
   */
  getProductById = (productId) => {
    const foundProduct = this.#products.find(product => product.id === productId);

    if (foundProduct) return foundProduct;

    throw new Error(`Product with id ${productId} was not found.`);
  }

  getProductByCode = (productCode) => {
    const foundProduct = this.#products.find(product => product.code === productCode.trim().toUpperCase());

    if (foundProduct) return foundProduct;

    throw new Error(`Product with code ${productCode} was not found.`);
  }

  /**
    @returns 
   */
  getPersistPath = () => this.path;


  #init = () => {
    if (existsSync(this.getPersistPath())) {
      const fileReader = readFileSync(this.getPersistPath(), ProductManager.#persistFileOptions);
      const persistedProductManager = JSON.parse(fileReader);

      ProductManager.#setLastProductId(persistedProductManager.lastProductId);

      this.#setProducts(persistedProductManager.products.map(product => {
        const managedProduct = new Product(
          product.title,
          product.description,
          product.price,
          product.thumbnail,
          product.code,
          product.code
        );

        managedProduct.id = product.id;

        return managedProduct;
      }));
    } else {
      ProductManager.#lastProductId = 0;
    }
  }

  #setProducts = (products) => {
    this.#products = [...products];

    return this.#products.length;
  }

  /**
   * @returns a stringified object ready to be saved.
   */
  #getPersistObject = () => {
    const persistObject = {};
    persistObject.lastProductId = ProductManager.getLastProductId();
    persistObject.products = this.getProducts();

    return JSON.stringify(persistObject);
  }


  #persist = () => {
    writeFileSync(this.getPersistPath(), this.#getPersistObject(), ProductManager.#persistFileOptions);
  }

  /**
    @returns 
   */
   static getLastProductId = () => {
    return ProductManager.#lastProductId;
  }

  /**
    @returns a new Product Id.
   */
  static #getNewProductId = () => {
    return ++ProductManager.#lastProductId;
  }

  /**
   * @param {int} value
   * @returns 
   */
  static #setLastProductId = (value) => {
    if (value && value >= 0) {
      ProductManager.#lastProductId = value;
      return ProductManager.#lastProductId;
    }

    return 0;
  }
}
