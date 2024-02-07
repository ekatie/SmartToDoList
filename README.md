# Smart To Do List App

## Description

When you are recommended something it's not always easy to jot it down for later in an organized fashion. Adding the item to your phone or computer ends up taking time and opening up the right app is only part of the problem. You then have to locate the right list ("Movies to watch", "Books to read", etc.) to add to. And if you do get it in to the right list, you don't have much more context about it. This delay and lack of additional information acts as a huge deterrent.

The solution? A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list.

Categories:

- **To Watch** - movies, TV Series, etc.
- **To Eat** - restaurants, cafes, foods, etc.
- **To Read** - books, magazines, etc.
- **To Buy** - products
- **Miscellaneous** - everything else

Users can edit the auto-assigned category to suit their needs.

## Tech Stack

This project is built with the following technologies:

- **Frontend**: jQuery, JavaScript, Sass, CSS, HTML
- **Backend**: Express, Node.js
- **Database**: PostgreSQL, SQL

## Getting Started

Before setting up the project, ensure you have Node.js installed on your system. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, and it's necessary for running the application and its dependencies. You can download Node.js from https://nodejs.org/.

Follow these steps to get the application up and running:

1. Set up Environment Variables:

- Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
- Update the `.env` file with your correct local settings:
  - username: `labber`
  - password: `labber`
  - database: `midterm`

2. Install Dependencies:

- Install the project dependencies with npm: `npm install`.
- Fix to binaries for sass (if necessary): `npm rebuild node-sass`.

3. Database Setup:

- Reset the database to its initial state: `npm run db:reset`.
- Check the db folder to see what gets created and seeded in the database.

4. Run the Server:

- Start the server using nodemon: `npm run local`.
  - Note: Nodemon is used, so you should not have to restart your server manually after making changes to your code.

5. Access the Application:

- Visit `http://localhost:8080/` in your browser to access the application.

## Dependencies

This project relies on several third-party packages to function correctly. Below is a list of these dependencies and a brief description of their role in the project:

### Production Dependencies

- **chalk** (^2.4.2): A library for styling the text in the terminal with colors. Used to enhance the readability of console messages.
- **cookie-session** (^2.0.0): Middleware for Express.js to manage session data in cookies. It's used for session handling in the application.
- **dotenv** (^2.0.0): Loads environment variables from a .env file into process.env. This package is crucial for managing sensitive information such as database passwords securely.
- **ejs** (^3.1.9): A templating engine used to generate HTML markup with plain JavaScript. It's used for rendering views in this application.
- **express** (^4.17.1): The core framework for our server, providing a robust set of features for web and mobile applications.
- **morgan** (^1.9.1): HTTP request logger middleware for node.js, used for logging request details which helps in debugging.
- **openai** (^4.20.1): A Node.js client library for accessing OpenAI APIs, enabling the integration of AI functionalities.
- **pg** (^8.5.0): PostgreSQL client for Node.js. It's used to connect and interact with the PostgreSQL database.
- **sass** (^1.35.1): A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS). Used for writing cleaner stylesheets.

### Development Dependencies

- **nodemon** (^2.0.22): A utility that monitors for any changes in your source and automatically restarts your server. Ideal for development to improve efficiency.

Ensure you have Node.js installed on your system to use these packages. You can install the dependencies by running npm install in the project directory.
