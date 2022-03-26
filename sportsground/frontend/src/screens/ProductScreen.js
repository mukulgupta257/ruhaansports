import { getProduct } from "../api.js";
import {HideLoading, parseRequestUrl, ShowLoading} from "../util.js"
import Rating from "../component/Rating.js"

const ProductScreen={
    after_render: _=>{
        const request=parseRequestUrl();
        document.getElementById('add-button').addEventListener('click',_=>{
            document.location.hash = `/cart/${request.id}`;
        })
        document.getElementById('image').addEventListener("click",_=>{
            document.getElementById('product-img').src=document.getElementById('image').src
        })
        document.getElementById('image2').addEventListener("click",_=>{
            document.getElementById('product-img').src=document.getElementById('image2').src
        })
        document.getElementById('image3').addEventListener("click",_=>{
            document.getElementById('product-img').src=document.getElementById('image3').src
        })
        document.getElementById('image4').addEventListener("click",_=>{
            document.getElementById('product-img').src=document.getElementById('image4').src
        })
    },
    render: async _=>{
        const request=parseRequestUrl();
        ShowLoading();
        const product = await getProduct(request.id);
        if(product.error){
            return `<div>${product.error}</div>`;
        }
        HideLoading();
        return`
        <div class="back-to-result">
            <a href='/#/shop'>Back to results</a>
        </div>
        <div class='content'>
        <div class="image-sidebar">
        <img src="${product.image}" alt="${product.name}" id="image">
        <img src="${product.image2}" alt="${product.name}" id="image2">
        <img src="${product.image3}" alt="${product.name}" id="image3">
        <img src="${product.image4}" alt="${product.name}" id="image4">

        </div>
            <div class="details">
                <div class="detail-img">
                <img src="${product.image}" alt="${product.name}" id="product-img"/>
                </div>
                <div class="details-info">
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({value:product.rating, text: `${product.reviews} Reviews` })} 
                        </li>
                        <li>
                            Price : <strong>₹ ${product.price}</strong>
                        </li>
                        <li>
                            Description:
                            <div>
                                ${product.description}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="detail-action">
                <ul>
                    <li>
                        Price: ₹ ${product.price}
                    </li>
                    <li>
                        Status: ₹ ${product.stock > 0 ? `<span class="sucess">Available</span> `: `<span class="error"> Out of Stock </span>`}
                    </li>
                    <li class="btn-li">
                        <div> <button id='add-button' class='${product.stock==0?`hidden-btn`:`primary`}'>Add to cart</button> </div>
                    </li>
                </ul>
            </div>
        </div>
        `
        
    }
}

export default ProductScreen