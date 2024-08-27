// CameraPage.js
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '../../lib/api';
import moment from 'moment';

export default function Mobile() {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const guideLineRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [guideLinePosition, setGuideLinePosition] = useState();
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [torchToggled, setTorchToggled] = useState(false); // 후레쉬

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((i) => i.kind === 'videoinput');
      setDevices(videoDevices);
    })();
  });

  const handleCapture = () => {
    const photo = cameraRef.current.takePhoto();

    setImage(photo);
    setGuideLine();
  };

  const setGuideLine = async () => {
    const guideLine = guideLineRef.current;

    const guideLineX = guideLine.offsetLeft;
    const guideLineY = guideLine.offsetTop;
    const guideLineWidth = guideLine.offsetWidth;
    const guideLineHeight = guideLine.offsetHeight;

    setGuideLinePosition({
      x: guideLineX,
      y: guideLineY,
      width: guideLineWidth,
      height: guideLineHeight,
    });
  };

  const sendImageToBackend = () => {
    cropImage();
  };

  const cropImage = () => {
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
      console.log(guideLinePosition);
      // Canvas 크기 설정
      canvas.width = img.width;
      canvas.height = img.height;

      // 이미지를 캔버스에 그리기
      ctx.drawImage(img, 0, 0);

      // 자를 영역 설정
      const x = guideLinePosition.x; // X 좌표
      const y = guideLinePosition.y; // Y 좌표
      const width = guideLinePosition.width; // 자를 폭
      const height = guideLinePosition.height; // 자를 높이

      // 자른 영역의 이미지 데이터 얻기
      const imageData = ctx.getImageData(x, y, width, height);

      // 새 캔버스에 자른 이미지 그리기
      const croppedCanvas = document.createElement('canvas');
      const croppedCtx = croppedCanvas.getContext('2d');
      croppedCanvas.width = width;
      croppedCanvas.height = height;
      croppedCtx.putImageData(imageData, 0, 0);

      // 자른 이미지의 Base64 데이터 얻기
      const croppedBase64Data = croppedCanvas.toDataURL();

      // 자른 이미지 Base64 데이터 출력
      console.log('Cropped Base64 Data:', croppedBase64Data);
    };

    // Base64 데이터 디코딩 및 이미지 로드
    img.src = image;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full h-80">
        <Camera
          ref={cameraRef}
          aspectRatio="cover"
          facingMode="environment"
          numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
          videoSourceDeviceId={activeDeviceId}
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
            className="border-4 border-green-500 w-2/3 h-2/3"
          ></div>
        </div>
      </div>
      <button
        onClick={handleCapture}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg z-50"
      >
        Capture Image
      </button>

      <select
        onChange={(event) => {
          setActiveDeviceId(event.target.value);
        }}
      >
        {devices.map((d) => (
          <option key={d.deviceId} value={d.deviceId}>
            {d.label}
          </option>
        ))}
      </select>

      {cameraRef.current?.torchSupported && (
        <button
          className={torchToggled ? 'toggled' : ''}
          onClick={() => {
            if (cameraRef.current) {
              setTorchToggled(cameraRef.current.toggleTorch());
            }
          }}
        >
          후레쉬
        </button>
      )}

      <button
        disabled={numberOfCameras <= 1}
        onClick={() => {
          if (cameraRef.current) {
            const result = cameraRef.current.switchCamera();
            console.log(result);
          }
        }}
      >
        카메라 전환
      </button>

      {image && (
        <div className="mt-4 z-50">
          <img src={image} alt="Captured" className="w-40 h-40 object-cover" />
        </div>
      )}
      <canvas ref={previewCanvasRef}></canvas>
      <Toaster />
      <button onClick={sendImageToBackend}>전송</button>
    </div>
  );
}
