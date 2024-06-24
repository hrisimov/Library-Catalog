const { test, expect } = require("@playwright/test");

// Navigation bar for guest users

test('verify "All Books" link is visible', async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("nav.navbar");
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);
});

test('verify "Login" button is visible', async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("nav.navbar");
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
});

test('verify "Register" button is visible', async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("nav.navbar");
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();
    expect(isRegisterButtonVisible).toBe(true);
});

// Navigation bar for logged-in users

test('verify "All Books" link is visible after user login', async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('input[type="submit"]');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);
});

test('verify "My Books" button is visible after user login', async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/catalog");
    const myBooksButton = await page.$('a[href="/profile"]');
    const isMyBooksButtonVisible = await myBooksButton.isVisible();
    expect(isMyBooksButtonVisible).toBe(true);
});

test('verify "Add Book" button is visible after user login', async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/catalog");
    const addBookButton = await page.$('a[href="/create"]');
    const isAddBookButtonVisible = await addBookButton.isVisible();
    expect(isAddBookButtonVisible).toBe(true);
});

test("verify user's email address is visible", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/catalog");
    const welcomeMessageSpan = await page.$("#user > span");
    const isWelcomeMessageSpanVisible = await welcomeMessageSpan.isVisible();
    expect(isWelcomeMessageSpanVisible).toBe(true);
});

// Login page

test("login with valid credentials", async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/catalog");
    expect(page.url()).toBe("http://localhost:3000/catalog");
});

test("login with empty input fields", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/login");
    expect(page.url()).toBe("http://localhost:3000/login");
});

test("login with empty email input field", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill("#password", "123456");
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/login");
    expect(page.url()).toBe("http://localhost:3000/login");
});

test("login with empty password input field", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill("#email", "peter@abv.bg");
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/login");
    expect(page.url()).toBe("http://localhost:3000/login");
});

// Register page

// test("register with valid values", async ({ page }) => {
//     await page.goto("http://localhost:3000/register");
//     await page.fill("#email", "username@gmail.com");
//     await page.fill("#password", "123456");
//     await page.fill("#repeat-pass", "123456");
//     await page.click('input[type="submit"]');
//     await page.waitForURL("http://localhost:3000/catalog");
//     expect(page.url()).toBe("http://localhost:3000/catalog");
// });

test("register with empty input fields", async ({ page }) => {
    await page.goto("http://localhost:3000/register");
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/register");
    expect(page.url()).toBe("http://localhost:3000/register");
});

test("register with empty email input field", async ({ page }) => {
    await page.goto("http://localhost:3000/register");
    await page.fill("#password", "123456");
    await page.fill("#repeat-pass", "123456");
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/register");
    expect(page.url()).toBe("http://localhost:3000/register");
});

test("register with empty password field", async ({ page }) => {
    await page.goto("http://localhost:3000/register");
    await page.fill("#email", "username@gmail.com");
    await page.fill("#repeat-pass", "123456");
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/register");
    expect(page.url()).toBe("http://localhost:3000/register");
});

test("register with empty confirm password field", async ({ page }) => {
    await page.goto("http://localhost:3000/register");
    await page.fill("#email", "username@gmail.com");
    await page.fill("#password", "123456");
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/register");
    expect(page.url()).toBe("http://localhost:3000/register");
});

test("register with different passwords", async ({ page }) => {
    await page.goto("http://localhost:3000/register");
    await page.fill("#email", "username@gmail.com");
    await page.fill("#password", "123456");
    await page.fill("#repeat-pass", "12345");
    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("Passwords don't match!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');
    await page.waitForURL("http://localhost:3000/register");
    expect(page.url()).toBe("http://localhost:3000/register");
});

// Add book page

// test("add book with correct data", async ({ page }) => {
//     await page.goto("http://localhost:3000/login");

//     await page.fill("#email", "peter@abv.bg");
//     await page.fill("#password", "123456");
//     await page.click('input[type="submit"]');

//     await page.waitForURL("http://localhost:3000/catalog");

//     await page.click('a[href="/create"]');

//     await page.waitForSelector("#create-form");

//     await page.fill("#title", "Test Book");
//     await page.fill("#description", "This is a test book description");
//     await page.fill("#image", "https://example.com/book-image.jpg");
//     await page.selectOption("#type", "Fiction");
//     await page.click('input[type="submit"]');

//     await page.waitForURL("http://localhost:3000/catalog");
//     expect(page.url()).toBe("http://localhost:3000/catalog");
// });

test("add book with empty title input field", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForURL("http://localhost:3000/catalog");

    await page.click('a[href="/create"]');

    await page.waitForSelector("#create-form");

    await page.fill("#description", "This is a test book description");
    await page.fill("#image", "https://example.com/book-image.jpg");
    await page.selectOption("#type", "Fiction");

    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');

    await page.waitForURL("http://localhost:3000/create");
    expect(page.url()).toBe("http://localhost:3000/create");
});

test("add book with empty description input field", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForURL("http://localhost:3000/catalog");

    await page.click('a[href="/create"]');

    await page.waitForSelector("#create-form");

    await page.fill("#title", "Test Book");
    await page.fill("#image", "https://example.com/book-image.jpg");
    await page.selectOption("#type", "Fiction");

    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');

    await page.waitForURL("http://localhost:3000/create");
    expect(page.url()).toBe("http://localhost:3000/create");
});

