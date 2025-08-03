class Book {
    #title;
    #author;
    #available;
    constructor(title,author,available){
        this.#title = title;
        this.#author = author;
        this.#available = available;
    }
    get author(){return this.#author;}
    get title(){return this.#title;}
    get available(){return this.#available;}

    borrow() {
        if (this.#available) {
          this.#available = false;
          console.log(`Borrowed "${this.#title}"`);
        } else {
          console.log("Not available.");
        }
      }
      
    returnBook(){
        if(!this.#available){
            this.#available=true;
            console.log(`The book: ${this.#title} is returned`);
        }
        else{ console.log(`The book: ${this.#title} is not borrowed`)}
    }
    display(){
        console.log(`"${this.#title}"
            by "${this.#author}" 
            - ${this.#available? "Available":"Borrowed"}`);
    }
}


class User{
    constructor(name){
        this.name= name;
        this.borrowedBook = [];
    }
    borrowbook(book){
        if(!this.borrowedBook.includes(book)){
            this.borrowedBook.push(book);
            book.borrow();
            console.log(`${this.name} borrowed ${book.title}`);
        }
        else{ console.log(`The book: ${book} is not borrowed`);}

    }
    returnBook(book){
        const index = this.borrowedBook.indexOf(book);
        if(index !== -1){
            this.borrowedBook.splice(index,1);
            book.returnBook();
            console.log(`${this.name} has returned ${book.title}`);
        }
        else{ console.log(`The book: ${book.title} is not borrowed by ${this.name}`);}

    }
}
class Library{
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`Added "${book.title}" to the library.`);
    }    
    listAvailableBooks() {
        const availableBooks = this.books.filter(book => book.available);
        if (availableBooks.length === 0) {
            console.log("No books available now.");
        } else {
            console.log("List of Available Books:");
            availableBooks.forEach(book => {
                console.log(`"${book.title}" by "${book.author}"`);
            });
        }
    }    
    lendBook(book, user) {
        if (book.available) {
            user.borrowbook(book);
        } else {
            console.log(`"${book.title}" is currently not available.`);
        }
    }    
    acceptReturnedBook(book, user) {
        user.returnBook(book);
        if (!this.books.includes(book)) {
            this.books.push(book);
        }
    }  
    displayAllBooks() {
        if (this.books.length === 0) {
            console.log("Library is empty.");
        } else {
            console.log("Library Collection:");
            this.books.forEach(book => book.display());
        }
    }      
}

const b1 = new Book("Atomic Habits", "James Clear", true);
const b2 = new Book("1984", "George Orwell", true);

const user1 = new User("Arslan");
const lib = new Library();

lib.addBook(b1);
lib.addBook(b2);
lib.listAvailableBooks();

lib.lendBook(b1, user1);
lib.listAvailableBooks();

lib.acceptReturnedBook(b1, user1);
lib.listAvailableBooks();
