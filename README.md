# capstone
Capstone for Brainstation Fall 2020

To run
------
` cd client/ && npm run dev`

`$ cd server/ && npm run dev`

To create posts you must be an administrator, you can use the test admin account I created to create a post. 
username = Mason
password = password

Feel free to create a user for yourself to test the /register flow

You might run into some issues with the postgres database, I forgot I had the  .env file in my gitignore.
You might need to createdb of capstone2 for it to work as well as run a typeorm migration to create the db.

The .env file is 
`
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/capstone2
REDIS_URL=127.0.0.1:6379
PORT=8080
SESSION_SECRET=qowiueojwojfalksdjoqiwueo
CORS_ORIGIN=http://localhost:3000
`

I am in the process of uploading to a liveserver and should have it online by Christmas, I will shoot you guys a message when it's live to make it easier for you. 
