import crypto from 'crypto';

const OSSAccessKeyId = process.env.OSS_AK;
const OSSAccessKeySecret = process.env.OSS_SK;

export default (req, res) => {
  // download / cdn
  const type = req.query['type'];

  const host = `https://int64ago-${type}.oss-cn-hangzhou.aliyuncs.com`;
  const maxSize = 1024 * 1024 * 1000; // 1GB
  const maxAge = 5 * 60 * 1000; // 5min

  const policyString = JSON.stringify({
    expiration: new Date(new Date().getTime() + maxAge).toISOString(),
    conditions: [
      ['content-length-range', 0, maxSize],
    ]
  });
  const policy = Buffer.from(policyString).toString('base64');
  const signature = crypto
    .createHmac('sha1', OSSAccessKeySecret)
    .update(policy)
    .digest('base64');

  res.json({
    OSSAccessKeyId,
    host,
    policy,
    signature,
    success_action_status: 200,
  });
}
