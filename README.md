# designogkonstruktion-backend
Express and sequelize based back-end API code to communicate with the Database


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

Indsæt `NODE_ENV=development` i `./.env` filen, så vil tabellerne blive slettet og genoprettet, samt grund-data (eller dummy data) indsat automatisk.
```
DB_HOST=wriggleflap.beamtic.net
DB_NAME=venner_for_livet
DB_USER=
DB_PASS=
DB_DIALECT=mariadb
DB_SSL=true
JWT_SECRET=
HOST=localhost
NODE_ENV=development
```
Indhold til de andre variabler kan findes i Discord-chatten. 
