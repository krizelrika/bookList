# Book Tracker
A simple library management app built with HTML, CSS, and JavaScript, where users can add, display, remove, and update the read status of books. This project follows The Odin Project curriculum.

## Features
- Book constructor for creating book objects with:
    * title
    * author
    * pages
    * read status (true/false)
    * Unique id generated using crypto.randomUUID()
- Add new books via a form (with event.preventDefault() to stop page reload).
- Display all books in a card-style layout.
- Remove books from the library with a single click.
- Toggle read status on each book using a prototype function.
- Separation of concerns:
    * Book data stored in an array (myLibrary).
    * Display handled separately by DOM manipulation.

## Tech Stack
- HTML5 → semantic structure
- CSS3 (Flexbox/Grid) → layout and styling
- JavaScript (ES6) → dynamic book creation and DOM manipulation

## How It Works
- Click "New Book" → form appears.
- Fill in book details → click Add Book.
- Book gets added to the myLibrary array and displayed on the page.
- Each book card has:
    * Remove button → deletes book by id.
    * Toggle Read button → calls prototype method toggleRead() to switch status.

## Possible Future Improvements
- Add form validation (title required, pages > 0, etc.).
- Use localStorage to persist books across page reloads.
- Improve styling with animations/hover effects.
- Make layout responsive for mobile.
- Add categories/tags for filtering books.