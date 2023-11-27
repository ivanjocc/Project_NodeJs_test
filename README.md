# Twitter-like App

This is a simple Twitter-like application with basic features such as following users, posting tweets, and commenting on messages.

## Requirements

Make sure you have the following components installed before running the application:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/ivanjocc/Project_NodeJs.git

2. Install the dependencies:

	```bash
	cd your-project-name
	npm install
	
**Note**
- Ensure to set the following environment 
	```bash
	mongodb://localhost:27017/twitter
	PORT=3000

Please note that you need to adjust the MongoDB connection string and port according to your requirements.

3. Execution:

	Start the application with the following command:

	```bash
	npm start

The application will be available at http://localhost:3000 (or the port you have configured).

## Project Structure

- **middlewares:** Custom middleware (if necessary).
- **models**: Mongoose models for the database.
- **routes**: Express routes for managing HTTP requests.
- **views**: Pug templates for the user interface.
- **controllers**: Controller logic for managing requests.
- **public**: Static files (CSS, images, etc.).
- **app**.js: Main application file.

## Dependencies

- **express**: Web framework for Node.js.
- **mongoose**: ODM for MongoDB.
- **pug**: Template engine.
- **body**-parser: HTTP request body parser.


If you have any questions, please feel free to contact me.