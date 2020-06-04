## REST API School
In this project I've created a REAST API using Express. It lets users administrate my imaginary school database of courses. It uses SQLite database, Node.js and Express to create API routes, Sequelize ORM for data modeling and validation. The database configuration was set with Sequelize CLI.    
### What it is doing
* Application lets users administrate database of courses. The user can browse, edit or even delete existing courses and add new ones.
* Application has a database of users.
* To make any changes the user has to be logged in, if the user doesn't have account new account can be created. Without account the user can only browse existing courses.  
### How does it work
* This app has two kind of routes: users and courses routes. GET users route show current logged in user, POST user route creates a new user. Course routes shows existing courses, details of chosen course and let us add, update or delete courses.  
* App uses authentication middleware so unauthorized users cannot make changes. If an unauthorized user ties to make changes app throws error with message: 'Access Denied, Please Log in'.
* When the user tries to access not existing course page or not existing route error will be shown.
* If something went wrong with the server, global server error will be shown.
* All of the changes in an app will be executed in a database.
* A message is written to the console when the connection to a database is successfully open. Another message shows when the connection failed.     
### Overview of the Provided Project Files

* The `seed` folder contains a starting set of data for your database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
* We've included a `.gitignore` file to ensure that the `node_modules` folder doesn't get pushed to your GitHub repo.
* The `app.js` file configures Express to serve a simple REST API. We've also configured the `morgan` npm package to log HTTP requests/responses to the console. You'll update this file with the routes for the API. You'll update this file with the routes for the API.
* The `nodemon.js` file configures the nodemon Node.js module, runs your REST API.
* The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the project's dependencies.
* The `RESTAPI.postman_collection.json` file is a collection of Postman requests that you can use to test and explore your REST API.
* The `routes` folder contains all routes settings.
## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install

```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application.

```
npm start
```
## Testing Application
To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).<br>

To test and explore application use [Postman](https://www.postman.com) a popular application for testing REST APIs.
## Credits
This project uses [Sequelize](https://sequelize.org), [Sequelize-cli](https://www.npmjs.com/package/sequelize-cli), [SQLit](https://www.sqlite.org/index.html), [Express](https://expressjs.com) Framework, [morgan middleware](https://www.npmjs.com/package/morgan), [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing passwords
and starting files from [Treehouse](https://teamtreehouse.com).   
