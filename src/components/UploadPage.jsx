// UploadPage.js
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const UploadPage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      sendImageToBackend(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const sendImageToBackend = async (imageData) => {
    try {
      const response = await axios.post('/api/upload', { image: imageData });
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Image upload failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded" className="w-40 h-40 object-cover" />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default UploadPage;
