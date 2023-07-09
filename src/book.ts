import Header from "./header.ts";

const bookData: Book[] = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 336,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 224,
  },
  {
    title: "To the Lighthouse",
    author: "Virginia Woolf",
    pages: 209,
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    pages: 720,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    pages: 288,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: 1178,
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    pages: 671,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    pages: 309,
  },
];

const LIBRARY: Book[] = [];

type Book = {
  title: string;
  author: string;
  pages: number;
  read?: Boolean;
  info?: Function;
};

function Book(
  this: Book,
  title: string,
  author: string,
  pages: number,
  read: boolean = false
) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages.`;
};

function addMainHeading(): undefined {
  const appEl = document.querySelector<HTMLDivElement>("#app");
  appEl?.insertAdjacentText("afterbegin", "Welcome to the Book Store!");
  appEl?.insertAdjacentHTML("afterbegin", Header("JS Foundations"));
}

function addBook(book: Book): undefined {
  LIBRARY.push(book);
}

function displayBooks(): undefined {
  LIBRARY.forEach((book: Book, i: number) => {
    const bookCard = `
      <div class="book-card">
        <h2 class="book-card__title">${book.title}</h2>
        <p class="book-card__author">By: ${book.author}</p>
        <p class="book-card__pages">${book.pages} pages</p>
      </div>
    `;
    insertBook(bookCard);
  });
}

function createBookCard(
  title: FormDataEntryValue | null,
  author: FormDataEntryValue | null,
  pages: FormDataEntryValue | null
): string {
  return `
    <div class="book-card">
      <h2 class="book-card__title">${title}</h2>
      <p class="book-card__author">By: ${author}</p>
      <p class="book-card__pages">${pages} pages</p>
    </div>
  `;
}

function createBookFromFormData(formData: FormData): undefined {
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  insertBook(createBookCard(title, author, pages));
}

function insertBook(bookHTML: string): undefined {
  const bookContEl = document.querySelector<HTMLDivElement>(".book-container");
  bookContEl?.insertAdjacentHTML("beforeend", bookHTML);
}

function generateMockData(count: number) {
  for (let i = 0; i < count; ++i) {
    const data = bookData[i];
    const newBook: Book = new (Book as any)(
      data.title,
      data.author,
      data.pages
    );
    addBook(newBook);
  }
}

// Events

// Form Modal
document
  .querySelector<HTMLButtonElement>(".new-button")
  ?.addEventListener("click", (e) => {
    // TODO: Add toggle of hidden/visible
    e.preventDefault();
    const dialogEl = document.querySelector<HTMLFormElement>(".form-modal");
    if (dialogEl) {
      dialogEl.showModal();
    } else {
      console.error(".form-modal element missing");
    }
  });

document
  .querySelector<HTMLDialogElement>(".form-modal")
  ?.addEventListener("cancel", () => {
    const formEl = document.querySelector<HTMLFormElement>(".book-form");
    if (formEl instanceof HTMLFormElement) {
      formEl.reset();
    }
  });

document
  .querySelector<HTMLFormElement>(".book-form")
  ?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (form instanceof HTMLFormElement) {
      const formData = new FormData(form);
      createBookFromFormData(formData);
      form.reset();
      document.querySelector<HTMLDialogElement>(".form-modal")!.close();
    } else {
      console.error("Form Element missing");
    }
  });

// Program Start
addMainHeading();
generateMockData(3);
displayBooks();
