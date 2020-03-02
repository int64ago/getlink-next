import AV from 'leancloud-storage';

if (!AV.applicationId) {
  AV.init({
    appId: process.env.AV_AK,
    appKey: process.env.AV_SK,
  });
}

export async function validUser(uid) {
  const whiteList = await new AV.Query('WhiteList').find();
  if (whiteList.length > 0) {
    return !!whiteList.find(d => d.toJSON().uid === uid);
  } else {
    const blackList = await new AV.Query('BlackList').find();
    return !blackList.find(d => d.toJSON().uid === uid);
  }
}

export async function adminUser(uid) {
  if (!uid) return false;
  const adminList = await new AV.Query('Admin').find();
  return !!adminList.find(d => d.toJSON().uid === uid);
}

export function save({ name, key, type, size, uid }) {
  const Resource = AV.Object.extend('Resource');
  const resource = new Resource();
  resource.set('name', name);
  resource.set('key', key);
  resource.set('type', type);
  resource.set('size', size / 1);
  resource.set('uid', uid);
  return resource.save();
};

export function list({ uid, type }) {
  const query = new AV.Query('Resource');
  query.equalTo('uid', uid);
  query.equalTo('type', type);
  query.descending('createdAt');
  return query.find();
};

export function remove(objectId) {
  const resource = AV.Object.createWithoutData('Resource', objectId);
  return resource.destroy();
};

export default AV;