test("add book with empty image input field", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForURL("http://localhost:3000/catalog");

    await page.click('a[href="/create"]');

    await page.waitForSelector("#create-form");

    await page.fill("#title", "Test Book");
    await page.fill("#description", "This is a test book description");
    await page.selectOption("#type", "Fiction");

    page.on("dialog", async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("All fields are required!");
        await dialog.accept();
    });
    await page.click('input[type="submit"]');

    await page.waitForURL("http://localhost:3000/create");
    expect(page.url()).toBe("http://localhost:3000/create");
});

// All books page

test("verify all books are displayed", async ({ page }) => {
    await page.goto("http://localhost:3000/catalog");
    await page.waitForSelector(".other-books-list li");
    const bookElements = await page.$$(".other-books-list li");
    expect(bookElements).toHaveLength(3);
});

// test("verify no books are displayed", async ({ page }) => {
//     await page.goto("http://localhost:3000/catalog");
//     const noBooksMessage = await page.textContent(".no-books");
//     expect(noBooksMessage).toBe("No books in database!");
// });

// Details page

test("verify logged-in user sees book details button and it works", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForSelector(".otherBooks");

    await page.click(".otherBooks a.button");

    await page.waitForSelector(".book-information");

    const detailsPageTitle = await page.textContent(".book-information h3");
    expect(detailsPageTitle).toBe("To Kill a Mockingbird");
});


test("verify guest user sees book details button and it works", async ({ page }) => {
    await page.goto("http://localhost:3000/catalog");

    await page.waitForSelector(".otherBooks");

    await page.click(".otherBooks a.button");

    await page.waitForSelector(".book-information");

    const detailsPageTitle = await page.textContent(".book-information h3");
    expect(detailsPageTitle).toBe("To Kill a Mockingbird");
});

test("verify all book info is displayed correctly", async ({ page }) => {
    await page.goto("http://localhost:3000/catalog");

    await page.waitForSelector(".otherBooks");

    await page.click(".otherBooks a.button");

    await page.waitForSelector("#details-page");

    const bookTitle = await page.textContent(".book-information h3");
    const bookType = await page.textContent(".book-information .type");
    const bookImageElement = await page.$(".book-information img");
    const bookImageSrc = await bookImageElement.getAttribute("src");
    const bookDescription = await page.textContent(".book-description p");

    expect(bookTitle).toBe("To Kill a Mockingbird");
    expect(bookType).toBe("Type: Classic");
    expect(bookImageSrc).toBe("/images/book3.png");
    expect(bookDescription).toBe(
        'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.' +
        ' "To Kill A Mockingbird" became both an instant bestseller and a critical success when it was first published in 1960.' +
        ' It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.'
    );
});

test("verify edit and delete buttons are visible for book creator", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "john@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForSelector(".otherBooks");
    
    await page.click(".otherBooks a.button");

    await page.waitForSelector(".book-information");

    const [editButton, deleteButton] = await page.$$(".book-information .actions a");
    const isEditButtonVisible = await editButton.isVisible();
    const isDeleteButtonVisible = await deleteButton.isVisible();
    const editButtonText = await editButton.textContent();
    const deleteButtonText = await deleteButton.textContent();

    expect(isEditButtonVisible).toBe(true);
    expect(isDeleteButtonVisible).toBe(true);
    expect(editButtonText).toBe("Edit");
    expect(deleteButtonText).toBe("Delete");
});

test("verify edit and delete buttons are not visible for book non-creator", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForSelector(".otherBooks");

    await page.click(".otherBooks a.button");

    await page.waitForSelector(".book-information");

    const likeButtonText = await page.textContent(".book-information .actions a");
    expect(likeButtonText).not.toBe("Edit" || "Delete");
});

test("verify like button is not visible for book creator", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "john@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForSelector(".otherBooks");

    await page.click(".otherBooks a.button");

    await page.waitForSelector(".book-information");

    const buttonTexts = await page.$$eval(
        ".book-information .actions a",
        buttons => buttons.map(b => b.textContent)
    );
    expect(buttonTexts).not.toContain("Like");
});

test("verify like button is visible for book non-creator", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForSelector(".otherBooks");

    await page.click(".otherBooks a.button");

    await page.waitForSelector(".book-information");

    const likeButton = await page.$(".book-information .actions a");
    const isLikeButtonVisible = await likeButton.isVisible();
    const likeButtonText = await likeButton.textContent();

    expect(isLikeButtonVisible).toBe(true);
    expect(likeButtonText).toBe("Like");
});

// Logout functionality

test('verify "Logout" button is visible', async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForURL("http://localhost:3000/catalog");

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    const isLogoutLinkVisible = await logoutLink.isVisible();
    expect(isLogoutLinkVisible).toBe(true);
});

test('verify "Logout" button redirects correctly', async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.waitForURL("http://localhost:3000/catalog");

    await page.click('a[href="javascript:void(0)"]');
        
    await page.waitForURL("http://localhost:3000/");
    expect(page.url()).toBe("http://localhost:3000/");
});
