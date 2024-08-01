const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017'; // Replace 'localhost' and '27017' with your MongoDB server details
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

async function onRequest(req, res) {
    const path = url.parse(req.url).pathname;
    console.log('Request for ' + path + ' received');

    const query = url.parse(req.url).query;
    const params = querystring.parse(query);
    const username = params["username"];
    const rollNo = params["rollNo"];
    const gender = params["gender"];
    const mobile = params["mobile"];
    const email = params["email"];
    const password = params["password"];
    if (req.url.includes("/insert")) {
        await insertData(req, res, username, rollNo, mobile,gender,email,password);
    } else if (req.url.includes("/delete")) {
        await deleteData(req, res, rollNo);
    } else if (req.url.includes("/update")) {
        await updateData(req, res, rollNo, mobile);
    } else if (req.url.includes("/display")) {
        await displayTable(req, res);
    }
}

async function insertData(req, res, username, rollNo, mobile,gender,email,password) {
    try {
        const database = client.db('studentForm'); // Replace 'yourDatabaseName' with your actual database name
        const collection = database.collection('students');

        const students = {
            username,
            rollNo,
            mobile,
            email,
            gender,
            password
        };

        const result = await collection.insertOne(students);
        console.log('${result.insertedCount} document inserted');

        // HTML content for displaying the message in a table
        const htmlResponse = `
            <html>
                <head>
                    <title>User Details</title>
                    <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    
                    h2 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    
                    th, td {
                        padding: 10px;
                        text-align: center;
                        border-bottom: 1px solid #ddd;
                    }
                    
                    th {
                        background-color: #f2f2f2;
                        text-align: center;
                    }
                    
                    a {
                        display: block;
                        text-align: center;
                        margin-top: 20px;
                        text-decoration: none;
                        color: #007bff;
                    }
                    
                    a:hover {
                        text-decoration: underline;
                    }
                    
                    </style>
                </head>
                <body>
                    <h2>User Details</h2>
                    <table>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>${username}</td>
                        </tr>
                        <tr>
                            <td>Rollno</td>
                            <td>${rollNo}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${email}</td>
                        </tr>
                        <tr>
                            <td>Mobile No</td>
                            <td>${mobile}</td>
                        </tr>
                        <tr>
                            <td>gender</td>
                            <td>${gender}</td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>${password}</td>
                        </tr>
                    </table>
                    <a href="/display">View Inserted Table</a>
                </body>
            </html>
        `;

        // Write the HTML response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlResponse);
        res.end();
    } catch (error) {
        console.error('Error inserting data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function deleteData(req, res, rollNo) {
    try {
        const database = client.db('studentForm'); // Replace 'yourDatabaseName' with your actual database name
        const collection = database.collection('students');

        // Construct the filter based on the employee ID
        const filter = { rollNo: rollNo };

        const result = await collection.deleteOne(filter);
        console.log('${result.deletedCount} document deleted');

        // Respond with appropriate message
        if (result.deletedCount === 1) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Document deleted successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Document not found');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function updateData(req, res, rollNo, newPhoneno) {
    try {
        const database = client.db('studentForm'); // Replace 'yourDatabaseName' with your actual database name
        const collection = database.collection('students');

        // Construct the filter based on the employee ID
        const filter = { rollNo:rollNo };

        // Construct the update operation to set the new phoneno
        const updateDoc = {
            $set: { mobile: newPhoneno } // Assuming 'mobileNo' is the field to update
        };

        const result = await collection.updateOne(filter, updateDoc);
        console.log('${result.modifiedCount} document updated');

        // Respond with appropriate message
        if (result.modifiedCount === 1) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Phone number updated successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Employee ID not found');
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}
 

// Create HTTP server
http.createServer(onRequest).listen(7050);
console.log('Server is running...');