import React, { useCallback, useState } from 'react';
import { Input, Button, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import isURL from 'validator/lib/isURL';

export default function ShortUrl() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const save = useCallback(() => {
    setLoading(true);
    fetch(`/api/shorten?longUrl=${encodeURIComponent(longUrl)}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .then(({ shortId }) => {
        setShortUrl(`https://302.at/${shortId}`);
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        message.error('Invalid url');
      });
  }, [longUrl]);

  return (
    <div>
      <Input
        value={longUrl}
        onChange={e => setLongUrl(e.target.value)}
        style={{ width: 300 }}
        placeholder="Please input a url..."
      />
      <Button
        type="primary"
        loading={loading}
        onClick={save}
        disabled={!isURL(longUrl)}
      >Shorten</Button>
      {shortUrl && (
        <div style={{ marginTop: 20 }}>
          <Input
            style={{ width: 200 }}
            value={shortUrl}
          />
          <CopyToClipboard text={shortUrl}
            onCopy={() => message.success('Copied successfully')}>
            <Button type="primary">Copy</Button>
          </CopyToClipboard>
          <div>
            <a href={shortUrl} target="_blank">
              <img src={`//qr.302.at/chart?chs=150x150&cht=qr&choe=UTF-8&chl=${shortUrl}`} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
