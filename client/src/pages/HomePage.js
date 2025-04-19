import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "./../components/Prices";
import { useNavigate, Link } from "react-router-dom"; // Add Link here
import { useCart } from "../context/cart";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, updateCart] = useCart(); // Now destructuring updateCart
  const [auth, setauth] = useAuth();
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [checked, setchecked] = useState([]);
  const [radio, setradio] = useState([]);
  const [total, settotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);

  //Get All categories
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setcategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    gettotal();
  }, []);

  //get Products

  const getAllProducts = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setloading(false);
      setproducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  //gettotal count
  const gettotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      settotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setloading(false);
      setproducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
    }
  };

  //filter by cat

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setchecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filteredProduct();
  }, [checked, radio]);

  //get Filtered Product

  const filteredProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setproducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Raghukul Enterprises - Home"}>
      {/* Hero Slider - Add this before purple background section */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>
        
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img 
              src="/images/slider1.png" 
              className="d-block w-100 slider-image" 
              alt="New Semester Essentials"
            />
          </div>
          <div className="carousel-item">
            <img 
              src="/images/slider2.png" 
              className="d-block w-100 slider-image" 
              alt="Student Special Offers"
            />
          </div>
          <div className="carousel-item">
            <img 
              src="/images/slider3.png" 
              className="d-block w-100 slider-image" 
              alt="Campus Life"
            />
          </div>
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="home-banner" style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #ab5924 100%)",
        padding: "50px 0",
        color: "white"
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold mb-4">Welcome to Raghukul Enterprises</h1>
              <p className="lead mb-4">Your one-stop shop for all university essentials</p>
              <Link to="/categories" className="btn btn-light btn-lg">
                Shop Now
              </Link>
            </div>
            <div className="col-md-6">
              <img 
                src="/images/students.jpeg"
                alt="University Life"
                className="img-fluid rounded shadow"
                style={{ 
                  maxHeight: "400px", 
                  width: "100%", 
                  objectFit: "cover" 
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Parallax Section with Video Background */}
      <div className="parallax-section">
        <div className="video-background">
          <video autoPlay loop muted>
            <source src="/videos/homevdo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="parallax-content">
          <h2>Student Life Made Easier</h2>
          <p>From hostel essentials to study materials, we've got everything you need for a successful academic journey.</p>
          <Link to="/categories" className="parallax-button">
            Explore Products
          </Link>
        </div>
      </div>

      {/* Feature Banners - Add this after parallax section */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-banner">
              <div className="feature-content">
                <i className="fas fa-truck mb-3"></i>
                <h3>Free Delivery</h3>
                <p>On orders above ₹999</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-banner">
              <div className="feature-content">
                <i className="fas fa-id-card mb-3"></i>
                <h3>Student Discounts</h3>
                <p>Extra 10% off with ID</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-banner">
              <div className="feature-content">
                <i className="fas fa-headset mb-3"></i>
                <h3>24/7 Support</h3>
                <p>Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
