export class Product {
    public id?: string;
    public productname: string;
    public desc: string;
    public price: number;
    public brand: string;
    public imagePath: string;
    constructor(id: string, productname: string, desc: string, price: number, brand: string,  imagePath: string) {
        this.id = id;
        this.productname = productname;
        this.desc = desc;
        this.price = price;
        this.brand = brand;
        this.imagePath = imagePath;
    }
}