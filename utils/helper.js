import { OSS } from './constant';

export const cdnUrl = (key, type, isAdmin) =>
  `${OSS[isAdmin ? type : 'anonymouse'].cdn}/${key}`;

export const cdnQrcode = (key, type, isAdmin) =>
  `https://qr.302.at/chart?chs=150x150&cht=qr&choe=UTF-8&chl=${cdnUrl(key, type, isAdmin)}`;

export const qrcode = (text) =>
  `https://qr.302.at/chart?chs=300x300&cht=qr&choe=UTF-8&chl=${encodeURIComponent(text)}`;

export const ext = filename => {
  const match = /[^.]+$/.exec(filename);
  if (match && match[0] && match[0] !== filename) return `.${match[0]}`;
  return '';
};
