const btn = document.getElementById("btn");
const backdrop = document.getElementById("backdrop");
const addModal = document.getElementById("add-modal");
const title = document.getElementById("title");
const img = document.getElementById("image-url");
const rating = document.getElementById("rating");
const ul = document.getElementById("book-list")
const cancel = document.getElementById("cancel");
const empty = document.getElementById("entry-text")
const all = document.getElementById("delAll")

let itemId = 0;
let books = [];

const openModal = () => {
    addModal.classList.toggle("visible");
    backdrop.classList.toggle("visible");

    const addBtn = document.querySelector("#addBtn");
    addBtn.addEventListener("click", fillModal);
}

const delEmpty = () => {
    empty.style.display = "none"
}

const showEmpty = () => {
    empty.style.display = "block"
}

const clear = () => {
    title.value = "";
    img.value = "";
    rating.value = "";
}

const fillModal = () => {
    console.log(title.value);
    const book = {
        id: itemId++,
        title: title.value,
        url: img.value,
        rating: rating.value
    }
    clear();
    books.push(book);
    openModal();
    console.log(books);
    renderCard(book)
}

const close = () => {
    const closeModal = document.getElementById("add-modal");
    const closeBack = document.getElementById("backdrop")
    closeModal.style.display = "none";
    closeBack.style.display = "none";
    alert("You Didn't add a book!!")
}

const renderCard = (book) => {
    const {title, url, rating} = book;
    let li = document.createElement("li");
    li.setAttribute("class", "liItem")
    li.innerHTML = `<div class="book-element__image"><img src="${url}"></div>
    <div class="itemId">ID: <span>${itemId}</span>
    Title: <span>${title}</span>
    Rating: <span>${rating} / 5</span></div>`
    li.classList.add("book-element")
    ul.append(li);
    delEmpty()
    li.addEventListener("click", delCard.bind(this,book.id))
}

const delCard = function (id) {
    console.log(':::',id)
    let deleteIndex = 0;
    for (const book of books) {
        if(book.id == id)
        {
            break
        }
        deleteIndex++
    }

    books.splice(deleteIndex,1)
    var children = ul.children;
    ul.removeChild(children[deleteIndex]);
    if(books.length == 0)
    showEmpty()
    
}

const delAll = () => {
    const lis = document.querySelectorAll("#book-list li");
    for(var i=0;li=lis[i];i++){
        li.parentNode.removeChild(li);
    }
    showEmpty()
}

const result = document.getElementById("search")
const liCard = document.getElementById("liItem")

btn.addEventListener("click", openModal)
cancel.addEventListener("click", close)
all.addEventListener("click", delAll)
result.addEventListener("keyup", search)

function search () 
{
    //console.log('::::', result.value)
    a = books.filter( x => x.title.includes(result.value))
    //console.log(a, books)
    renderAllCards(a)
}

const renderAllCards = (book) => {
    for(let i =0;i <books.length;i++)
    {
        const {title, url, rating} = book;
        let li = document.createElement("li");
        li.setAttribute("class", "liItem")
        li.innerHTML = `<div class="book-element__image"><img src="${url}"></div>
        <div class="itemId">ID: <span>${itemId}</span>
        Title: <span>${title}</span>
        Rating: <span>${rating} / 5</span></div>`
        li.classList.add("book-element")
        ul.append(li);
        delEmpty()
        li.addEventListener("click", delCard.bind(this,book.id))
    }
}

