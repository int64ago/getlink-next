import AV from 'leancloud-storage';

if (!AV.applicationId) {
  AV.init({
    appId: process.env.AV_AK,
    appKey: process.env.AV_SK,
  });
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
