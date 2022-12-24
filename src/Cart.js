export class Cart {

    id;

    constructor(products) {
        this.products = products;
    }
   
    setId(id) {
        this.id = id;
    }
}