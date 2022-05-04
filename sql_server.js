const sql_config = {
        user: 'db_a8670c_phungthanhtu_admin',
        password: 'Phungthanhtu!1',
        server: 'sql8001.site4now.net', 
        database: 'db_a8670c_phungthanhtu',
        options:{
            trustedConnection: true,
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,
           }
}

const dev_sql_config = {
    database: "AssetsManagement",
    server: "PHUNGTHANHTU",
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true,
      trustServerCertificate: true,
    }
};



module.exports = {sql_config,dev_sql_config}
