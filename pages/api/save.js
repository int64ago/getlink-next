import auth0 from '../../utils/auth0';
import { save } from '../../utils/av';  

export default async (req, res) => {
  try {
    const { user: { sub: uid = 'anonymous' } = {} } = await auth0.getSession(req) || {};
    const json = await save({
      ...req.query,
      uid,
    });
    res.json(json);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
