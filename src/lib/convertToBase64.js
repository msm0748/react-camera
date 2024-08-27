export const convertToBase64 = (imgData) => {
  if (imgData) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        resolve(base64); // Promise를 성공적으로 완료하고 base64 데이터를 반환
      };
      reader.onerror = (error) => reject(error); // 오류가 발생하면 Promise를 거부
      reader.readAsDataURL(imgData);
    });
  } else {
    return Promise.reject('No image data'); // imgData가 없을 경우 Promise를 거부
  }
};
