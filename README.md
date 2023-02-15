# Short_link
- This Website help shorten link !

**App contain 2 part:**
- Server: service as an api for client. Connect database Mongo and save new link and short link requested by client
- Client: render UI and make request from users to api then return result back to users

- Also contain a .env file the provide infomation about:
1. PORT (server-port) (default:5000)
2. MONGO_USERNAME
3. MONGO_PASSWORD
4. MONGO_DBNAME
4. MONGO_COLLECTION

# Play with docker
```bash
git clone https://github.com/NgoMinhToan/short_link
```
- Set api url to client:
1. Click "OPEN PORT" button and type 5000(server-port)
2. Copy the url of open tab
3. Edit docker-compose file
4. Paste url to "REACT_APP_SHORTENER_API_URL" arguments in client

- Run docker command
```bash
cd short_link
docker compose up
```

- Open web at port 3000!