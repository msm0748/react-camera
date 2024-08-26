/**
 * Base64 문자열에서 `data:` URL 스킴을 제거하고 순수한 Base64 데이터만 추출합니다.
 * @param {string} base64String - Base64 데이터 URL 문자열
 * @returns {string} - 순수한 Base64 문자열
 */
export const extractBase64Data = (base64String) => {
  // 정규 표현식을 사용하여 `data:[<mediatype>];base64,` 부분을 제거
  const matches = base64String.match(/^data:(?:.*?);base64,(.*)$/);

  if (matches && matches[1]) {
    return matches[1]; // 추출한 Base64 문자열을 반환합니다.
  }

  // Base64 문자열이 `data:` URL 형식이 아닌 경우, 입력을 그대로 반환
  return base64String;
};
