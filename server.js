const express = require('express');
const config = require('./server/configure');
const app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);

// app.get('/', (req, res)=>{
//     res.send('Hello World!!');
// });

app.listen(app.get('port'), ()=>{
    console.log('Server up: http://localhost:' + app.get('port'))
});