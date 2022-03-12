# short_link
Web help shorten link !

App contain 2 part:
- Server: service as an api for client. Connect database Mongo and save new link and short link requested by client
- Client: render UI and make request from users to api then return result back to users

Also contain a .env file the provide infomation about:
- PORT (server-port) (default:5000)
- MONGO_USERNAME
- MONGO_PASSWORD
- MONGO_DBNAME
