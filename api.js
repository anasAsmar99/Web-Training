const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

///////////////////////////get all books
app.get('/Books', function(req, res){
    fs.readFile(__dirname + "/newBooksData.json", 'utf8', function(err, data){
      try{
        console.log(data);
        res.end(data);
      } catch(err) {
          console.log(err);
      }
    });
})

//////////////////////////get book by id
app.get('/Books/:id', function (req, res) {
  fs.readFile( __dirname + "/newBooksData.json", 'utf8', function (err, data) {
    try{
      const books = JSON.parse(data);
      const book = books[[req.params.id] - 1]
      console.log(book);
      res.end(JSON.stringify(book));
    } catch(err){
      console.log(err);
    }
  });
})

//////////////////////add new book
app.post('/Books', function(req, res){
  console.log(req.body);
  let list = [];
  fs.readFile(__dirname + "/newBooksData.json", 'utf8', function(err, data){
    try {
      data = JSON.parse(data);
      list = data;
      list.push(req.body);
      fs.writeFileSync('./newBooksData.json', JSON.stringify(list, null, 2));
      res.end(JSON.stringify(list));
    } catch(err) {
      console.log(err);
    }
  });
})

/////////////////////////////update book
app.put('/Books/:id', function(req, res){
  console.log(req.body);
  let list = [];
  fs.readFile(__dirname + "/newBooksData.json", 'utf8', function(err, data){
    try {
      data = JSON.parse(data);
      data = data.filter(x => x.id != req.params.id);
      list = data;
      let id = req.params.id;
      if(id == req.params.id)
      {
          list.splice(id-1, 0, req.body);
      }
      fs.writeFileSync('./newBooksData.json', JSON.stringify(list, null, 2));
      res.end(JSON.stringify(data));
    } catch(err) {
      console.log(err);
    }
  });
})

///////////////////delete book by id
app.delete('/Books/:id', function (req, res) {
  let list = [];
  fs.readFile(__dirname + "/newBooksData.json", 'utf8', function (err, data) {
    try{
      data = JSON.parse(data);
      data = data.filter(x => x.id != req.params.id);
      list = data;
      console.log(data);
      fs.writeFileSync('./newBooksData.json', JSON.stringify(list, null, 2));
      res.end(JSON.stringify(list));
    } catch(err) {
      console.log(err);
    }
  });
});

const server = app.listen(8080, function(){
    const host = server.address().address
    const port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})
