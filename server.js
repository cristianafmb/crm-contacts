const express = require('express');
const cors = require('cors')
const app = express();
const server = http.createServer(app);

const usersRoutes = require('./routes/api/users');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/users', usersRoutes);

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

//app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

const port = process.env.PORT || 3000;
server.listen(port, ()=>{ console.log(`Server running on Port ${port}`); })