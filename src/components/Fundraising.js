import React, { useState, useEffect } from 'react';
import { storage, ref, getDownloadURL } from './firebaseConfig'; // Adjust the path as needed

const Fundraising = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const fetchQrCodeUrl = async () => {
      try {
        const qrCodeRef = ref(storage, 'path/to/your/qr_code_image.png'); // Adjust the path as needed
        const url = await getDownloadURL(qrCodeRef);
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error fetching QR code URL:', error);
      }
    };

    fetchQrCodeUrl();
  }, []);

  return (
    <div>
      <h1>Support Fundraising</h1>
      <p>Contribute to or receive funds through our community efforts.</p>
      {qrCodeUrl ? <img src={qrCodeUrl} alt="Fundraising QR Code" /> : <p>Loading QR code...</p>}
    </div>
  );
};

export default Fundraising;
