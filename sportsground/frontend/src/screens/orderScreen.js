import { getOrder, deliverOrder } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import {HideLoading, parseRequestUrl, rerender, ShowLoading, showMessage} from "../util.js";




export const orderScreen={
    after_render:async _=>{
        const request=parseRequestUrl();
        if(document.getElementById('deliver-order-btn')){
            document.getElementById('deliver-order-btn').addEventListener('click',async _=>{
                ShowLoading()
                await deliverOrder(request.id);
                HideLoading()
                showMessage("Order Deliverd")
                rerender(orderScreen)
            })
        }
    
    },
    render:async _=>{
        const {isAdmin}=getUserInfo()
       const request=parseRequestUrl();
       const {
           _id,
           shipping,
           payment,
           orderItems,
           itemsPrice,
           shippingPrice,
           taxPrice,
           totalPrice,
           isDelivered,
           deliveredAt,
           isPaid,
           paidAt,

       }=await getOrder(request.id)
        return`
        <h1 id="order_id" style="padding:1rem 2rem;"> Order #<br>${_id} </h1>
        <div class="placeorder-parent">
            <div class="place-order">
                <div class="place-order-info">
                    <div class="details-order">
                        <h2>Shipping</h2>
                        <div>
                            ${shipping.address},${shipping.city}
                            ,${shipping.postalcode},${shipping.country}
                        </div>
                        <div> Contact Number : ${shipping.contactnumber} </div>
                        ${isDelivered?`<div class="sucess"><h3>Delivered at</h3></div>${deliveredAt}`:`<div class="error"><h3>Not Delivered</h3></div>`}
                    </div>
                    <div class="details-order">
                        <h2>Payment</h2>
                        <div>
                            Payment Method : ${payment.paymentMethod}
                        </div>
                        ${isPaid
                        ?`<div class="sucess"><h3>Paid at${paidAt}</h3>`
                        :`<div class="error"><h3>Not Paid</h3></div>`}
                    </div>
                    <div class="details-order">
                        <ul class="place-order-list-container">
                            <li>
                            <h2>Shopping cart</h2>
                            <h2>Price</h2>
                            </li>
                            ${orderItems.map(item=>`
                                <li>
                                    <div class="cart-image">
                                        <image src="${item.image}" alt="${item.name}" />
                                    </div>
                                    <div class="place-order-cart-item">
                                        <div><a href="/#/product/${item.product}">${item.name}</a></div>
                                        <div>Qty:${item.qty}</div>
                                    </div>
                                    <div class="cart-price">
                                        ₹${item.price}
                                    </div>
                                </li>
                                
                            `).join("\n")}
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="order-action">
                <ul>
                <li id="Heading-order"><h2>Order Summary</h2></li>
                <li><div>Items price : </div> <div>${itemsPrice}</div></li>
                <li><div>Shipping :  </div><div>${shippingPrice}</div></li>
                <li><div>Tax : </div> <div>${taxPrice}</div></li>
                <li id="order-total"><div>Order Total : </div> <div>${totalPrice}</div></li><br>
                <li>
                    ${!isDelivered && isAdmin ? `<button id="deliver-order-btn" class="primary" >Delivered</button>` : `` }
                </li><br>
                <li>
                    ${!isPaid && isAdmin ? `<button id="paid-order-btn" class="primary" >Payment Received</button>` : `` }
                </li>
               
                </ul>
            </div>
        </div>
        `
    }
}

export default orderScreen