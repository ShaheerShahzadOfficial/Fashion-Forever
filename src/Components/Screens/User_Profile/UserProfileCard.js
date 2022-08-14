import React, { Fragment, useEffect } from 'react'
import { useSelector } from "react-redux"
import { Link, useHistory } from 'react-router-dom'
import Loader from '../../config/Loader/loader'
const UserProfileCard = () => {
    const { user, isAuthenticated, loading } = useSelector(state => state.Authentication)

    let history = useHistory()
    useEffect(() => {

        if (!isAuthenticated) {
            history.push("/login")
        }

    }, [history, isAuthenticated])


    return (
        <Fragment>

            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className='ProfileContainer'>
                        <div>
                            <h1>My Profile</h1>
                            <img src={user?.avatar && user?.avatar?.url} alt={user?.name} />
                            <Link to={"/updateProfile"} className="editProfile">Edit Profile</Link>
                        </div>

                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user?.name}</p>
                            </div>


                            <div>
                                <h4>Email</h4>
                                <p>{user?.email}</p>
                            </div>


                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user?.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to={"/Myorders"}>My Order</Link>
                                <Link to={"/UpdatePassword"}>Change Password</Link>
                            </div>

                        </div>

                    </div>
                </Fragment>
            )

            }
        </Fragment>
    )
}

export default UserProfileCard