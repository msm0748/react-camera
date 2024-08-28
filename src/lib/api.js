import ky from 'ky';

export const api = ky.create({
  prefixUrl: 'https://demo.pilab.co.kr',
});
