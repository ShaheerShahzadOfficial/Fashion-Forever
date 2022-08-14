import "./dashboard.css"
import React, { useEffect } from 'react'
import Slider from './Slider/Slider'
import { Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from "react-redux"
import { GetAdminProduct } from "../../Components/Redux/Actions/ProductsActions"
import { AdminAllOrder } from "../../Components/Redux/Actions/OrderActions"
import { AdminAllUser } from "../../Components/Redux/Actions/UserActions"

Chart.register(...registerables);


const DashBoard = () => {

    const { products } = useSelector(state => state.products)
    const { order } = useSelector(state => state.orders)
    const { users } = useSelector(state => state.AllUser)


    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(AdminAllOrder())
        dispatch(GetAdminProduct())
        dispatch(AdminAllUser())

    }, [dispatch])

    let outOfStock = 0;

    products && products?.forEach(item => {
        if (item.Stock <= 0) {
            outOfStock += 1
        }
    });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, order && order?.reduce(
                    (acc, item) => acc + item.totalPrice,
                    0
                )],
                borderWidth: 1,
                borderColor: ["black"]

            },
        ],
    };


    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["cyan", "blue"],
                hoverBackgroundColor: ["darkcyan", "darkblue"],
                // products.length
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };





    return (
        <div className="dashboard">
            <Slider />
            <div className="dashboardContainer">
                <Typography component={"h1"}>DashBoard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p> Total Amount <br /> Rs {order && order?.reduce(
                            (acc, item) => acc + item.totalPrice,
                            0
                        )}  </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to={"/admin/Products"}>
                            <p>Products</p>
                            {/* Product Count */}
                            <p>{products && products?.length}</p>
                        </Link>

                        <Link to={"/admin/orders"}>
                            <p>Order</p>
                            {/* Orders Count */}
                            <p>{order && order?.length}</p>
                        </Link>

                        <Link to={"/admin/AllUsers"}>
                            <p>Users</p>
                            {/* Users Count */}
                            <p>{users && users?.length}</p>
                        </Link>
                    </div>
                </div>

                {/* <div className="lineChart">
                    <Line
                        data={lineState} />
                </div> */}

                <div className="lineChart">
                    <Line data={lineState}>

                    </Line>
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>

            </div>
        </div>

    )
}

export default DashBoard