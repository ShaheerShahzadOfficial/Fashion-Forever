import React, { Fragment } from 'react'
import MetaData from '../../../MetaData'
import UserProfileCard from './UserProfileCard'
import "./UserProfileCard.css"
const User_Profile = () => {
    return (

        <Fragment>
            <MetaData title={"User Profile"} />


            <UserProfileCard />


        </Fragment>

    )
}

export default User_Profile