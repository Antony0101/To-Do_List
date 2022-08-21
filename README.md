# To-Do_List

A nodejs backend for to-do list app.



# Running To-Do_List app

create .env file in root directory of app with keys "MONGO_URL", "PORT", "JWT_PRIVATE_KEY".
"MONGO_URL" is the url of mongodb database. eg MONGO_URL=mongodb+srv://user:password@cluster0.owtnv.mongodb.net
"PORT" is the network port on which server listens. eg PORT=4000
"JWT_PRIVATE_KEY" is the secret key of jwt token. eg JWT_PRIVATE_KEY=secret34566

Make sure that nodejs environment is working.
In root directory run
    npm i
    npm start


# API paths


## Authentication /auth

/auth/signup - Create a new user and returns the authentication token.

### request
http operation - POST
Header parameters - None
Path parameters - None
Request body - json
    userid - userid to create new user. Should be atleast 3 characters long. required field.
    password - password of the new user. Should be atleast 4 characters long. required field.
eg. {"userid":"john",
     "password":"pass123"
    }

### response
Response body - json
    success:
    message - "success"
    token - authentication token
    failure:
    message - "failed"
    error - error message


/auth/signin - authenticate a existing user and returns the authentication token.

### request
http operation - POST
Header parameters - None
Path parameters - None
Request body - json
    userid - userid to create new user. Should be atleast 3 characters long. required field.
    password - password of the new user. Should be atleast 4 characters long. required field.
eg. {"userid":"john",
     "password":"pass123"
    }

### response
Response body - json
    success:
    message - "success"
    token - authentication token
    failure:
    message - "failed"
    error - error message


/auth/signout - signout a user.

### request
http operation - POST
Header parameters - Bearer Token
Path parameters - None
Request body - None

### response
Response body - json
    success:
    message - "success"
    failure:
    message - "failed"
    error - error message


/auth/signoutall - signout a user from all devices.

### request
http operation - POST
Header parameters - Bearer Token
Path parameters - None
Request body - None

### response
Response body - json
    success:
    message - "success"
    failure:
    message - "failed"
    error - error message


## Task /task


/task/create - Create a new task.

### request
http operation - POST
Header parameters - Bearer Token
Path parameters - None
Request body - json
    name - Name of the task.
    priority - Priority of the task. Should be a integer in range 1-9.
eg. {"name":"task1",
     "priority":"3"
    }

### response
Response body - json
    success:
    message - "success"
    newtask - details of the created task.
    failure:
    message - "failed"
    error - error message

/task/create - Create a new task.

### request
http operation - POST
Header parameters - Bearer Token
Path parameters - None
Request body - json
    name - Name of the task.
    priority - Priority of the task. Should be a integer in range 1-9.
eg. {"name":"task1",
     "priority":"3"
    }

### response
Response body - json
    success:
    message - "success"
    newtask - details of the created task.
    failure:
    message - "failed"
    error - error message