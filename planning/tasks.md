## FRONT END - HTML, CSS, JS, jQuery

- HTML
  - navigation bar (Tom)
  - login page (Tom)
  - list page (logged in user)
    - form for new task
  - routes
- SCSS (CSS)
  - page styling for nav bar, sign in page, and list view page
  - responsive design for mobile/desktop
- jQuery
  - add new task (show dynamically)
- Error Handling
  - display relevant message
- Category Modification
  - interface for users to change category (HTML, JS, jQuery)

## BACK END - node, express, postgres

- API integration
  - Connect with external APIs (Chat GPT, Google, Wolfram Alpha, IMDB, Amazon, Yelp).
  - Retrieve information for auto-categorization.
- Routes / DB (Katie)
 - Browse list tasks
 - Read details about task
 - Edit task category
 - Add new task
 - Delete task from list
- DB (Peter)
  - create tables
  - insert data into tables
- SQL Queries (Katie)
  - Add task to list
  - Update task status (complete/incomplete)
  - Add timestamp for creation and completion
  - Update category for task
  - Deleting task
- Error Handling
  - API calls
  - DB queries
  - Provide info to users
- Password hashing


## Ask Julian
- sign up for users (Stretch)
- profile edit (Stretch)
- chat GPT API?

## Answers
- Sign Up and Porfile Editing are stretch
- It is fine to use ChatGPT as an API to know which category the todo is
- It is also fine to look for keywords ("read", "watch", "eat", "buy"...) to guess which category it could be before doing any API call.

# NOTES

## HTML Pages
x /home (logged in user)
x /login (not logged in user)
- / for all - renders based on whether user is logged in or not

## Tables
- is_priority default is false
- is_complete default is false
- due_date NOT required
- description required


## HTML Links for js files

<body>
  <!-- Your HTML content -->

  <!-- Include tasks.js script -->
  <script src="/routes/tasks.js" defer></script>
</body>