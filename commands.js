const fs = require('fs');

///////////////////////////////insert book
const add = (id, title, body) => {
  let list = [];

  try {
    list = JSON.parse(fs.readFileSync('./newBooksData.json'));
  } catch(e) {
      console.log(e);
  }

  let index = list.findIndex((x) => x.id == id);

  if(index == -1){
    list.push({id, title, body});
    console.log(list)
  } else {
    list[index].title += title;
  }

  fs.writeFileSync('./newBooksData.json', JSON.stringify(list, null, 2));

}

///////////////////////delete book
const remove = (title) => {
    let list = [];

    try {
      list = JSON.parse(fs.readFileSync('./newBooksData.json'));
    } catch(e) {
        console.log(e);
    }

    const filteredList = list.filter( (x) => x.id != id);
    fs.writeFileSync('./newBooksData.json', JSON.stringify(filteredList, null, 2));

}


module.exports = {
  add, remove
}
