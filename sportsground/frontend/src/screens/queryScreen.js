import {deleteQuery, getQuery, getQueryByID } from "../api.js";
import DashboardMenu from "../component/DashboardMenu.js"
import { rerender, showMessage } from "../util.js";

const queryListScreen={
    after_render:async _=>{
        let viewquery=document.getElementsByClassName('view-query-btn')
        viewquery=Array.from(viewquery).forEach(viewbutton=>{
            viewbutton.addEventListener('click',async _=>{
                    const queries= await getQueryByID(viewbutton.id);
                    showMessage(queries.message)
            })
        })
        let deletequery=document.getElementsByClassName('delete-product-btn')
        deletequery=Array.from(deletequery).forEach((deletebtn)=>{
            deletebtn.addEventListener('click',async _=>{
                if(confirm("this will delete query")){
                const del= await deleteQuery(deletebtn.id);
                }
                rerender(queryListScreen)
            })

        })
        
    },
    render:async _=>{
        const queries= await getQuery();
        return`
        <div class="dashboard">
        ${DashboardMenu.render({selected:'queries'})}
        <div class="dashboard-content">
        <h1>Queries</h1>
        <div class="product-list">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                ${queries.map(query=>`
                    <tr>
                        <td>${query.name}</td>
                        <td>${query.email}</td>
                        <td>${query.phonenumber}</td>
                        <td>${query.subject}</td>
                        <td>${query.message}</td>
                        <td>
                        <button id=${query._id} class="view-query-btn">View</button>
                        <button id=${query._id} class="delete-product-btn">Delete</button>
                        </td>
                    </tr>
                `).join("\n")}
                </tbody>
            </table>
        </div>
    </div>
    </div>
        `
    }
}

export default queryListScreen