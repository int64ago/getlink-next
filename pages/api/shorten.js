import shorturl from 'short-url-generator';
import AV from 'leancloud-storage';

if (!AV.applicationId) {
  AV.init({
    appId: process.env.AV_AK,
    appKey: process.env.AV_SK,
  });
}

export default async (req, res) => {
  const { longUrl } = req.query;
  try {
    const shortUrl = shorturl(longUrl);
    if (shortUrl.is_url) {
      const Url = AV.Object.extend('Url');
      const url = new Url();
      url.set('longUrl', longUrl);
      url.set('shortId', shortUrl.short);
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
