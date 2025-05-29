import products from "./models/productschema.js"

//File to add multiple data of products in products collection using insertmany() method. 
//All data has to in array and we can insert that array using insertmany() method.



const productsdata = [
    {
      "name": "Wireless Mouse",
      "price": 19.99,
      "description": "Ergonomic wireless mouse with adjustable DPI settings.",
      "stockQuantity": 120
    },
    {
      "name": "Mechanical Keyboard",
      "price": 59.99,
      "description": "Backlit mechanical keyboard with blue switches.",
      "stockQuantity": 75
    },
    {
      "name": "USB-C Hub",
      "price": 24.99,
      "description": "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.",
      "stockQuantity": 200
    },
    {
      "name": "Webcam 1080p",
      "price": 39.99,
      "description": "HD webcam with noise reduction microphone.",
      "stockQuantity": 45
    },
    {
      "name": "Bluetooth Speaker",
      "price": 29.99,
      "description": "Portable speaker with 10-hour battery life and water resistance.",
      "stockQuantity": 90
    },
    {
      "name": "Gaming Monitor",
      "price": 199.99,
      "description": "24-inch full HD gaming monitor with 144Hz refresh rate.",
      "stockQuantity": 30
    },
    {
      "name": "External Hard Drive",
      "price": 79.99,
      "description": "1TB USB 3.0 external hard drive for backup and storage.",
      "stockQuantity": 60
    },
    {
      "name": "Wireless Earbuds",
      "price": 49.99,
      "description": "True wireless earbuds with charging case and touch controls.",
      "stockQuantity": 150
    },
    {
      "name": "Smartwatch",
      "price": 89.99,
      "description": "Fitness tracking smartwatch with heart rate monitor and GPS.",
      "stockQuantity": 40
    },
    {
      "name": "Laptop Stand",
      "price": 27.50,
      "description": "Adjustable aluminum laptop stand for desk setups.",
      "stockQuantity": 110
    }
  ]


  export async function seedDB(){
    await products.insertMany(productsdata);
    console.log('DB seeded');
  }