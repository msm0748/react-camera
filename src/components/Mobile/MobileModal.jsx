import Modal from 'react-modal';
import { RxReload } from 'react-icons/rx';

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

export default function MobileModal({ modalIsOpen, imgSrc, closeModal }) {
  return (
    <Modal style={customStyles} isOpen={modalIsOpen}>
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
        </div>
      </div>
    </Modal>
  );
}
