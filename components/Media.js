import React from 'react';
import { Spin, Card, Popconfirm, Popover, message } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import useDebug from '../hooks/useDebug';
import { cdnQrcode, cdnUrl } from '../utils/helper';

const { Meta } = Card;

export default function Media({
  type,
  user,
  list,
  handleRemove,
  loading,
}) {
  const debug = useDebug();

  return (
    <Spin spinning={loading}>
      <div className="card-list">
        {list.map(item => (
          <Card
            key={item.key}
            style={{ width: 340 }}
            cover={
              type === 'image' ? (
                <img src={cdnUrl(item.key, type, !user)}/>
              ) : (
                <video
                  controls
                  poster={`${cdnUrl(item.key, type, !user)}?x-oss-process=video/snapshot,t_0,ar_auto`}
                  src={cdnUrl(item.key, type, !user)}
                />
              )
            }
            actions={[
              <CopyToClipboard key="copy" text={cdnUrl(item.key, type, !user)}
                onCopy={() => message.success('Copied successfully')}>
                <span>Copy</span>
              </CopyToClipboard>,
              type === 'image' && <CopyToClipboard key="copy_md" text={`![](${cdnUrl(item.key, type, !user)})`}
                onCopy={() => message.success('Copied successfully')}>
                <span>Copy MD</span>
              </CopyToClipboard>,
              (user || debug) &&
              <Popconfirm
                title="Are you sure to delete this?"
                onConfirm={() => handleRemove(item.objectId)}
              >
                <span style={{ color: 'red' }}>
                  Delete
                </span>
              </Popconfirm>,
              <Popover content={(
                  <img
                    style={{ width: 150, height: 150 }}
                    src={cdnQrcode(item.key, type, !user)}
                  />
              )}>
                <QrcodeOutlined />
              </Popover>
            ].filter(Boolean)}
          >
            <Meta
              title={item.name}
              description={new Date(item.createdAt).toLocaleString()}
            />
          </Card>
        ))}
      </div>
    </Spin>
  );
}