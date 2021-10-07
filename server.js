const fs = require('fs');


try {
  const jsonString = fs.readFileSync('./booksData.json', 'utf-8');
  const books = JSON.parse(jsonString);
  console.log(books);
}
catch(err) {
  console.log(err);
}

const newObject = {
  title: "Anas Mahmoud",
  body: "Back-end NodeJS"
}

fs.writeFile('./newBooksData.json', JSON.stringify(newObject, null, 2), err => {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully Written!");
  }
})



