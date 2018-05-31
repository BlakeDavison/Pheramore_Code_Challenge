This is a simple API made by Blake Davison

It was made with the instruction gotten from https://jobs.pheramor.com/assessment/NodeJS

In order to run this you will need a local MySQL database running on the default port and run the code:
CREATE DATABASE test;
You will also need a user for this db with the user name test and the password asdf.

The way that race and religion are optional is to pass an empty string.

The pictures will upload to an uploads folder, as there is no front end I cannot store the current user, and as such cannot store it with a reference to the user, but if I could I would just store an email reference and a file path.

For the MySQL server I am running the old authentication. I am unsure if that will make a difference.
