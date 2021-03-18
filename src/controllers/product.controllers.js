
import Product from '../models/products.models'

export const createProduct = async (req , res)=>{

    const { name , category , price , imgURL} = req.body;
    console.log(name , category , price , imgURL)
    const newProduct = new Product({name , category , price , imgURL})

     const productSave = await newProduct.save();

    res
    .status(201)
    .json(productSave)
}

export const getProducts = async(req , res) => {
    
    const productos =  await Product.find();

    res.status(200).json(productos)

}

export const getProductsById = async (req , res) => {
    const product_id  = req.params.productId
    const producto =  await Product.findById(product_id)
    console.log(producto)
    res
    .status(200)
    .json(producto)
}

export const updateProductsById = async(req , res) => {

    const datos = req.body
    const product_id = req.params.productId;
    //const productUpdate = await Product.updateMany(product_id , {name : datos.name, category : datos.category , price : datos.price , imgURL : datos.imgURL});
    const productUpdate = await Product.findByIdAndUpdate(product_id , datos , {new : true});
    console.log(productUpdate);
    res.status(200).json(productUpdate)
}

export const deleteProductsById = async(req , res) => {

    const product_id = req.params.productId;
    const productDelete  = await Product.findByIdAndDelete(product_id);
    console.log(productDelete)
    res.status(200).json(productDelete);

}