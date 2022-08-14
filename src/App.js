import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './Components/config/NavBar/Header';

import Footer from './Components/config/Footer/Footer';
import CopyRight from './Components/config/Footer/CopyRight';
import Home from './Components/Screens/Home/Home';
import ProductDetails from "./Components/Screens/Products/ProductDetails"
import SignUp from './Components/Screens/Authentication/SignUpForm/SignUp';
import SignIn from './Components/Screens/Authentication/SignIn/SignIn';
import ForgotPassword from './Components/Screens/Authentication/ForgotPassword/ForgotPassword';
import Cart from './Components/Screens/Cart/AddToCart';
import Products from "./Components/Screens/Filter/Product"
import Search from "./Components/Screens/Search/Search"
import User_Profile from './Components/Screens/User_Profile/User_Profile';
import React, { useEffect } from 'react';
import { LoadUser } from './Components/Redux/Actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import UserOptions from "./Components/config/Header/UserOptions"
import ProtectedRoutes from './Components/Routes/protectedRoutes';
import UpdateUserProfile from './Components/Screens/UpdateUserProfile/UpdateUserProfile';
import UpdateUserPassword from './Components/Screens/UpdateUsersPassword/UpdatePassword';
import { ClearError } from './Components/Redux/Actions/ProductsActions';
import ResetUsersPassword from './Components/Screens/Authentication/ResetPassword/ResetPassword';
import ShippingInfo from "./Components/Screens/ShippingInfo/SaveShippingInfo"
import MyOrders from "./Components/Screens/MyOrders/MyOrders.js"
import MyOrderDetail from "./Components/Screens/MyOrders/MyOrderDetail.js"
import Confirmation from './Components/Screens/ConfirmedOrder/Confirmation.js';
import DashBoard from './Admin/DashBoard/DashBoard';
import AllProducts from './Admin/Products/AllProducts';
import AddNewProduct from './Admin/Products/AddNewProduct';
import UpdateProduct from './Admin/Products/UpdateProduct/UpdateProduct';
import UserList from './Admin/Users/UserList';
import UpdateUser from './Admin/Users/Update/updateUser';
import OrdersList from './Admin/Orders/OrdersList';
import UpdateOrder from './Admin/Orders/UpdateOrder/UpdateOrder';
function App() {
  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(state => state.Authentication)

  useEffect(() => {
    dispatch(LoadUser())
    dispatch(ClearError())
  }, [dispatch])


  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions />}

      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/product/:id"} component={ProductDetails} />
        <Route exact path={"/Register"} component={SignUp} />
        <Route exact path={"/Login"} component={SignIn} />
        <Route exact path={"/ForgotPassword"} component={ForgotPassword} />
        <Route exact path={"/Cart"} component={Cart} />
        <Route exact path={"/products"} component={Products} />
        <Route path={"/products/:keyword"} component={Products} />
        <Route exact path={"/Search"} component={Search} />
        <Route path={"/user/resetPassword/:token"} component={ResetUsersPassword} />
        <ProtectedRoutes exact path={"/Account"} component={User_Profile} />
        <ProtectedRoutes exact path={"/updateProfile"} component={UpdateUserProfile} />
        <ProtectedRoutes exact path={"/UpdatePassword"} component={UpdateUserPassword} />
        <ProtectedRoutes exact path={"/shipping"} component={ShippingInfo} />
        <ProtectedRoutes exact path={"/order/confirm"} component={Confirmation} />
        <ProtectedRoutes exact path={"/Myorders"} component={MyOrders} />
        <ProtectedRoutes exact path={"/orderDetail/:id"} component={MyOrderDetail} />


        <ProtectedRoutes isAdmin={true} exact path={"/admin/DashBoard"} component={DashBoard} />
        <ProtectedRoutes isAdmin={true} exact path={"/admin/Products"} component={AllProducts} />
        <ProtectedRoutes isAdmin={true} exact path={"/admin/product"} component={AddNewProduct} />
        <ProtectedRoutes isAdmin={true} exact path={"/admin/UpdateProduct/:id"} component={UpdateProduct} />
        <ProtectedRoutes isAdmin={true} exact path={"/admin/AllUsers"} component={UserList} />
        <ProtectedRoutes isAdmin={true} exact path={"/admin/UpdateUser/:id"} component={UpdateUser} />
        <ProtectedRoutes isAdmin={true} exact path={"/admin/orders"} component={OrdersList} />
        <ProtectedRoutes isAdmin={true} exact path={"/admin/UpdateOrder/:id"} component={UpdateOrder} />
      </Switch>

      {/* UpdateOrder */}


      <Footer />
      <CopyRight />
    </Router>
  );

}

export default App
