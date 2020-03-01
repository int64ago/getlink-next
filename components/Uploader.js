import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import uuidV4 from 'uuid/v4';
import qs from 'query-string';

import File from './File';
import Media from './Media';

import { cdnQrcode, ext } from '../utils/helper';

const { Dragger } = Upload;

export default function Uploader({
  user,
  type,
}) {
  const [sign, setSign] = useState({});
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    fetch(`/api/list?type=${type}`)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        setList(json);
      });
  }, [type]);

  const getSign = useCallback(() => {
    fetch(`/api/signature/${type}`)
      .then(res => res.json())
      .then(json => setSign(json));
  }, [type]);

  const handleRemove = useCallback((objectId) => {
    setLoading(true);
    fetch(`/api/remove?${qs.stringify({ objectId })}`)
      .then(res => res.json())
      .then(() => {
        setLoading(false);
        handleRefresh();
      });
  }, [handleRefresh]);

  const handleSave = useCallback(({
    name,
    size,
    key,
  }) => {
    setLoading(true);
    fetch(`/api/save?${qs.stringify({ name, size, key, type })}`)
      .then(res => res.json())
      .then(() => {
        setLoading(false);
        handleRefresh();
      });
  }, [type, handleRefresh]);

  useEffect(() => {
    getSign();
    handleRefresh();
  }, [getSign, handleRefresh]);

  useEffect(() => {
    list.forEach(d => {
      const img = new Image();
      img.src = cdnQrcode(d.key, d.type, !user);
    });
  }, [list]);

  useEffect(() => {
    setList([]);
  }, [type]);

  const uploadProps = useMemo(() => ({
    name: 'file',
    multiple: true,
    action: sign.host,
    data(file) {
      file.key = `${uuidV4()}${ext(file.name)}`;
      return {
        ...sign,
        key: file.key,
      }
    },
    accept: type === 'file' ? '*' : `${type}/*`,
    onChange(info) {
      const { status, name, size, originFileObj } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        const index = info.fileList.map(d => d.uid).indexOf(info.file.uid);
        info.fileList.splice(index, 1);
        message.success(`${info.file.name} uploaded successfully.`);
        handleSave({ name, size, key: originFileObj.key });
      } else if (status === 'error') {
        message.error(`${info.file.name} upload failed.`);
      }
    },
  }), [type, sign, handleSave]);

  return (
    <>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Drop files here or click to upload.</p>
      </Dragger>
      <div style={{ marginTop: 20 }}>
        {type === 'file' ? (
          <File
            list={list}
            user={user}
            loading={loading}
            handleRemove={handleRemove}
          />
        ) : (
          <Media
            type={type}
            list={list}
            user={user}
            loading={loading}
            handleRemove={handleRemove}
          />
        )}
      </div>
    </>
  );
};
