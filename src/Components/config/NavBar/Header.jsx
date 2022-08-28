
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import logo from "../../Image/logo.png"

import React from 'react'
import { ReactNavbar } from "overlay-navbar"
const Header = () => {
    return (
        <ReactNavbar
            burgerColor="black"
            logo={logo}
            navColor1="#079AE7"
            logoWidth="20vmax"
            link1Size="30px"
            logoTransition="1"
            logoAnimationTime="2"
            link1Text="Home"
            link1Color="white"
            // link1ColorHover="blue"
            // link2ColorHover="purple"
            // link3ColorHover="purple"
            // link4ColorHover="purple"
            link2Text=" "
            link4Text="  "
            link3Text="Products"
            link1Url="/"
            link3Url="/products"
            link1Margin="2vmax"
            link2Margin="2vmax"
            link3Margin="2vmax"
            link4Margin="2vmax"
            searchIcon={true}
            SearchIconElement={AiOutlineSearch}
            searchIconColor="white"
            searchIconSize="3vmax"
            searchIconMargin="0.5vmax"
            // searchIconColorHover="black"
            cartIcon={true}
            CartIconElement={AiOutlineShoppingCart}
            cartIconSize="3vmax"
            cartIconColor="white"
            cartIconMargin="0.5vmax"
            // cartIconColorHover="black"
            profileIcon={true}
            ProfileIconElement={AiOutlineUser}
            profileIconSize="3vmax"
            profileIconColor="white"
            profileIconMargin="0.5vmax"
            // profileIconColorHover="black"
            profileIconUrl="/Login"
        />
    )
}

export default Header