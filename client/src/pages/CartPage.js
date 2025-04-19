import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  const [auth, setauth] = useAuth();
  const [cart, setcart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setclientToken] = useState("");
  const [instance, setinstance] = useState("");
  const [loading, setloading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  //Total Price

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      // Apply discount if coupon is applied
      if (couponApplied) {
        total = total - total * discount;
      }
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Update Cart

  const updateCart = (myCart) => {
    setcart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  //Delete Item

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      updateCart(myCart); // Use updateCart instead of setcart
    } catch (error) {
      console.log(error);
    }
  };
  //get payment token

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );

      setclientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handleCoupon = () => {
    if (couponCode.toUpperCase() === "SRM10") {
      setDiscount(0.1); // 10% discount
      setCouponApplied(true);
      alert("Coupon applied successfully! 10% discount added.");
    } else {
      alert("Invalid coupon code!");
      setCouponCode("");
    }
  };

  const handlePayment = async () => {
    try {
      setloading(true);
      const { nonce } = await instance.requestPaymentMethod();
      let finalAmount = cart.reduce((total, item) => total + item.price, 0);
      if (couponApplied) {
        finalAmount = finalAmount - finalAmount * discount;
      }

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
          amount: finalAmount,
        }
      );
      setloading(false);
      localStorage.removeItem("cart");
      setcart([]);
      navigate("/dashboard/user/orders");
      alert("Payment Successful!");
    } catch (error) {
      console.log(error);
      setloading(false);
      alert("Payment Failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user.name},`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in Your Cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width={"100px"}
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                  <p>Price: ₹ {p.price}</p>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />

            {/* Add Coupon Section */}
            <div className="mb-3">
              <h4>Have a Coupon?</h4>
              <div className="d-flex justify-content-center gap-2 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleCoupon}
                  disabled={couponApplied}
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <div className="alert alert-success">
                  Coupon applied! 10% discount
                </div>
              )}
            </div>

            {/* Show original and discounted price */}
            <h4>
              {couponApplied && (
                <small className="text-muted text-decoration-line-through">
                  Original:{" "}
                  {cart
                    .reduce((total, item) => total + item.price, 0)
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                </small>
              )}
              <br />
              Final Total: {totalPrice()}
            </h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      card: {
                        vault: false, // Change this to false
                        cardholderName: {
                          required: true,
                        },
                      },
                      styles: {
                        input: {
                          "font-size": "16px",
                          "font-family": "Arial, sans-serif",
                        },
                      },
                    }}
                    onInstance={(instance) => setinstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing" : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
