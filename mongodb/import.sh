#! /bin/bash
mongoimport --db 1337shop --collection users --drop --file /mongodb/users.json --jsonArray;
mongoimport --db 1337shop --collection prevloginlogs --drop --file /mongodb/prevloginlogs.json --jsonArray;