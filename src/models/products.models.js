import {Schema , model}from 'mongoose'

 const productSchema = new Schema({
    name :String,
    category : String,
    price : Number ,
    imgURL: String,
},{
    timestamps :true , // esto es para que apararezcan dos campos mas el que indica la fecha de creacion , y el la ultima actualización ,
    versionKey : false,//esto es para que cada vez que se crea un nuevo dato no aparezca el __v de versio
})


export default model('Product' , productSchema);

