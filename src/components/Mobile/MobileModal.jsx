import Modal from 'react-modal';

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

Modal.setAppElement('#root');

export default function MobileModal({ modalIsOpen, imgSrc }) {
  return (
    <Modal style={customStyles} isOpen={modalIsOpen}>
      <div className="bg-white w-full h-full">
        <img src={imgSrc} alt="modal" />
      </div>
    </Modal>
  );
}
