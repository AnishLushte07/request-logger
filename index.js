/**
 * Request logs.
 * @param {Object} db - Sequelize database instance.
 * @param {Object} config - options(appId, tableName).
 * @param {function} error - error function to be called in case of failure.
 */

module.exports = function accessLog(db, config = {}, error) {
  const { appId = null, tableName = 'access_logs' } = config;

  return (req, res, next) => {
    res.on('finish', () => {
      const { method, originalUrl } = req;

      if (method === 'OPTIONS') return true;

      if (!originalUrl.startsWith('/api')) return true;

      const responseTime = res.get('X-Response-Time').replace('ms', '');
      const status = res.statusCode;
      const request = originalUrl;

      const userId = req.user ? req.user.id : null;

      const query = `INSERT INTO ${tableName} (response_time, status, request, method, user_id, app_id) VALUES (${
          responseTime}, ${status}, '${request}', '${method}', ${userId}, ${appId});`;

      db.query(query, {
        type: db.QueryTypes.INSERT,
      })
          .catch((err) => {
            if (typeof error === "function") error(err)
          });
    });

    next();
  };
};

