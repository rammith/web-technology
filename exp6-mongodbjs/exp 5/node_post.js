const http = require('http');
const querystring = require('querystring');

function onRequest(request, response) {
    if (request.method === 'POST' && request.url === '/submit') {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', () => {
            const formData = querystring.parse(body);

            const name = formData["username"];
            const rollno = formData["rollNo"];
            const gender = formData["gender"];
            const mobile = formData["mobile"];
            const email = formData["email"];
            const password = formData["password"];
            const interest = formData["interest"];
            const languages = formData["languages"];

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
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(htmlResponse);
            response.end();
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
    }
}

http.createServer(onRequest).listen(8000);
console.log('Server has started...');