class Book {
    constructor(id, title, author, releaseYear, reviews) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.releaseYear = releaseYear;
        this.reviews = reviews;
    }

    getId = () => this.id;

    getTitle = () => this.title;

    getAuthor = () => this.author;

    getReleaseYear = () => this.releaseYear;

    setId = newId => {
        this.id = newId;
    }

    setTitle = newTitle => {
        this.title = newTitle;
    }

    setAuthor = newAuthor => {
        this.author = newAuthor;
    }

    setReleaseYear = newReleaseYear => {
        this.releaseYear = newReleaseYear;
    }
}

export default Book;