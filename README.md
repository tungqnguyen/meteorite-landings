# Meteorite Landings

This project uses the MERN stack. It will display list of meteorites landings by year or by class of meteorite (recclass). It can sort the list by mass in ascending order. 

The list of meteorites can either be display by a table or a Map using Open Street Map with landing spots.

### Setup

This project use MongoDB for database, hence, please download MongoDB before running the project.

1. Please visit [MongoDB download page](https://www.mongodb.com/download-center/community) and download version 4.2.1

2. After installing MongoDB, initialize the database by locating to ```project\backend\database``` and run command ```node createDb.js``` in your terminal to create the database and collection.

3. Import JSON file into database:

      From your terminal, locate to ```path\to\MongoDB\Server\4.2\bin``` where your MongoDB is installed, default is ```C:\Program Files\MongoDB\Server\4.2\bin```

      Then from the terminal, run command with the path to the JSON meteorites data: 
      ```
      mongoimport --db mydb --collection meteorites --file "your\path\to\nasa-meteorites.json" --jsonArray
      ```
      Example: ```mongoimport --db mydb --collection meteorites --file "D:\zwift-code-exercise\backend\database\nasa-meteorites.json" --jsonArray```
      This will import the JSON array into MongoDB collection "meteorites"

### Run Project

After installing MongoDB, creating the database and collection, import the JSON data, we are ready to run our project.

1. Run the server by locating to ``` project\backend\server ``` and run command ```node server.js```

2. Now, open a new terminal to run the fron-end application. 

  From the project directory, run ```npm start``` to start the front-end React application.
