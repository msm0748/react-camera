import Modal from 'react-modal';

import ModalCloseButton from './ModalCloseButton';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function ResultModal({ data, isOpen, closeModal }) {
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className="w-96 min-h-96">
        <div className="flex justify-between items-center">
          <h2>결과 화면</h2>
          <ModalCloseButton closeModal={closeModal} />
        </div>
        <div className="py-10 max-h-60">
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
