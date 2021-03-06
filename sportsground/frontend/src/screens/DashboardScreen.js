import { getSummary } from "../api.js";
import DashboardMenu from "../component/DashboardMenu.js"


let summary={};
const dashboardScreen={
    render:async _=>{
        summary=await getSummary();
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected:'dashboard'})}
        <div class="dashboard-content">
            <h1>Dashboard</h1>
            <ul class="summary-dashboard">
                <li>
                    <div class="summary-title">
                        <span class="material-icons">
                        people
                        </span>
                        <span> Users on Website </span>
                    </div>
                    <div class="summary-body">
                        ${summary.user[0].numUsers}
                    </div>
                </li>
                <li>
                    <div class="summary-title">
                        <span class="material-icons">
                            payments
                        </span>
                        <span>Total Sale amount</span>
                    </div>
                    <div class="summary-body">
                    ₹ ${summary.order[0].totalprice}
                    </div>
                </li>
                <li>
                    <div class="summary-title">
                    <span class="material-icons">
                    local_shipping
                    </span>
                        <span> Total Orders </span>
                    </div>
                    <div class="summary-body">
                    ${summary.order[0].numOrders}
                    </div>
                </li>
            </ul>
        </div>
        </div>
        `
    }
}

export default dashboardScreen