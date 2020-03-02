import React, { useMemo } from 'react';
import { Table, Button, Popconfirm, Popover, message } from 'antd';
import { QrcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import useDebug from '../hooks/useDebug';
import { cdnQrcode, cdnUrl } from '../utils/helper';

export default function File({
  loading,
  user,
  isAdmin,
  list,
  handleRemove,
}) {
  const debug = useDebug();

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => new Date(createdAt).toLocaleString(),
    },
    {
      title: '',
      key: 'op',
      width: 220,
      fixed: 'right',
      render: (text, record) => (
        <div>
          <Popover
            content={(
              <img
                alt="loading"
                style={{ width: 150, height: 150 }}
                src={cdnQrcode(record.key, 'file', isAdmin)}
              />
            )}>
            <Button style={{ marginLeft: 10 }}>
              <QrcodeOutlined />
            </Button>
          </Popover>
          {(user || debug) && (
            <Popconfirm
              title="Are you sure to delete this ?"
              onConfirm={() => handleRemove(record.objectId)}
            >
              <Button style={{ marginLeft: 10 }} type="danger">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          )}
          <CopyToClipboard text={cdnUrl(record.key, 'file', isAdmin)}
            onCopy={() => message.success('Copied successfully')}>
            <Button style={{ marginLeft: 10 }} type="primary">Copy</Button>
          </CopyToClipboard>
        </div>
      ),
    },
  ], [handleRemove, debug]);

  return (
    <Table
      loading={loading}
      dataSource={list}
      columns={columns}
      pagination={false}
    />
  );
}