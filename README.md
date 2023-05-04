# BookFace



# Social Network API

This is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and add friends to their network.

## Technologies used

* JavaScript
* Node.js
* Express.js
* Mongoose
* MongoDB

## Models

### User

* **username**: String, unique, required, trimmed
* **email**: String, required, unique, must match a valid email address
* **thoughts**: Array of _id values referencing the Thought model
* **friends**: Array of _id values referencing the User model (self-reference)

#### Virtual

* **friendCount**: retrieves the length of the user's friends array field on query.

### Thought

* **thoughtText**: String, required, must be between 1 and 280 characters
* **createdAt**: Date, default value set to the current timestamp, uses a getter method to format the timestamp on query
* **username**: String, required
* **reactions**: Array of nested documents created with the Reaction schema

#### Virtual

* **reactionCount**: retrieves the length of the thought's reactions array field on query.

### Reaction

* **reactionId**: Mongoose ObjectId data type, default value set to a new ObjectId
* **reactionBody**: String, required, 280 character maximum
* **username**: String, required
* **createdAt**: Date, default value set to the current timestamp, uses a getter method to format the timestamp on query

This is used as the reaction field's subdocument schema in the Thought model.

## API Routes

### /api/users

* GET all users
* GET a single user by its _id and populated thought and friend data
* POST a new user
* PUT to update a user by its _id
* DELETE to remove user by its _id
  * When a user is deleted, associated thoughts are also deleted.

### /api/users/:userId/friends/:friendId

* POST to add a new friend to a user's friend list
* DELETE to remove a friend from a user's friend list

### /api/thoughts

* GET to get all thoughts
* GET to get a single thought by its _id
* POST to create a new thought (pushes the created thought's _id to the associated user's thoughts array field)
* PUT to update a thought by its _id
* DELETE to remove a thought by its _id

### /api/thoughts/:thoughtId/reactions

* POST to create a reaction stored in a single thought's reactions array field
* DELETE to pull and remove a reaction by the reaction's reactionId value

## Installation

1. Clone the repository
2. Navigate to the project directory in the terminal
3. Install the dependencies by running `npm install`
4. Start the server by running `npm start`

## Usage

This API can be used to power a social network web application. Using tools like Postman, developers can make HTTP requests to the API endpoints to interact with the database and retrieve or modify data.

## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
