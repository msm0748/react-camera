import React, { useState, useRef } from 'react';
import { Camera } from 'react-camera-pro';

export default function CameraComponent() {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const handleTakePhoto = async () => {
    try {
      const photo = await camera.current.takePhoto();
      setImage(photo);
      // console.log(camera.current.switchCamera());
    } catch (error) {
      console.error('Error taking photo: ', error);
    }
  };

  return (
    <div className="w-dvw h-dvh relative">
      <Camera ref={camera} facingMode="environment" />
      <div className="border-4 absolute z-50 w-80 h-80 top-20 left-0 right-0 mx-auto border-red-500"></div>
      <button className="absolute z-50" onClick={handleTakePhoto}>
        Take Photo
      </button>
      {image && <img src={image} alt="" />}
    </div>
  );
}
