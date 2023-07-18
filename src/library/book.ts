export interface Book {
  id: number
  title: string
  author: string
  pages: number
  read: boolean
}

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

export { bookData }
