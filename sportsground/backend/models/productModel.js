import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    brand:{type:String, required:true},
    image:{type:String, required:true},
    image2:{type:String, required:true},
    image3:{type:String, required:true},
    image4:{type:String, required:true},
    stock:{type:Number, default:0.0, required:true},
    price:{type:Number, default:0.0, required:true},
    rating:{type:Number, default:0.0, required:true},
    reviews:{type:Number, default:0.0, required:true},
},{timestamps:true})

const Product=mongoose.model('product',productSchema);
export default Product;