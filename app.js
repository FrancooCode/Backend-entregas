import Product from "./src/Product.js";
import ProductManager from "./src/ProductManager.js";

// Se creará una instancia de la clase “ProductManager”
console.log('/*************************** INICIO DE LA PRUEBA 1 ***************************/');
console.log('PRUEBA 1: Se creará una instancia de la clase “ProductManager”');
const productManager = new ProductManager();
if (productManager) {
  console.log('Se creó una nueva instancia de la clase "ProductManager"');
}
console.log('/**************************** FIN DE LA PRUEBA 1 *****************************/\n');


// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log('/*************************** INICIO DE LA PRUEBA 2 ***************************/');
console.log('PRUEBA 2: Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []');
console.log('productManager.getProducts():', productManager.getProducts());
console.log('/**************************** FIN DE LA PRUEBA 2 *****************************/\n');


// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
console.log('/*************************** INICIO DE LA PRUEBA 3 ***************************/');
console.group('PRUEBA 3: Se llamará al método “addProduct” con los campos:');
console.log('title: “producto prueba”,');
console.log('description:”Este es un producto prueba”,');
console.log('price:200,');
console.log('thumbnail:”Sin imagen”,');
console.log('code:”abc123”,');
console.log('stock:25');
console.groupEnd();
console.log('El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE.');
console.log(
  'productManager.addProduct(), generated ProductId:',
  productManager.addProduct(
    new Product(
      "producto prueba",
      "Este es un producto prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    )
  )
);
console.log('/**************************** FIN DE LA PRUEBA 3 *****************************/\n');

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log('/*************************** INICIO DE LA PRUEBA 4 ***************************/');
console.log('PRUEBA 4: Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado');
console.log('productManager.getProducts():', productManager.getProducts());
console.log('/**************************** FIN DE LA PRUEBA 4 *****************************/\n');

// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
console.log('/*************************** INICIO DE LA PRUEBA 5 ***************************/');
console.log('PRUEBA 5: Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado...');
console.log('productManager.getProductById(1):', productManager.getProductById(1));
console.log('...en caso de no existir, debe arrojar un error.');
try {
  console.log('productManager.getProductById(42):', productManager.getProductById(42));
} catch(err) {
  console.error('Falló la recuperación del producto con id = 42');
  console.error(err);
}
console.log('/**************************** FIN DE LA PRUEBA 5 *****************************/\n');

// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto,
// se evaluará que no se elimine el id y que sí se haya hecho la actualización.
console.log('/*************************** INICIO DE LA PRUEBA 6 ***************************/');
console.log('PRUEBA 6: Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto');
try {
  console.log('const updateProduct = new Product(');
  console.log('\t"producto actualizado",');
  console.log('\t"Este es un producto prueba actualizado",');
  console.log('\t420,');
  console.log('\t"Imagen no disponible",');
  console.log('\t"321cba",');
  console.log('\t69');
  console.log(');');
  const updatedProduct = new Product(
    'producto actualizado',
    'Este es un producto prueba actualizado',
    420,
    'Imagen no disponible',
    '321cba',
    69
  );
  console.log('productManager.updateProduct(1, updatedProduct)');
  if (productManager.updateProduct(1, updatedProduct)) {
    console.log('¡Operación exitosa!');
    console.log('se evaluará que no se elimine el id y que sí se haya hecho la actualización.');
    console.log('productManager.getProductById(1):', productManager.getProductById(1));
    console.log('productManager.getProducts():', productManager.getProducts());
  }
} catch (err) {
  console.error('Falló la prueba!');
  console.error(err);
}
console.log('/**************************** FIN DE LA PRUEBA 6 *****************************/\n');

// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto
// o que arroje un error en caso de no existir.
console.log('/*************************** INICIO DE LA PRUEBA 6 ***************************/');
console.log('PRUEBA 7: Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.');
try {
  console.log('productManager.deleteProduct(1), devuelve la cantidad de productos que quedan después de la eliminación:', productManager.deleteProduct(1));
  console.log('La segunda vez que se llame el mismo método, con el mismo parámetro, debe fallar:');
  console.log('productManager.deleteProduct(1)', productManager.deleteProduct(1));
} catch (err) {
  console.error(err);
}
console.log('/**************************** FIN DE LA PRUEBA 7 *****************************/\n');
