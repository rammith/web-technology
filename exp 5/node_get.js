const http = require('http');
const url = require('url');
const querystring = require('querystring');

function onRequest(request, response) {
    const path = url.parse(request.url).pathname;
    console.log('Request for ' + path + ' received.');

    const query = url.parse(request.url).query;
    console.log(query);
    const queryParams = querystring.parse(query);

    const name = queryParams["username"];
    const rollno = queryParams["rollNo"];
    const gender = queryParams["gender"];
    const mobile = queryParams["mobile"];
    const email = queryParams["email"];
    const password = queryParams["password"];
    const interest = queryParams["interest"];
    const languages = queryParams["languages"];

    const htmlResponse = `
        <html>
        <head>
            <title>Details</title>
            <style> 
               
                table {
                    width: 80%;
                    margin: auto;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ccc;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
            </style>
        </head>
        <body>
            <h1 style="text-align: center;">Details</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Gender</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Area of Interest</th>
                    <th>Languages Known</th>
                </tr>
                <tr>
                    <td>${name}</td>
                    <td>${rollno}</td>
                    <td>${gender}</td>
                    <td>${mobile}</td>
                    <td>${email}</td>
                    <td>${password}</td>
                    <td>${interest}</td>
                    <td>${languages}</td>
                </tr>
            </table>
        </body>
        </html>
    `;
    response.write(htmlResponse);
    response.end();
}

http.createServer(onRequest).listen(8000);
console.log('Server has started...');