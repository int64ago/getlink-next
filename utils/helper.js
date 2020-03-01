import { OSS } from './constant';

export const cdnUrl = (key, type, anonymouse) =>
  `${OSS[anonymouse ? 'anonymouse' : type].cdn}/${key}`;

export const cdnQrcode = (key, type, anonymouse) =>
  `https://qr.302.at/chart?chs=150x150&cht=qr&choe=UTF-8&chl=${cdnUrl(key, type, anonymouse)}`;

export const qrcode = (text) =>
  `https://qr.302.at/chart?chs=300x300&cht=qr&choe=UTF-8&chl=${encodeURIComponent(text)}`;

export const ext = filename => {
  const match = /[^.]+$/.exec(filename);
  if (match && match[0] && match[0] !== filename) return `.${match[0]}`;
  return '';
};
