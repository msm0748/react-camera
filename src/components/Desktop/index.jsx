import { useCallback, useState } from 'react';
import ImageCrop from './ImageCrop';

export default function Desktop() {
  const [image, setImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleImageChange = useCallback((imgData) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(imgData);
  }, []);

  const handleSubmit = useCallback(async () => {
    console.log('전송');
  }, []);
  return (
    <div className="w-dvw h-dvh flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          OCR
        </h2>
        <div className="text-center my-10">
          <label className="p-3 text-sm bg-lime-600 rounded-md text-white cursor-pointer inline-block">
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
            이미지 업로드
          </label>
        </div>
        {image && (
          <div className="mt-6">
            <img
              id="image"
              src={image}
              alt="Your"
              className="w-full rounded-lg border border-gray-300"
            />
          </div>
        )}
        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={openModal}
            id="resetButton"
            className="w-full py-2 px-4 bg-gray-400 text-white rounded-lg transition hover:bg-gray-500 disabled:bg-gray-300"
            disabled={!image}
          >
            Crop
          </button>
          <button
            onClick={handleSubmit}
            id="saveButton"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg transition hover:bg-blue-600 disabled:bg-blue-300"
            disabled={!image}
          >
            Save
          </button>
        </div>
      </div>
      {modalIsOpen && (
        <ImageCrop
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          imgSrc={image}
          handleImageChange={handleImageChange}
        />
      )}
    </div>
  );
}
