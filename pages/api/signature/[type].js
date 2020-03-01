import crypto from 'crypto';

import auth0 from '../../../utils/auth0';
import { OSS } from '../../../utils/constant';
import { validUser } from '../../../utils/av';

const OSSAccessKeyId = process.env.OSS_AK;
const OSSAccessKeySecret = process.env.OSS_SK;

export default async (req, res) => {
  const type = req.query['type'];
  const { user: { sub: uid } = {} } = await auth0.getSession(req) || {};

  const isValid = await validUser(uid);
  if (!isValid) {
    return res.status(403).end('Invalid user!');
  }

  const maxSize = !!uid
    ? 1024 * 1024 * 1000 // 1GB
    : 1024 * 1024 * 100; // 100MB
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
    host: OSS[uid ? type : 'anonymouse'].host,
    policy,
    signature,
    success_action_status: 200,
  });
}
