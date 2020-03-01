import shorturl from 'short-url-generator';
import AV from 'leancloud-storage';

import auth0 from '../../utils/auth0';

if (!AV.applicationId) {
  AV.init({
    appId: process.env.AV_AK,
    appKey: process.env.AV_SK,
  });
}

export default async (req, res) => {
  const { longUrl } = req.query;
  const { user: { sub: uid = 'anonymous' } = {} } = await auth0.getSession(req) || {};
  try {
    const shortUrl = shorturl(longUrl);
    if (shortUrl.is_url) {
      const Url = AV.Object.extend('Url');
      const url = new Url();
      url.set('longUrl', longUrl);
      url.set('shortId', shortUrl.short);
      url.set('uid', uid);
      const json = await url.save();
      res.json(json);
    } else {
      throw new Error('Invalid url');
    }
  } catch (error) {
    console.error(error);
    res.statusMessage = error.message;
    res.status(error.status || 500).end();
  }
}
