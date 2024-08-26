const TO_RADIANS = Math.PI / 180;

/**
 * 이미지와 캔버스를 사용하여 미리보기를 생성합니다. 선택적으로 자르기, 확대/축소 및 회전 효과를 적용합니다.
 *
 * @param {HTMLImageElement} image - 캔버스에 그릴 이미지 요소입니다.
 * @param {HTMLCanvasElement} canvas - 이미지 미리보기를 렌더링할 캔버스 요소입니다.
 * @param {Object} crop - 자르기 파라미터를 정의하는 객체입니다.
 * @param {number} crop.x - 자르기 영역의 왼쪽 상단 x 좌표입니다.
 * @param {number} crop.y - 자르기 영역의 왼쪽 상단 y 좌표입니다.
 * @param {number} crop.width - 자르기 영역의 너비입니다.
 * @param {number} crop.height - 자르기 영역의 높이입니다.
 * @param {number} [scale=1] - 이미지의 확대/축소 비율입니다. 기본값은 1 (확대/축소 없음)입니다.
 * @param {number} [rotate=0] - 이미지의 회전 각도(도)입니다. 기본값은 0 (회전 없음)입니다.
 * @returns {Promise<void>} - 미리보기가 성공적으로 렌더링되면 해결되는 약속을 반환합니다.
 * @throws {Error} - 캔버스 2D 컨텍스트를 가져올 수 없는 경우 오류를 발생시킵니다.
 */
export const canvasPreview = async (
  image,
  canvas,
  crop,
  scale = 1,
  rotate = 0
) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};
