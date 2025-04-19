import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart"; // <-- Add this import

const ProductDetails = () => {
  const params = useParams();
  const [product, setproduct] = useState({});
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [cart, setcart] = useCart(); // <-- Add this line

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setproduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setrelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
        
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={300}
            width={"300px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Desription : {product.description}</h6>
          <h6>Price : ₹ {product.price}</h6>
          <h6>Category : "{product?.category?.name}"</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setcart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h1> Similar Products</h1>
        {relatedProducts.length < 1 && <p className="text-center">No Similar Products Found</p>}
      <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h4 className="card-title">{p.name}</h4>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <h6 className="card-text">{p.category.name}</h6>
                  <p className="card-text">$ {p.price}</p>
                  <button className="btn btn-secondary ms-1"
                    onClick={() => {
                      setcart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    }}
                  >ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
