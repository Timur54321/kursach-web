const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "oh_my_god__908809",
    host: "localhost",
    port: 5432,
    database: "whatwhatwhat"
});

module.exports = pool;