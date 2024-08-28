import Modal from '../common/Modal';

import ModalCloseButton from './ModalCloseButton';

export default function ResultModal({ data, closeModal }) {
  return (
    <Modal>
      <div className="w-96 min-h-96">
        <div className="flex justify-between items-center p-2 border-b-[1px] border-black">
          <h2>결과 화면</h2>
          <ModalCloseButton closeModal={closeModal} />
        </div>
        <div className="p-2 mt-4 max-h-60">
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
