export const cropImage = async (image, crop, borderWidth) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      console.log(
        'Canvas Width:',
        canvas.width,
        'Canvas Height:',
        canvas.height
      );

      ctx.drawImage(img, 0, 0);

      const x = crop.x - borderWidth;
      const y = crop.y - borderWidth;
      const width = crop.width - borderWidth * 7;
      const height = crop.height - borderWidth * 4;

      try {
        const imageData = ctx.getImageData(x, y, width, height);

        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');
        croppedCanvas.width = width;
        croppedCanvas.height = height;
        croppedCtx.putImageData(imageData, 0, 0);

        const croppedBase64Data = croppedCanvas.toDataURL();

        resolve(croppedBase64Data);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = function () {
      reject(new Error('Failed to load image'));
    };

    img.src = image;
  });
};
