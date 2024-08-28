import { MdOutlineClose } from 'react-icons/md';

export default function ModalCloseButton({ closeModal }) {
  return (
    <button onClick={closeModal}>
      <MdOutlineClose size={28} />
    </button>
  );
}
