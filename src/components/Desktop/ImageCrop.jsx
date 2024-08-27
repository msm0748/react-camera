import React, { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import Modal from 'react-modal';
import { useDebounceEffect } from '../../hooks/useDebounceEffect';
import { canvasPreview } from '../../lib/canvasPreview';

import 'react-image-crop/dist/ReactCrop.css';
import ModalCloseButton from './ModalCloseButton';
import ImageRotator from './ImageRotator';
import { convertToBase64 } from '../../lib/convertToBase64';

const customStyles = {
  content: {
    inset: '0',
    border: 'none',
    padding: '0',
    borderRadius: '0',
    width: '100%',
    height: '100%',
  },
};

const imageSize = {
  width: 800,
  height: 600,
};
Modal.setAppElement('#root');

export default function ImageCrop({ imgSrc, isOpen, closeModal, setImage }) {
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const onApplyCropClick = useCallback(async () => {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      // throw new Error('Crop canvas does not exist');
      return closeModal();
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    offscreen
      .convertToBlob({
        type: 'image/png',
      })
      .then(async (blob) => {
        try {
          const base64 = await convertToBase64(blob);
          setImage(base64);
        } catch (error) {
          console.log(error, 'error');
        }
      });

    closeModal();
  }, [closeModal, completedCrop, setImage]);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className="relative w-full h-full flex flex-col justify-between items-center">
        <div className="h-16 flex justify-between items-center px-6 bg-white shadow-md w-full">
          <h2 className="text-xl font-bold">이미지 자르기</h2>
          <ModalCloseButton closeModal={closeModal} />
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-10">
            <div
              style={{
                width: `${imageSize.width}px`,
                height: `${imageSize.height}px`,
              }}
              className="flex justify-center"
            >
              {!!imgSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg)`,
                    }}
                  />
                </ReactCrop>
              )}
            </div>
            <div className="w-[300px] h-[300px] bg-white">
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            {/* <div className="Crop-Controls">
            <div>
              <label htmlFor="scale-input">Scale: </label>
              <input
                id="scale-input"
                type="range"
                min={0.5}
                max={3}
                step={0.1}
                value={scale}
                disabled={!imgSrc}
                onChange={(e) => setScale(Number(e.target.value))}
              />
            </div>
          </div> */}
          </div>
        </div>
        <ImageRotator rotate={rotate} setRotate={setRotate} />

        <div className="mb-10">
          <button
            onClick={onApplyCropClick}
            className="p-3 text-sm bg-lime-600 rounded-md text-white cursor-pointer inline-block"
          >
            변경 완료
          </button>
        </div>
      </div>
    </Modal>
  );
}
