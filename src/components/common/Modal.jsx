function Modal({ style, children, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full h-full"
      onClick={handleOverlayClick}
    >
      <div style={style} className="bg-white">
        {children}
      </div>
    </div>
  );
}

export default Modal;
