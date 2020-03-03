import React, { useRef, useContext } from 'react';
import { Spin, Card, Popconfirm, Popover, message } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Player } from 'video-react';

import useMargin from '../hooks/useMargin';
import { cdnQrcode, cdnUrl } from '../utils/helper';
import { Context } from '../context';

const { Meta } = Card;

export default function Media({
  type,
  list,
  handleRemove,
  loading,
}) {
  const { isAdmin, user } = useContext(Context);
  const ref = useRef(null);
  const margin = useMargin(ref);

  return (
    <Spin spinning={loading}>
      <div className="card-list" ref={ref}>
        {list.map(item => (
          <Card
            key={item.key}
            style={{ margin: `10px ${margin}px` }}
            bodyStyle={{
              position: 'relative',
              background: type === 'image'
                ? `url(${cdnUrl(item.key, type, isAdmin)}?x-oss-process=image/resize,m_pad,h_181,w_298)`
                : 'unset'
            }}
            actions={[
              <CopyToClipboard key="copy" text={cdnUrl(item.key, type, isAdmin)}
                onCopy={() => message.success('Copied successfully')}>
                <span>Copy</span>
              </CopyToClipboard>,
              type === 'image' && <CopyToClipboard key="copy_md" text={`![${item.name}](${cdnUrl(item.key, type, isAdmin)})`}
                onCopy={() => message.success('Copied successfully')}>
                <span>Copy MD</span>
              </CopyToClipboard>,
              user &&
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
            {type === 'video' && (
              <Player
                playsInline
                width={298}
                height={181}
                fluid={false}
                poster={`${cdnUrl(item.key, type, isAdmin)}?x-oss-process=video/snapshot,t_0,h_181,w_298`}
                src={cdnUrl(item.key, type, isAdmin)}
              />
            )}
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