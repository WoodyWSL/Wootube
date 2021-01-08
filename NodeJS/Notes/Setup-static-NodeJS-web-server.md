***Author: Woody Wong***  
***Date: 2021-01-09***  

---  
# Setup Static NodeJS based Web Server
## Step 1: Require the necessary module
Require (import) `http` core module.  
```JavaScript
const http = require("http");
```
Also, since your web server probably would need to read & write file, it is a good idea to require (import) `fs` and `path` modules as well.
```JavaScript
const fs = require("fs");
const path = require("path");
```
## Step 2: Create Server
Before we create the server, we can first establish our `hostname` and the `port` that we would use. In this example, we would use `localhost` as the hostname and `3000` as the port.
```JavaScript
const hostname = "localhost";
const port = 3000;
```
Now, is time to create the server!  
```JavaScript
const server = http.createServer ((req, res) => {
    ...
});
```
The parameter of `http.createServer()` is a **callback function**. That function would be executed when there is a HTTP request to the server. So, the HTTP request should be handled in this function.
### Handle the HTTP requests - Inside the callback function
As we mention, inside the callback function, we should handle the HTTP request. We want to handle the HTTP request by the following,  
  1. Log the request info. to the console.
  2. Check if the request method is `GET`. If not, response a `404 Error`.
  3. Check if the request file is a `.html` file. If not, response a `404 Error`.
  4. Check if the request file exists in our server. If not, response a `404 Error`.
  5. If the request passed all the above conditions, then response the request html file to the client (browser).  

#### 1. Log the request info. to the console
```JavaScript
console.log("Request for " + req.url + " by method " + req.method);
```
#### 2. Check if the request method is `GET`. If not, response a `404 Error`
```JavaScript
// console.log("Request for " + req.url + " by method " + req.method);

if (req.method == "GET") {
    var fileUrl;
    if (req.url == '/') fileUrl = "/index.html";
    else fileUrl = req.url;

    //...
}
else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>Error 404: " + req.method + 
        " not supported</h1></body></html>");
    return;
}
```
#### 3. Check if the request file is a `.html` file. If not, response a `404 Error`
```JavaScript
// console.log("Request for " + req.url + " by method " + req.method);

// if (req.method == "GET") {
//     var fileUrl;
//     if (req.url == '/') fileUrl = "/index.html";
//     else fileUrl = req.url;

    var filePath = path.resolve("./public" + fileUrl);
    var fileExt = path.extname(filePath);
    if (fileExt == ".html") {
        //...
    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<html><body><h1>Error 404: " + fileUrl + 
            " not an HTML file</h1></body></html>");
        return;
    }
// }
// else {
//     res.statusCode = 404;
//     res.setHeader("Content-Type", "text/html");
//     res.end("<html><body><h1>Error 404: " + req.method + 
//         " not supported</h1></body></html>");
//     return;
// }
```
#### 4. Check if the request file exists in our server. If not, response a `404 Error`
```JavaScript
// console.log("Request for " + req.url + " by method " + req.method);

// if (req.method == "GET") {
//     var fileUrl;
//     if (req.url == '/') fileUrl = "/index.html";
//     else fileUrl = req.url;

//     var filePath = path.resolve("./public" + fileUrl);
//     var fileExt = path.extname(filePath);
//     if (fileExt == ".html") {
        fs.exists(filePath, (exists) => {
            if (!exists) {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/html");
                res.end("<html><body><h1>Error 404: " + fileUrl + 
                    " not found</h1></body></html>");
                return;
            }
            else {
                //...
            }
//         });
//     }
//     else {
//         res.statusCode = 404;
//         res.setHeader("Content-Type", "text/html");
//         res.end("<html><body><h1>Error 404: " + fileUrl + 
//             " not an HTML file</h1></body></html>");
//         return;
//     }
// }
// else {
//     res.statusCode = 404;
//     res.setHeader("Content-Type", "text/html");
//     res.end("<html><body><h1>Error 404: " + req.method + 
//         " not supported</h1></body></html>");
//     return;
// }
```
#### 5. If the request passed all the above conditions, then response the request html file to the client (browser)
```JavaScript
// console.log("Request for " + req.url + " by method " + req.method);

// if (req.method == "GET") {
//     var fileUrl;
//     if (req.url == '/') fileUrl = "/index.html";
//     else fileUrl = req.url;

//     var filePath = path.resolve("./public" + fileUrl);
//     var fileExt = path.extname(filePath);
//     if (fileExt == ".html") {
//         fs.exists(filePath, (exists) => {
//             if (!exists) {
//                 res.statusCode = 404;
//                 res.setHeader("Content-Type", "text/html");
//                 res.end("<html><body><h1>Error 404: " + fileUrl + 
//                     " not found</h1></body></html>");
//                 return;
//             }
//             else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                fs.createReadStream(filePath).pipe(res);
//             }
//         });
//     }
//     else {
//         res.statusCode = 404;
//         res.setHeader("Content-Type", "text/html");
//         res.end("<html><body><h1>Error 404: " + fileUrl + 
//             " not an HTML file</h1></body></html>");
//         return;
//     }
// }
// else {
//     res.statusCode = 404;
//     res.setHeader("Content-Type", "text/html");
//     res.end("<html><body><h1>Error 404: " + req.method + 
//         " not supported</h1></body></html>");
//     return;
// }
```
### Lets combine them together!
```JavaScript
const server = http.createServer ((req, res) => {
    console.log("Request for " + req.url + " by method " + req.method);

    if (req.method == "GET") {
        var fileUrl;
        if (req.url == '/') fileUrl = "/index.html";
        else fileUrl = req.url;

        var filePath = path.resolve("./public" + fileUrl);
        var fileExt = path.extname(filePath);
        if (fileExt == ".html") {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/html");
                    res.end("<html><body><h1>Error 404: " + fileUrl + 
                        " not found</h1></body></html>");
                    return;
                }
                else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/html");
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        }
        else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end("<html><body><h1>Error 404: " + fileUrl + 
                " not an HTML file</h1></body></html>");
            return;
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<html><body><h1>Error 404: " + req.method + 
            " not supported</h1></body></html>");
        return;
    }
});
```
## Step 3: Quiet and Listen! - Launch the server
Wonderful! We are already finish the setting of the server. The remaining work is only Launch the server. `server.listen()` is the function that we would use to make the server to listen a specific port and then response to the request.
```JavaScript
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
``` 