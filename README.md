# FullStackPractice

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

This is a website which I've created for practice and am using it to explore and practice things in both FE and BE.

### Step 0: Technologies, 3rd party libraries used

Front-end:

1. Angular, Html, Scss, Javascript
2. Bootstrap

Back-end:

1. NodeJs, Express
2. Nodemon, body-parser

### Step 1: UI Layout on high level

Header
  Contains all the navbar options and is responsive
  - Placeholder for logo
  - Home
  - User Management
  - Authentication
Content
  Contains main content of the application
Footer
  A sticky footer having some random text as placeholder

### Step 2: Home

Lists files uploaded to server. Contains four columns:
  1. Image
  2. Filepath
  3. Type
  4. Size
  5. Actions - Delete button to delete the uploaded file

Form to upload file.

Both were responsive and aligned to the center of the page

**Important Note**: Max file size is 10mb. Backend is storing it in the file system and the api endpoint is built properly in Node express.

### Step 3: User Management

Just a place holder component.

### Step 3: Authentication

Contains a form with fields:
  Email
  Password
  Conform Password - shows when the form is on Signup mode
  Button to either Login or Signup

Error validation has been implemented.
  Email - should be in email format
  Password - Must be of 8 char containing uppercase char, special char and a number
  Conform password - Must be same as password

**Important Note**: Test case is written for this file.

### Other info's:

Project is well structured in both the Frontend and Backend.

Front and backend is integrated and can communicate with each other.

All components were standalone.

Built UI layout such that it is scalable and manageable.

In backend, everything is properly folderized and is scalable and manageable. In we want to add any api endpoints,
we can add it very easily and can hanlde it.

Provided provision to store data to the DB through Model and can esaily link it to Node.
