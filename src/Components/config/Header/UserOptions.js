import React, { Fragment, useEffect, useState } from 'react'
import { Backdrop } from '@mui/material'
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDial from '@mui/material/SpeedDial';


import "./UserOptions.css"
import userpng from "../../Image/user.png"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { Logout } from '../../Redux/Actions/UserActions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const UserOptions = () => {




    const { user } = useSelector(state => state.Authentication)


    const { cartItem } = useSelector(state => state.cart)


    const [Open, setOpen] = useState(false)
    useEffect(() => {



    }, [])


    let history = useHistory()

    const order = () => {
        history.push("/Myorders")
    }



    const Profile = () => {
        history.push("/Account")

    }


    const dispatch = useDispatch()

    const logout = () => {
        dispatch(Logout())
        if (window.location.pathname === "/Account") {
            history.push("Login")
        }
    }

    const DashBoard = () => {
        history.push("/admin/DashBoard")


    }


    const cart = () => {
        history.push("/Cart")
    }


    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: order },
        { icon: <PersonIcon />, name: "Profile", func: Profile },
        { icon: <ShoppingCartIcon />, name: `Cart(${cartItem.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logout },
    ]


    if (user?.role === "Admin") {
        options.unshift(
            { icon: <DashboardIcon />, name: "DashBoard", func: DashBoard },
        )
    }



    return (

        <Fragment>
            {user ?
                <Fragment>
                    <Backdrop open={Open} style={{ zIndex: 11 }} />
                    <SpeedDial className='speedDial' ariaLabel={user?.name}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        open={Open}
                        direction="down"
                        style={{ zIndex: 11 }}

                        icon={<img src={user?.avatar ? user?.avatar?.url : userpng} alt={user?.name} className="speedDialIcon" />}>


                        {
                            options.map((item, i) => (
                                <SpeedDialAction key={i} icon={item.icon} tooltipTitle={item.name} tooltipOpen onClick={item.func}></SpeedDialAction>

                            ))
                        }

                    </SpeedDial>
                </Fragment>

                : null
            }
        </Fragment>
    )


}

export default UserOptions