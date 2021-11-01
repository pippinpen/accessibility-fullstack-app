# Full-Stack Accessibility App

## Intro

Ever wanted to make your class, event, party more accessible but don't know where to start?

This app helps you do just that!

Answer questions about what kind of event you're planning to make a personalised form for your attendees that asks all the right questions.

The app collates your responses in an easy-to-read format with a suggested timeline to help you plan and put on an event that everyone can make the most out of.

This is a MERN (MongoDB, Express, React and Node) app. Login with Auth0 to manage multiple events.

## Server

The server is an express server.

### API Routes

Routes begin with `/api/v1/`. The models are sent as `application/json`

- GET `/api/v1/users` - gets all users
- GET `/api/v1/users/1234` - gets the user with an id of `1234`
- POST `/api/v1/users` - adds a user
- PUT `/api/v1/users/1234` - updates the user with an id of `1234` with the data you send in the request body (only updated fields required) (404 if not found)
- DELETE `api/v1/users/1234`deletes the user with an id of`1234` (404 if not found)
