import React, { useState } from 'react';
import { Form, InputNumber, Radio, Button, Input, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


export default function Placeholder() {
  const [text, setText] = useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('CCCCCC');
  const [textColor, setTextColor] = useState('A3A3A3');

  let url = `https://p.302.at/${width}x${height}/${backgroundColor || 'CCCCCC'}/${textColor || 'A3A3A3'}.png`;
  if (text) {
    url = `${url}?text=${text}`;
  }

  return (
    <div>
      <div>
        <Form {...layout}>
          <Form.Item label="Size(px)">
            <InputNumber
              value={width}
              onChange={(value) => setWidth(value / 1)}
              placeholder="width"
              step={1}
              precision={0}
              min={0}
            />
            ✖️
            <InputNumber
              value={height}
              onChange={(value) => setHeight(value / 1)}
              placeholder="height"
              step={1}
              precision={0}
              min={0}
            />
          </Form.Item>
          <Form.Item label="Background Color">
            <Input
              style={{ width: 110 }}
              addonBefore="#"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Text Color">
            <Input
              style={{ width: 110 }}
              addonBefore="#"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Text">
            <Input value={text} onChange={(e) => setText(e.target.value)} />
          </Form.Item>
          {(width > 0 && height > 0) && (
            <Form.Item label="Preview">
              <div>
                <Input style={{ width: 250 }} disabled value={url} />
                <CopyToClipboard text={url}
                  onCopy={() => message.success('Copied successfully')}>
                  <Button style={{ margin: '0 10px' }} type="primary">Copy</Button>
                </CopyToClipboard>
                <Button href={url} download>Download</Button>
                <div style={{ marginTop: 20 }}>
                  <img style={{ maxWidth: '100%', maxHeight: 300 }} src={url} />
                </div>
              </div>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
}