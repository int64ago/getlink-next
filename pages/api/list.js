import auth0 from '../../utils/auth0';
import { list } from '../../utils/av';  

export default async (req, res) => {
  try {
    const { user: { sub: uid = 'anonymous' } = {} } = await auth0.getSession(req) || {};
    const { type } = req.query;
    const json = await list({
      type,
      uid,
    });
    res.json(json);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
