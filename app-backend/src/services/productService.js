const mongooseProduct = require("../models/productModel");
const { redisCon } = require('../utils/redis')

async function getAll(){
  const key = "showcase";
  try{
      const client = await redisCon(); //redis bağlantısı
      const getShowcase = await client.get(key);
      if(getShowcase === null){
          const getProduct = await mongooseProduct.find();
          await client.set(key,JSON.stringify(getProduct))
          console.log('hala veritabanından alıyorum')
          return getProduct;
      }else{
          console.log('ben redise düştüm');
          return JSON.parse(getShowcase)
      }
  }catch(e){
      console.log(e);
      return false;
  }
}
async function getSingle(params) {
  const id = params.id;
  try {
    const getProduct = await mongooseProduct.findById(id);
    return getProduct;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function create(params) {
  const { name, description, price, stock, image } = params;
  const key = "showcase"; // Cache anahtarı

  try {
    const newProduct = new mongooseProduct({
      name,
      description,
      price,
      stock,
      image,
    });
    await newProduct.save();

    // Redis cache'i temizle
    const client = await redisCon();
    await client.del(key);
    console.log(`Cache temizlendi: ${key}`);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function update(params) {
  const { id, name, description, price, stock, image } = params;
  const key = "showcase"; // Cache anahtarı

  try {
    const product = await mongooseProduct.findById(id);
    if (!product) {
      console.log(`Ürün bulunamadı, ID: ${id}`);
      return false;
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.image = image;

    const productSave = await product.save();
    console.log(productSave);

    // Redis cache'i temizle
    const client = await redisCon();
    await client.del(key);
    console.log(`Cache temizlendi: ${key}`);

    return productSave;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function deleteProduct(params) {
  const id = params;
  const key = "showcase"; // Cache anahtarı

  try {
    const productDelete = await mongooseProduct.findByIdAndDelete(id);

    if (productDelete) {
      const client = await redisCon();
      await client.del(key);
      console.log(`Cache temizlendi: ${key}`);
    } else {
      console.log(`Ürün bulunamadı, ID: ${id}`);
    }

    return productDelete;
  } catch (e) {
    console.error(e);
    return false;
  }
}

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  deleteProduct,
};
