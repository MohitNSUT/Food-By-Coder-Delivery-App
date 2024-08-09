import React, { useState } from 'react';
import './payment.css';
import $ from 'jquery';

const EcommerceWebsiteDownload = () => {
  const [formVisible, setFormVisible] = useState(true);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQrCode = () => {
    setFormVisible(false);
    const link = `upi://pay?pa=6398245926@pytes&am=1500&tn=${number}`;
    const upi = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${link}`;
    setQrCode(upi);
  };

  const handleDownload = () => {
    if (number && name && email && id) {
      // Handle download logic here
    } else {
      alert("Fill all fields correctly");
    }
  };

  return (
    <section>
      <h1>ECOMMERCE WEBSITE CODE</h1>
      {formVisible ? (
        <div className="form">
          <div className="flex m20">
            <label>Full Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="m10 name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex m20">
            <label>Whatsapp Number(With ISD)*</label>
            <input
              type="text"
              name="phone"
              placeholder="Ex- +919064973840"
              className="m10 number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="flex m20">
            <label>Email*</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="m10 email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex m20">
            <button className="generate_qr" onClick={generateQrCode}>
              NEXT
            </button>
          </div>
        </div>
      ) : (
        <div className="qr_code m20">
          <p>Scan the QR Code with any UPI App and pay the amount then download the source code.</p>
          <center>
            <img src={qrCode} alt="QR CODE" className="get_qr m10" />
          </center>
          <center>
            <img src="1.png" className="im m10" alt="Ecommerce" />
          </center>
          <div className="flex m20">
            <label>UTR/REFERENCE/TRANSACTION ID**</label>
            <input
              type="number"
              name="id"
              placeholder="UTR/REFERENCE/TRANSACTION ID**"
              className="m10 id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <button className="download_now m20" onClick={handleDownload}>
            Download Now
          </button>
        </div>
      )}
    </section>
  );
};

export default EcommerceWebsiteDownload;
