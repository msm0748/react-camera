import { useEffect } from 'react';
import Modal from '../common/Modal';
import { RxReload } from 'react-icons/rx';

const customStyles = {
  width: '100%',
  height: '100%',
};

export default function MobileModal({ imgSrc, closeModal, data }) {
  useEffect(() => {
    // 브라우저 히스토리에 새로운 상태 추가
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      // 뒤로가기 버튼 클릭 시 모달 닫기
      closeModal();
    };

    window.addEventListener('popstate', handlePopState);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [closeModal]);
  return (
    <Modal style={customStyles}>
      <div className="bg-white w-full h-full p-8">
        <div>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="flex gap-2 items-center border border-black p-2 rounded-3xl"
            >
              <RxReload size={20} />
              재촬영
            </button>
          </div>
          <div className="mt-3 rounded-md overflow-hidden">
            <img className="w-full" src={imgSrc} alt="modal" />
          </div>
          <div className="p-2 mt-4 max-h-60">
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}
