export default class Product {

    id;

    constructor(title, description, price, thumbnail, stock, code, category, status = true) {
        Product.validate(title, description, price, thumbnail, stock, code, category, status);
        this.title = title.trim();
        this.description = description.trim();
        this.price = price;
        this.thumbnail = thumbnail.trim();
        this.stock = stock;
        this.code = code.trim().toUpperCase();
        this.category = category.trim().toUpperCase();
        this.status = status;
    }
   
    setId(id) {
        this.id = id;
    }

    static validate(title, description, price, thumbnail, stock, code, category, status) {
        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new Error('Title is not valid');
        }
        if (typeof description !== 'string' || description.trim().length === 0) {
            throw new Error('Description is not valid');
        }
        if (typeof price !== 'number' || price <= 0) {
            throw new Error('Price is not valid');
        }
        if (typeof thumbnail !== 'string' || thumbnail.trim().length === 0) {
            throw new Error('Thumbnail is not valid');
        }
        if (typeof stock !== 'number' || stock <= 0) {
            throw new Error('Stock is not valid');
        }
        if (typeof code !== 'string' || code.trim().length === 0) {
            throw new Error('Code is not valid');
        }
        if (typeof category !== 'string' || category.trim().length === 0) {
            console.log(typeof category)
            throw new Error('Category is not valid');
        }
        if (typeof status !== 'boolean') {
            throw new Error('Status is not valid');
        }
    }
}