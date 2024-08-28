import Modal from '../common/Modal';
import { RxReload } from 'react-icons/rx';

const customStyles = {
  width: '100%',
  height: '100%',
};

export default function MobileModal({ imgSrc, closeModal }) {
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
        </div>
      </div>
    </Modal>
  );
}
