// Global library array
let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add toggleRead method to Book prototype
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Function to add book to library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to display all books
function displayBooks() {
    const booksContainer = document.getElementById('booksContainer');
    const emptyState = document.getElementById('emptyState');
    
    // Clear existing books
    booksContainer.innerHTML = '';
    
    if (myLibrary.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = `book-card ${book.read ? 'read' : 'not-read'}`;
        bookCard.setAttribute('data-id', book.id);
        
        bookCard.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-pages">${book.pages} pages</div>
            <div class="book-status ${book.read ? 'status-read' : 'status-not-read'}">
                ${book.read ? '✓ Read' : '○ Not Read'}
            </div>
            <div class="book-actions">
                <button class="btn btn-toggle" onclick="toggleReadStatus('${book.id}')">
                    ${book.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button class="btn btn-remove" onclick="removeBook('${book.id}')">
                    Remove
                </button>
            </div>
        `;
        
        booksContainer.appendChild(bookCard);
    });
}

// Function to remove book
function removeBook(bookId) {
    // Find book index in array
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    
    if (bookIndex !== -1) {
        // Remove from array
        myLibrary.splice(bookIndex, 1);
        
        // Remove from DOM
        const bookCard = document.querySelector(`[data-id="${bookId}"]`);
        if (bookCard) {
            bookCard.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                displayBooks();
            }, 300);
        }
    }
}

// Function to toggle read status
function toggleReadStatus(bookId) {
    // Find book in array
    const book = myLibrary.find(book => book.id === bookId);
    
    if (book) {
        // Use prototype method to toggle
        book.toggleRead();
        
        // Update display
        displayBooks();
    }
}

// Modal functions
function openModal() {
    document.getElementById('bookModal').style.display = 'block';
    document.getElementById('title').focus();
}

function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
    document.getElementById('bookForm').reset();
}

// Form submission handler
document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;
    
    // Validate data
    if (title && author && pages > 0) {
        // Add book to library
        addBookToLibrary(title, author, pages, read);
        
        // Close modal and reset form
        closeModal();
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('bookModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Add some sample books for demonstration
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("1984", "George Orwell", 328, true);

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
`;
document.head.appendChild(style);