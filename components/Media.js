import React, { useRef } from 'react';
import { Spin, Card, Popconfirm, Popover, message } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import useMargin from '../hooks/useMargin';
import useDebug from '../hooks/useDebug';
import { cdnQrcode, cdnUrl } from '../utils/helper';

const { Meta } = Card;

export default function Media({
  type,
  user,
  isAdmin,
  list,
  handleRemove,
  loading,
}) {
  const debug = useDebug();
  const ref = useRef(null);
  const margin = useMargin(ref);

  return (
    <Spin spinning={loading}>
      <div className="card-list" ref={ref}>
        {list.map(item => (
          <Card
            key={item.key}
            style={{ margin: `10px ${margin}px` }}
            cover={
              type === 'image' ? (
                <img src={cdnUrl(item.key, type, isAdmin)}/>
              ) : (
                <video
                  controls
                  poster={`${cdnUrl(item.key, type, isAdmin)}?x-oss-process=video/snapshot,t_0,ar_auto`}
                  src={cdnUrl(item.key, type, isAdmin)}
                />
              )
            }
            actions={[
              <CopyToClipboard key="copy" text={cdnUrl(item.key, type, isAdmin)}
                onCopy={() => message.success('Copied successfully')}>
                <span>Copy</span>
              </CopyToClipboard>,
              type === 'image' && <CopyToClipboard key="copy_md" text={`![](${cdnUrl(item.key, type, isAdmin)})`}
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