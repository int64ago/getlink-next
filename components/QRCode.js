import React, { useState, useCallback } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

import useDebounce from '../hooks/useDebounce';
import { qrcode } from '../utils/helper';

export default function QRCode() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <div>
      <TextArea
        style={{ width: 400 }}
        value={text}
        onChange={handleChange}
        placeholder="Please input something..."
      />
      {debouncedText && (
        <div>
          <a href={qrcode(debouncedText)} target="_blank">
            <img src={qrcode(debouncedText)} />
          </a>
        </div>
      )}
    </div>
  );
}
