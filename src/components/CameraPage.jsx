// CameraPage.js
import React, { useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
// import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CameraPage = () => {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleCapture = () => {
    const photo = cameraRef.current.takePhoto();

    console.log(photo);
    setImage(photo);
    const croppedImage = cropImage(photo);
    // console.log(croppedImage);
    sendImageToBackend(photo);
  };

  const sendImageToBackend = async (imageData) => {
    try {
      //   const response = await axios.post('/api/upload', { image: imageData });
      //   toast.success(response.data.message);
    } catch (error) {
      toast.error('Image upload failed');
    }
  };

  const cropImage = (imageSrc) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const aspectRatio = 2 / 3;
    const targetWidth = image.width * (2 / 3);
    const targetHeight = image.height * (2 / 3);
    const offsetX = (image.width - targetWidth) / 2;
    const offsetY = (image.height - targetHeight) / 2;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.drawImage(
      image,
      offsetX,
      offsetY,
      targetWidth,
      targetHeight,
      0,
      0,
      targetWidth,
      targetHeight
    );

    return canvas.toDataURL('image/jpeg');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full h-80">
        <Camera ref={cameraRef} aspectRatio="cover" facingMode="environment" />
        {/* 촬영 가이드용 사각 박스 */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="border-4 border-green-500 w-2/3 h-2/3"></div>
        </div>
      </div>
      <button
        onClick={handleCapture}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg z-50"
      >
        Capture Image
      </button>

      {image && (
        <div className="mt-4 z-50">
          <img src={image} alt="Captured" className="w-40 h-40 object-cover" />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default CameraPage;
