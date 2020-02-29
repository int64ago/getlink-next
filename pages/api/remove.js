import { remove } from '../../utils/av';  

export default async (req, res) => {
  try {
    const { objectId } = req.query;
    const json = await remove(objectId);
    res.json(json);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}