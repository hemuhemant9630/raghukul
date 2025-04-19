import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
  return (
    <Layout title={'About Us - Raghukul Enterprises'}>
      <div className="container mt-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img 
              src="/images/students.jpeg"  // Make sure this matches your image filename
              alt="College Students"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '520px', width: '100%', objectFit: 'cover' }}  // Changed from 400px to 420px
            />
          </div>
          <div className="col-md-6">
            <h1 className="mb-4">About Raghukul Enterprises</h1>
            <p className="lead">Your One-Stop Shop for University Essentials</p>
            <p>
              Welcome to Raghukul Enterprises, a startup born from understanding the unique needs
              of university students. We know that transitioning to university life comes with its
              own set of challenges, which is why we've created a platform that makes accessing
              essential items easier and more affordable.
            </p>
            <p>
              Founded in 2024, we specialize in providing:
            </p>
            <ul>
              <li>Hostel Essentials - From bedding to storage solutions</li>
              <li>Study Materials - Everything you need for academic success</li>
              <li>Personal Care Items - Quality products at student-friendly prices</li>
              <li>Electronics - Essential gadgets for modern education</li>
            </ul>
            <p>
              Our mission is to make university life easier by providing quality products
              at affordable prices, with convenient delivery right to your hostel or
              apartment. We understand student budgets and offer special discounts and
              deals throughout the academic year.
            </p>
            <p className="text-muted mt-3">
              For any queries, reach out to us at hemantraghuwanshi821@gmail.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;