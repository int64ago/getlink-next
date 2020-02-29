export const cdnUrl = (key, type) =>
  `https://${type === 'file' ? 'd' : 'cdn'}.int64ago.org/${key}`;

export const cdnQrcode = (key, type) =>
  `https://qr.302.at/chart?chs=150x150&cht=qr&choe=UTF-8&chl=${cdnUrl(key, type)}`;

export const qrcode = (text) =>
  `https://qr.302.at/chart?chs=300x300&cht=qr&choe=UTF-8&chl=${encodeURIComponent(text)}`;

export const ext = filename => {
  const match = /[^.]+$/.exec(filename);
  if (match && match[0] && match[0] !== filename) return `.${match[0]}`;
  return '';
};
