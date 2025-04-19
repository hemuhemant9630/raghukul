import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={'Privacy Policy - Raghukul Enterprises'}>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center mb-4">Privacy Policy</h1>
            <div className="privacy-content">
              <h5>1. Information We Collect</h5>
              <p>
                At Raghukul Enterprises, we collect information that helps us provide and improve our services for university students:
                - Personal information (name, email, phone number)
                - Delivery addresses (hostel/apartment details)
                - Order history
                - Payment information (processed securely through our payment gateway)
              </p>

              <h5>2. How We Use Your Information</h5>
              <p>
                We use your information to:
                - Process and deliver your orders
                - Send order updates and notifications
                - Improve our product offerings
                - Provide customer support
                - Send relevant promotional materials (with your consent)
              </p>

              <h5>3. Information Security</h5>
              <p>
                We implement industry-standard security measures to protect your data:
                - Secure payment processing
                - Encrypted data transmission
                - Limited access to personal information
                - Regular security updates
              </p>

              <h5>4. Information Sharing</h5>
              <p>
                We never sell your personal information. We only share your information with:
                - Delivery partners (for order fulfillment)
                - Payment processors
                - Service providers who assist our operations
              </p>

              <h5>5. Your Rights</h5>
              <p>
                You have the right to:
                - Access your personal information
                - Update or correct your details
                - Request deletion of your account
                - Opt out of marketing communications
              </p>

              <h5>6. Contact Us</h5>
              <p>
                For any privacy-related concerns, please contact us at:
                <br />
                Email: hemantraghuwanshi821@gmail.com
                <br />
                Phone: 7240804368
              </p>

              <div className="mt-4">
                <p className="text-muted">
                  Last updated: April 17, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Policy