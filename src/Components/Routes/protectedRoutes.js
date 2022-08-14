import React, { Fragment } from 'react'
import { useSelector } from "react-redux"
import { Redirect, Route } from 'react-router-dom'
const ProtectedRoutes = ({ isAdmin, component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.Authentication)

    return (

        <Fragment>
            {
                loading === false && (
                    <Route {...rest}
                        render={(props) => {
                            if (isAuthenticated === false) {
                                return <Redirect to={"/Login"} />
                            }

                            if (isAdmin === true && user.role !== "Admin") {
                                return <Redirect to={"/Login"} />
                            }

                            return <Component {...props} />
                        }} />
                )
            }
        </Fragment>

    )
}

export default ProtectedRoutes