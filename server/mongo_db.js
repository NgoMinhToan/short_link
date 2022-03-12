const mongoose = require('mongoose')
let username = process.env.MONGO_USERNAME
let password = process.env.MONGO_PASSWORD
let databaseName = process.env.MONGO_DBNAME
mongoose.connect(`mongodb+srv://${username}:${password}@accounts.se1cj.gcp.mongodb.net/${databaseName}?retryWrites=true&w=majority`, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true
}).catch(err => console.log(err))
