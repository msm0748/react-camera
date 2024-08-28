import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '../../lib/api';
import moment from 'moment';
import { IoIosFlash, IoIosFlashOff } from 'react-icons/io';
import { IoCameraReverseOutline } from 'react-icons/io5';
import MobileModal from './MobileModal';
import { cropImage } from '../../lib/cropImage';
import styles from './styles.module.css';

const guideLineBorderWidth = 4;

export default function Mobile() {
  const cameraRef = useRef(null);
  const audioRef = useRef(null);
  const [mobileSize, setMobileSize] = useState(); // 모바일 화면 크기
  const [image, setImage] = useState(null);
  const guideLineRef = useRef(null);
  const [guideLinePosition, setGuideLinePosition] = useState();
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [torchToggled, setTorchToggled] = useState(false); // 후레쉬
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isTorched, setIsTorched] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    setMobileSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

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

  const handleFlash = () => {
    // 애니메이션 클래스를 적용하여 깜빡거리는 효과를 실행
    setShowFlash(true);

    // 애니메이션이 끝난 후 클래스를 제거
    setTimeout(() => {
      setShowFlash(false);
    }, 200); // 애니메이션 지속 시간과 일치시켜야 함
  };

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();
      audioRef.current.play();
      handleFlash();

      try {
        // setImage(photo);
        const cropPhoto = await cropImage(photo, guideLinePosition, mobileSize);

        setImage(cropPhoto);
        // openModal(); // 나중에 여기에 onSubmit 넣어야 함
        await onSubmit(cropPhoto);
      } catch (error) {
        console.error('Error cropping image:', error);
        toast.error('Failed to crop image.');
      }
    }
  };

  const onSubmit = async (cropPhoto) => {
    const today = moment.now();
    try {
      const response = await api
        .post('api/image', {
          json: {
            image: cropPhoto,
            capture_tick: today,
          },
        })
        .json();

      const data = response.result.readResult.blocks[0].lines;
      setData(data);
      openModal();
    } catch (error) {
      console.log(error, 'error');
      toast.error('문자를 인식할 수 없습니다. 다시 시도해 주세요.');
    }
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
          videoReadyCallback={() => {
            setIsTorched(cameraRef.current?.torchSupported);
          }}
        />
        {/* 촬영 가이드용 사각 박스 */}
        <div
          style={{
            top: '200px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: `${guideLineBorderWidth}px`,
          }}
          className="absolute border-white opacity-60 w-4/5 h-36"
        >
          <div ref={guideLineRef} className="w-full h-full"></div>
        </div>
      </div>
      <div className="w-full flex justify-around items-center absolute bottom-10 text-white">
        <div>
          {isTorched ? (
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
            className="p-1.5 border-white border-[3px] rounded-full"
          >
            <div className="w-6 h-6 bg-white rounded-full"></div>
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
      <audio
        ref={audioRef}
        className="hidden"
        src="alarm.mp3"
        preload="auto"
      ></audio>
      {modalIsOpen && (
        <MobileModal imgSrc={image} closeModal={closeModal} data={data} />
      )}
      {showFlash && <div className={styles.flash}></div>}
      <Toaster />
    </div>
  );
}
