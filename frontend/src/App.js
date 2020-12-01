import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/UI/header/Header";
import Footer from "./components/UI/footer/Footer";
import HomePage from "./pages/homePage/HomePage";
import ProductPage from "./pages/productPage/ProductPage";
import CartPage from "./pages/cartPage/CartPage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import ShippingPage from "./pages/shippingPage/ShippingPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import PlaceOrderPage from "./pages/placeOrderPage/PlaceOrderPage";
import OrderPage from "./pages/orderPage/OrderPage";

// admin pages
import UserListPage from "./pages/adminPages/userPages/userListPage/UserListPage";
import UserEditPage from "./pages/adminPages/userPages/userEditPage/UserEditPage";
import ProductListPage from "./pages/adminPages/productPages/productListPage/ProductListPage";
import ProductEditPage from "./pages/adminPages/productPages/productEditPage/ProductEditPage";
import OrderListPage from "./pages/adminPages/orderPages/orderListPage/OrderListPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/order/:id" component={OrderPage} />
          <Route exact path="/placeorder" component={PlaceOrderPage} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route exact path="/shipping" component={ShippingPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/product/:id" component={ProductPage} />
          <Route exact path="/cart/:id?" component={CartPage} />
          <Route exact path="/admin/userlist" component={UserListPage} />
          <Route exact path="/admin/user/:id/edit" component={UserEditPage} />
          <Route exact path="/admin/productlist" component={ProductListPage} />
          <Route
            exact
            path="/admin/productlist/:pageNumber"
            component={ProductListPage}
          />
          <Route
            exact
            path="/admin/product/:id/edit"
            component={ProductEditPage}
          />
          <Route exact path="/admin/orderlist" component={OrderListPage} />
          <Route exact path="/search/:keyword" component={HomePage} />
          <Route exact path="/page/:pageNumber" component={HomePage} />
          <Route
            exact
            path="/search/:keyword/page/:pageNumber"
            component={HomePage}
          />
          <Route exact path="/" component={HomePage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
