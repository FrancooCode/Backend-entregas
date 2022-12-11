import Product from "./src/Product.js";
import ProductManager from "./src/ProductManager.js";

const productManager = new ProductManager();

if (productManager.count < 10) {
  console.log(`ProductManager contiene ${productManager.count} productos actualmente.`);

  console.group('Creando productos ...');
  for (let i = 0; i < 35; i++) {
    const newProduct = new Product(
      `Producto ${productManager.nextProductId}`,
      `Descripción del Producto ${productManager.nextProductId}`,
      Math.floor((Math.random() * 95000) + 5000)/100,
      'No thumbnail',
      `CODE${productManager.nextProductId}`,
      Math.floor((Math.random() * 1000) + 100)
    );

    console.log('Creando producto con id %d', productManager.addProduct(newProduct));
  }
  console.groupEnd();

  console.log(`ProductManager ahora contiene ${productManager.count} productos almacenados.`);
} else {
  console.log(`ProductManager ya contiene ${productManager.count} productos almacenados.`);
}
