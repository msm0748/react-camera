// CameraPage.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '../../lib/api';
import moment from 'moment';
import { IoIosFlash, IoIosFlashOff } from 'react-icons/io';
import { IoCameraReverseOutline } from 'react-icons/io5';
import MobileModal from './MobileModal';
import { cropImage } from '../../lib/cropImage';

export default function Mobile() {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const guideLineRef = useRef(null);
  const [guideLinePosition, setGuideLinePosition] = useState();
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [torchToggled, setTorchToggled] = useState(false); // 후레쉬

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (guideLineRef.current) {
      const guideLine = guideLineRef.current;
      const rect = guideLine.getBoundingClientRect();

      setGuideLinePosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [guideLineRef]);

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();

      try {
        const cropPhoto = await cropImage(photo, guideLinePosition);

        setImage(cropPhoto);
        openModal();
      } catch (error) {
        console.error('Error cropping image:', error);
        toast.error('Failed to crop image.');
      }
    }
  };

  const sendImageToBackend = () => {
    cropImage();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      <div>
        <Camera
          ref={cameraRef}
          aspectRatio="cover"
          facingMode="environment"
          numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
          errorMessages={{
            noCameraAccessible:
              'No camera device accessible. Please connect your camera or try a different browser.',
            permissionDenied:
              'Permission denied. Please refresh and give camera permission.',
            switchCamera:
              'It is not possible to switch camera to different one because there is only one video device accessible.',
            canvas: 'Canvas is not supported.',
          }}
        />
        {/* 촬영 가이드용 사각 박스 */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            ref={guideLineRef}
            className="border-4 border-green-white opacity-60 w-2/3 h-28"
          ></div>
        </div>
      </div>
      <div className="w-full flex justify-around items-center absolute bottom-10">
        <div>
          {cameraRef.current?.torchSupported ? (
            <button
              className="flex justify-center items-center"
              onClick={() => {
                if (cameraRef.current) {
                  setTorchToggled(cameraRef.current.toggleTorch());
                }
              }}
            >
              {torchToggled ? (
                <IoIosFlash size={40} />
              ) : (
                <IoIosFlashOff size={40} />
              )}
            </button>
          ) : (
            <div className="w-10 h-10"></div>
          )}
        </div>
        <div>
          <button
            onClick={handleCapture}
            className="p-1 border-black border-[4px] rounded-full"
          >
            <div className="w-6 h-6 bg-black rounded-full"></div>
          </button>
        </div>
        <div>
          <button
            className="flex justify-center items-center"
            disabled={numberOfCameras <= 1}
            onClick={() => {
              if (cameraRef.current) {
                const result = cameraRef.current.switchCamera();
                console.log(result);
              }
            }}
          >
            <IoCameraReverseOutline size={40} />
          </button>
        </div>
      </div>
      <MobileModal
        modalIsOpen={modalIsOpen}
        imgSrc={image}
        closeModal={closeModal}
      />
    </div>
  );
}
