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
  LIBRARY.forEach((book: Book, idx: number) => {
    const bookContEl =
      document.querySelector<HTMLDivElement>(".book-container");
    bookContEl?.insertAdjacentHTML("beforeend", createBookCard(book));
  });
}

function createBookCard(book: Book): string {
  const { title, author, pages } = book;
  return `
    <div class="book-card">
      <h2 class="book-card__title">${title}</h2>
      <p class="book-card__author">By: ${author}</p>
      <p class="book-card__pages">${pages} pages</p>
      <button
        class="button button--remove button--sml remove-book"
        type="button">
        remove
      </button>
    </div>
  `;
}

function addBookToLibrary(
  title: string,
  author: string,
  pages: number
): undefined {
  const newBook: Book = {
    title: title,
    author: author,
    pages: pages,
  };
  addBook(newBook);
}

function addMockDataToLibrary(count: number) {
  for (let i = 0; i < count; ++i) {
    const { title, author, pages } = bookData[i];
    addBookToLibrary(title, author, pages);
  }
}

// Events
document
  .querySelector<HTMLButtonElement>("#newButton")
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

// CLEAR FORM ON MODAL CLOSE
document
  .querySelector<HTMLDialogElement>("#formModal")
  ?.addEventListener("cancel", () => {
    const formEl = document.querySelector<HTMLFormElement>(".book-form");
    if (formEl instanceof HTMLFormElement) {
      formEl.reset();
    }
  });

// ADD BOOK FROM UI TO LIBRARY
document
  .querySelector<HTMLFormElement>("#bookForm")
  ?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (form instanceof HTMLFormElement) {
      const formData = new FormData(form);
      const title = formData.get("title") as string;
      const author = formData.get("author") as string;
      const pages = parseInt(formData.get("pages") as string);

      if (title && author && pages) {
        addBookToLibrary(title, author, pages);
        displayBooks();
        form.reset();
        document.querySelector<HTMLDialogElement>(".form-modal")!.close();
      }
    } else {
      console.error("Form Element missing");
    }
  });

// REMOVE BOOK ON CLICK
document
  .querySelector<HTMLDivElement>("#bookContainer")
  ?.addEventListener("click", (e) => {
    if (e.target instanceof HTMLButtonElement) {
      const btn = e.target;
      if (!btn.classList.contains("remove-book")) {
        return;
      }

      if (btn.parentNode instanceof HTMLDivElement) {
        btn.parentNode?.remove();
      }
    }
  });

// Program Start
addMainHeading();
addMockDataToLibrary(3);
displayBooks();
