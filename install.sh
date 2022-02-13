# Updating APT
sudo apt update;
sudo apt install -y npm zip unzip apache2 ca-certificates mongodb-clients mongo-tools mongodb-server wkhtmltopdf --no-install-recommends;
# Configuring Apache VHOSTs
sudo ufw app list;
sudo ufw allow 'Apache';
sudo ufw status;
sudo systemctl status apache2;
mv httpd-vhosts.conf /etc/apache2/sites-available/1337shop.conf;
# Installing Node 16.13.1
sudo npm install n -g;
sudo n 16.13.1;
# Saving the source code in /app
sudo mv flag /root/flag;
sudo mkdir /app;
sudo mv * /app/.;
# Refreshing the PATH variable
PATH="$PATH";
# Installing MongoDB
sudo systemctl status mongodb.service;
sudo systemctl enable mongodb.service;
mongo --eval 'db.runCommand({ connectionStatus: 1 })';
mongoimport --db 1337shop --collection users --drop --file /app/databases/users.json --jsonArray;
mongoimport --db 1337shop --collection prevloginlogs --drop --file /app/databases/prevloginlogs.json --jsonArray;
## Enabling the Apache Config
sudo a2ensite 1337shop.conf;
sudo a2dissite 000-default.conf;
sudo a2enmod proxy_http;
sudo a2enmod ssl;
sudo a2enmod rewrite;
sudo a2enmod proxy_wstunnel;
echo "ServerName 127.0.0.1" >> /etc/apache2/apache2.conf;
sudo apache2ctl configtest;
sudo systemctl restart apache2;
# Installing Node Apps
cd /app/;
npm install;
# Opening screen sessions with apps running
screen -dm bash -c "cd /app/; npm run start;";
# Clearing some unnecessary files.
sudo rm /app/writeup.md; 
sudo rm /app/README.md;
sudo rm /app/databases -rd;
sudo rm /app/assets -rd;