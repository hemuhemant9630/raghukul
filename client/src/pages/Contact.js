import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";

const Contact = () => {
  return (
    <Layout title={"Contact us - Raghukul Enterprises"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about products feel free to call anytime. We are available 24X7
          </p>
          <p className="mt-3">
            <BiMailSend /> : hemantraghuwanshi821@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 7240804368
          </p>
          <p className="mt-3">
            <BsWhatsapp /> : 7240804368
          </p>
          <p className="mt-3 text-center">
            Thanks,<br />
            Team Raghukul Enterprises
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;