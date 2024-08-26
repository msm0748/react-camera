export default function ModalCloseButton({ closeModal }) {
  return (
    <button onClick={closeModal}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
      >
        <g fill="none" fillRule="evenodd" strokeLinecap="round">
          <g stroke="#333" strokeWidth="1.3">
            <g>
              <g>
                <path
                  d="M16.714 0L0 16.714"
                  transform="translate(-1392 -20) translate(1392 20) translate(5.643 5.643)"
                />
                <path
                  d="M16.714 0L0 16.714"
                  transform="translate(-1392 -20) translate(1392 20) translate(5.643 5.643) matrix(-1 0 0 1 16.714 0)"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
}
