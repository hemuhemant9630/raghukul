import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import { Prices } from "./../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [cart, updateCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllProducts(); // Load all products by default
  }, []);

  // Filter products
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (checked.length || radio.length) filteredProduct();
  }, [checked, radio]);

  // Get filtered products
  const filteredProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Shop - Raghukul Enterprises"}>
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Filter Sidebar */}
          <div className="col-md-3">
            <div className="filters-container">
              <h4 className="filters-header">Refine Results</h4>
              
              {/* Category Filter */}
              <div className="filter-section">
                <h5 className="filter-section-title">Categories</h5>
                <div className="filter-options">
                  {categories?.map((c) => (
                    <label key={c._id} className="filter-checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      />
                      <span>{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-section">
                <h5 className="filter-section-title">Price Range</h5>
                <div className="filter-options">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <div key={p._id} className="price-radio">
                        <Radio value={p.array}>₹{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>

              {/* Reset Filters Button */}
              <button 
                className="reset-filter-btn"
                onClick={() => {
                  setChecked([]);
                  setRadio([]);
                  getAllProducts();
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-md-9">
            <h4 className="text-center mb-4">All Products</h4>
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-4 mb-4" key={p._id}>
                  <div className="card product-card h-100">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text fw-bold">₹ {p.price}</p>
                      <div className="mt-auto">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            updateCart([...cart, p]);
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
