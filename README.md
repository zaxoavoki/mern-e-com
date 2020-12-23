# Projektowanie Baz Danych - Project 1 (sklep internetowy)

Project build with Express framework and MongoDB database.
Client side build with React.js.

## How to run?

1. Install Node.js >= 10.x
2. Copy this repo with `git clone`

### Server:

1. `cd server && npm install` 
2. Copy content of `.env.example` to `.env`
3. Run `npm run seed` to generate fake data
4. Run `npm run dev` or `start`

### Client:

1. `cd client && npm install`
2. Copy `.env` file from `.env.example`
3. Run `npm run start`

## To-do:

- [ ] Change structure of database with Mongo models
- [ ] Add ORM repositories
- [ ] Change controllers or add services
- [ ] On loading check if all ENV variables exist
- [ ] Add validation layer for documents
- [ ] Change `admin.middleware.js`

##### Explanation

 - Controllers work with requests and responses. Validating incoming data.
 - Services (models) work with repostories, manage already validated incoming data from controllers.
 - Repositories work with database.

 For our project we do not need so many abstraction layers. Let's put our controllers logic into services. 
 Probably, in future, we will fix it.  