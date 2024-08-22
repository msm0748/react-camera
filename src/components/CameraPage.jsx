// CameraPage.js
import React, { useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
// import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CameraPage = () => {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  const handleCapture = () => {
    const photo = cameraRef.current.takePhoto();
    setImage(photo);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full h-80">
        <Camera
          ref={cameraRef}
          aspectRatio="cover"
          numberOfCamerasCallback={setNumberOfCameras}
        />
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

      <button
        disabled={numberOfCameras <= 1}
        onClick={() => {
          if (cameraRef.current) {
            const result = cameraRef.current.switchCamera();
            console.log(result);
          }
        }}
      >
        체인지
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
