import { useEffect, useState } from 'react';
import './App.css';
import CameraPage from './components/CameraPage';
import UploadPage from './components/UploadPage';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    // 모바일 기기 체크
    if (/android/i.test(userAgent)) {
      setIsMobile(true);
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <div className="App">
      {/* <Camera /> */}
      {/* <Example /> */}
      {isMobile ? <CameraPage /> : <UploadPage />}
    </div>
  );
}

export default App;
