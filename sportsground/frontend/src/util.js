import { getCartItems, getUserInfo } from "./localStorage.js";

export const parseRequestUrl=()=>{
    const url=document.location.hash.toLowerCase();
    const request=url.split("/");
    return{
        resource:request[1],
        id:request[2],
        verb:request[3],
    }
}

export const rerender = async(component)=>{
    document.getElementById('main-container').innerHTML=await component.render();
    await component.after_render();
}

export const ShowLoading=_=>{
    document.getElementById('loading-overlay').classList.add('active')
}

export const HideLoading=_=>{
    document.getElementById('loading-overlay').classList.remove('active')
}



export const showMessage=(message, callback)=>{
    document.getElementById("message-overlay").innerHTML=`
    <div> 
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-btn">ok</button>
    </div>
    `;
    document.getElementById("message-overlay").classList.add("active")
    document.getElementById("message-overlay-close-btn").addEventListener('click',_=>{
        document.getElementById("message-overlay").classList.remove("active")
        if(callback){
            callback();
        }
    })
}

export const redirectUser=_=>{
    if(getUserInfo().isAdmin){
        document.location.hash="/dashboard"
    }else{
        if(getCartItems().length === 0){
                document.location.hash="/shop"
            }else{
                document.location.hash="/shipping"
            }
    }
}