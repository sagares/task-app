# Tasks App

A MEAN stack app built with MongoDB and Angular for adding deleting tasks into different categories.

Node provides the RESTful API. Angular provides the frontend and accesses the API. MongoDB stores like a hoarder.

Following are the use case covered by the app:
- Sign in for users
- New users can sign up
- After sign in users can create multiple categories.
- Users can delete category
- User can add tasks to each category with title and description.
- Users can delete tasks.
- Users can logout of their account.

## Requirements

- [Node and npm](http://nodejs.org)
- MongoDB: Make sure you have your own local or remote MongoDB database URI configured in `config/database.js`

## Installation

1. Clone the repository: `git clone git@github.com:sagares/tasks-app`
2. Install the application: `npm install`
3. Place your own MongoDB URI in `config/database.js`
3. Start the server: `node server.js`
4. View in browser at `http://localhost:8080`
