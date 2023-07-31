import Header from './header.ts'

const bookData: Book[] = [
  {
    id: 0,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    pages: 336,
    read: false
  },
  {
    id: 1,
    title: '1984',
    author: 'George Orwell',
    pages: 328,
    read: false
  },
  {
    id: 2,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pages: 180,
    read: false
  },
  {
    id: 3,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    pages: 279,
    read: false
  },
  {
    id: 4,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    pages: 224,
    read: false
  },
  {
    id: 5,
    title: 'To the Lighthouse',
    author: 'Virginia Woolf',
    pages: 209,
    read: false
  },
  {
    id: 6,
    title: 'Moby-Dick',
    author: 'Herman Melville',
    pages: 720,
    read: false
  },
  {
    id: 7,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    pages: 288,
    read: false
  },
  {
    id: 8,
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    pages: 1178,
    read: false
  },
  {
    id: 9,
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    pages: 671,
    read: false
  },
  {
    id: 10,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 310,
    read: false
  },
  {
    id: 11,
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    pages: 309,
    read: false
  }
]

const LIBRARY: Book[] = []

interface Book {
  id: number
  title: string
  author: string
  pages: number
  read: boolean
}

function addMainHeading(): undefined {
  const appEl = document.querySelector<HTMLDivElement>('#app')
  appEl?.insertAdjacentHTML('afterbegin', Header('JS Foundations'))
}

function addBook(book: Book): undefined {
  LIBRARY.push(book)
}

function updateBook(
  bookId: string | undefined,
  action: string | undefined
): undefined {
  if (typeof bookId !== 'string' || action === undefined) return

  const book = LIBRARY.find((book) => book.id === parseInt(bookId, 10))
  if (book === undefined) return

  if (action === 'update') {
    book.read = !book.read
  }

  if (action === 'remove') {
    const bookIndex = LIBRARY.findIndex((libraryBook) => libraryBook === book)
    LIBRARY.splice(bookIndex, 1)
  }
}

function displayBooks(): undefined {
  const bookContEl = document.querySelector<HTMLDivElement>('.book-container')
  if (bookContEl !== null) {
    bookContEl.innerHTML = ''
    LIBRARY.forEach((book) => {
      bookContEl?.insertAdjacentHTML('beforeend', createBookCard(book))
    })
  } else {
    console.log('element with book-container class is missing')
  }
}

// TODO: We will need to track an id for the books.
//       We need to uniquely identify the book to update status.
function createBookCard(book: Book): string {
  const { id, title, author, pages, read } = book
  return `
    <div class="book-card" data-id="${id}">
      <h2 class="book-card__title">${title}</h2>
      <p class="book-card__author">By: ${author}</p>
      <p class="book-card__pages">${pages} pages</p>
      <span>${read ? "You've read this book" : ''}</span>  
      <button
        data-action="update"
        class="button button--${
          read ? 'read' : 'unread'
        } button--sml remove-book"
        type="button">
        ${read ? 'Unmark as Read' : 'Mark as Read'}
      </button>
      <button
        data-action="remove"
        class="button button--remove button--sml"
        type="button">
        remove
      </button>
    </div>
  `
}

function addBookToLibrary(
  id: number,
  title: string,
  author: string,
  pages: number,
  read: boolean
): undefined {
  const newBook: Book = {
    id,
    title,
    author,
    pages,
    read
  }
  addBook(newBook)
}

function addMockDataToLibrary(count: number): undefined {
  for (let i = 0; i < count; ++i) {
    const { id, title, author, pages, read } = bookData[i]
    addBookToLibrary(id, title, author, pages, read)
  }
}

// Events
document
  .querySelector<HTMLButtonElement>('#newButton')
  ?.addEventListener('click', (e) => {
    // TODO: Add toggle of hidden/visible
    e.preventDefault()
    const dialogEl = document.querySelector<HTMLFormElement>('.form-modal')
    if (dialogEl !== null) {
      dialogEl.showModal()
    } else {
      console.error('.form-modal element missing')
    }
  })

// CLEAR FORM ON MODAL CLOSE
document
  .querySelector<HTMLDialogElement>('#formModal')
  ?.addEventListener('cancel', () => {
    const formEl = document.querySelector<HTMLFormElement>('.book-form')
    if (formEl instanceof HTMLFormElement) {
      formEl.reset()
    }
  })

// ADD BOOK FROM UI TO LIBRARY
document
  .querySelector<HTMLFormElement>('#bookForm')
  ?.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target
    if (form instanceof HTMLFormElement) {
      const formData = new FormData(form)
      const formModal = document.querySelector<HTMLDialogElement>('.form-modal')
      const title = formData.get('title') as string
      const author = formData.get('author') as string
      const pages = parseInt(formData.get('pages') as string)

      if (title !== null && author !== null && pages !== null) {
        // TODO: Read status needs to be form driven.
        const newId = Math.max(...LIBRARY.map((book) => book.id)) + 1
        addBookToLibrary(newId, title, author, pages, false)
        displayBooks()
        form.reset()
        if (formModal !== null) {
          formModal.close()
        }
      }
    } else {
      console.error('Form Element missing')
    }
  })

// REMOVE BOOK ON CLICK
document
  .querySelector<HTMLDivElement>('#bookContainer')
  ?.addEventListener('click', (e) => {
    if (e.target instanceof HTMLButtonElement) {
      const btn = e.target
      const action = btn.dataset.action
      const bookCard = btn.parentNode
      if (!(bookCard instanceof HTMLDivElement)) return

      updateBook(bookCard.dataset.id, action)
      displayBooks()
    }
  })

// Program Start
addMainHeading()
addMockDataToLibrary(3)
displayBooks()
