module.exports = function accessLog(db, error) {
  return (req, res) => {
    const { method, originalUrl } = req;

    if (method === 'OPTIONS') return true;

    const log = {
      response_time: res.get('X-Response-Time').replace('ms', ''),
      status: res.statusCode,
      request: originalUrl,
      method,
    };

    if (req.user) log.user_id = req.user.id;

    return db
      .create(log)
      .catch(err => error('response logging error', log, err));
  };
};
