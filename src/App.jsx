import { useEffect, useState } from 'react';
import './App.css';
import Mobile from './components/Mobile';
import Desktop from './components/Desktop';

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

  return <div className="App">{isMobile ? <Mobile /> : <Desktop />}</div>;
}

export default App;
