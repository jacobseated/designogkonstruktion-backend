# designogkonstruktion-backend
Express and sequelize based back-end API code to communicate with the Database

Production: https://wriggleflap.beamtic.net/vfl/

## Development

1.
```
npm install
```

2.
Rename `.env.sample` to `.env` and fill out the credentials for the database.

3.
```
node server.js
```

Insert `NODE_ENV=development` in the `./.env` file to automatically create database tables.
```
DB_HOST=wriggleflap.beamtic.net
DB_NAME=venner_for_livet
DB_USER=
DB_PASS=
DB_DIALECT=mariadb
DB_SSL=true
JWT_SECRET=
HOST=localhost
# NODE_ENV=development
```
Ask for remaining parametres. Be careful about using  `NODE_ENV=development`, because the deployed database will be cleared/recreated if you do.


## Production deployment example

1.
```
cd [project dir]
git clone https://github.com/jacobseated/designogkonstruktion-backend.git
```

2. Set `NODE_ENV=production` in the `.env` file and fill out the missing details:
```
DB_HOST=wriggleflap.beamtic.net
DB_NAME=venner_for_livet
DB_USER=
DB_PASS=
DB_DIALECT=mariadb
DB_SSL=true
JWT_SECRET=
HOST=wriggleflap.beamtic.net
NODE_ENV=development
```

3. Run the node server:
```
node server.js
```

### systemd
1. Configure a systemd service in `/etc/systemd/system/node-server.service` to have the server automatically start/restart:
```
[Unit]
Description=Node.js Server for Venner for Livet
After=network.target

[Service]
ExecStart=/root/.local/share/fnm/node-versions/v22.12.0/installation/bin/node /root/designogkonstruktion-backend/server.js
WorkingDirectory=/root/designogkonstruktion-backend
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

2. Enable the service:
```
systemctl daemon-reload
systemctl node-server enable
```

Verrify the node server automatically starts:
```
sudo reboot now
```
When the server has finished restarting, log back in and check the status:
```
systemctl status node-server
```
