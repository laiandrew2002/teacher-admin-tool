## Teacher Administrative Tool API

An API for the teachers to perform administrative functions for their students where teachers and students are identified by their email addresses.

## Development

The codebase is written entirely in JavaScript.

The API is based on Node.js together with [Express](https://expressjs.com/), [MySQL](https://www.mysql.com/) and Unit Testing using [Jest](https://jestjs.io/).

## Functionality

- Register students under teacher.
- Suspend a student.
- Retrieve students' email registered under teacher(s).
- Retrieve list of students can receive notifications from a teacher.

## How To Use

#### Prerequisites

The API assumes:

1. You have [MySQL Server](https://dev.mysql.com/downloads/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) installed.
2. You have [Node.js](https://nodejs.org/en/download/) installed.

#### Installation

Clone this repository, go into the folder and install the node modules:

```
npm install
```

#### Database Configuration 

Open the file and setup the **password** of your root user for your machine MySQL database.

`/db/env.js`



```
const env = {
    development: {
        database: 'school',
        username: 'root',
        password: 'secretpassword',
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        timezone: 'Asia/Singapore',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}
```

Kindly do the **Data Import** in your MySQL Workbench with the sql file in the directory below :

`/db/db-mysql.sql`

*It will create the database together with the tables with dummy data for unit testing*

#### Quick Start

```
npm start
```

#### Unit Testing

```
npm test
```


## Database

#### MySQL DB Schema Design

![](https://github.com/laiandrew2002/teacher-admin-tool/blob/master/admin-tool-schema.PNG)

## API Documentation

![](https://swagger.io/swagger/media/assets/images/swagger_logo.svg)

Swagger API Documentation UI is implemented in the project for easy understanding of the API. 
It can also work as a tool to test on the API.

#### Swagger API Documentation URL

URL: http://localhost:3000/api-docs

![](https://github.com/laiandrew2002/teacher-admin-tool/blob/master/swaggerScreen.PNG)

## API Routes:

*Host*: localhost

*Post*: 3000

| Request Method | URL Endpoint                                         |
| -------------- | ---------------------------------------------------- |
| POST           | /api/register                                        |
| GET            | /api/commonstudents?teacher=teachermel%40example.com |
| POST           | /api/suspend                                         |
| POST           | /api/retrievefornotifications                        |

#### Register Students

The students will be registered under the teacher.

Request body:

```
{
    "teacher": "teacherhaha@gmail.com",
    "students": [
        "studenteshan@gmail.com",
        "studentmel@gmail.com",
        "studentpam@gmail.com"
    ]
}
```

Response:

Status Code **204**

#### Retrieve List of Students Under Teacher(s)

It returns a list of students registered under the teacher in the query passed.

Request by Passing *teacher* Query:

```
/api/commonstudents?teacher=teachermel%40example.com
```

For students registered under 2 teachers:

```
/api/commonstudents?teacher=teachermolo%40gmail.com&teacher=teachermel%40gmail.com
```

Response Body:

```
{
    "students": [
        "studentalek@example.com",
        "studentpam@example.com",
        "studenthaha@gmail.com",
        "studenteshan@example.com"
    ]
}
```

#### Suspend a Student

The student will be suspended and will not be able to receive notifications.

Request Body:

```
{
	"student": "studenteshan@gmail.com"
}
```

Response:

Status Code **204**

#### Retrieve List of Students That Can Receive Notification 

It returns a list of students that can receive notifications, which registered under the teacher or mentioned in the notifications with the character '@'.

Request Body:

```
{
      "teacher": "teachermel@gmail.com",
      "notification": "Hello Students! @studentasdasd@gmail.com @studentdaniel@gmail.com"
}
```

Response Body:

```
{
      'students': [
            "studentalek@example.com",
            "studentpam@example.com",
            "studenthaha@gmail.com",
            "studentasdasd@gmail.com",
            "studentdaniel@gmail.com"
      ]
}
```





## Contributor

1. Andrew Lai : laiandrew2002@gmail.com
