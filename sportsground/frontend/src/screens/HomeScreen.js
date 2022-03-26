import { getProducts } from "../api.js";
import Rating from "../component/rating.js";

const HomeScreen ={
    render:async _=>{
        const products=await getProducts();
        if(products.error){
            return`<div class="error">${err.message}`;
        }
        return`
        <div class="shop-banner">
            <div class="black-layer center">
                <span> Cricket Shop</span>
            </div>
        </div>
        <div id="shop">
            <ul class="products">
            ${products.map (product=>`
                <li>
                    <div class="product">
                        <a href="#/product/${product._id}">
                            <img src="${product.image}" alt="${product.name}" />
                        </a>
                        <div class="product-name">
                            <a href="#/product/${product._id}">${product.name}</a>
                        </div>
                        <div class="product-rating">    
                        ${Rating.render({value:product.rating, text:product.reviews + 'reviews'})}
                        </div>
                        <div class="product-brand">
                        ${product.brand}
                        </div>
                        <div class="product-price">
                        ₹ ${product.price}
                        </div>
                    </div>
                </li>
            `).join('\n')}
            </ul>
        </div>
        `
    }
}

export default HomeScreen