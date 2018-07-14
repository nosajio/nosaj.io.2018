const host = process.env.HOSTNAME;

exports.nosajUrl = path => `${host}/${String(path)[0] === '/' ? String(path).substr(1) : String(path)}`;