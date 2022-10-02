Note:
    ENVIRONMENT FILE IS Given to start the project quickly, don't upload the .env on Github etc.

Run the following to Start:
    npm i
    npm start

Question 1:
    When I saw question 1, it was clearly a simple crud operation with some basic logic validation and aggregation so I tried to keep it simple.

Question 2:
    It was about to create an api to fetch weather, since only authenticated user can access it so I implemented JSON web Token Authentication,
    and I used middleware to make sure only authenticated users can access it.

Question 3:
    I have to find users near the distance of 5km, well I tried to be generic and provided the facility to the users to increase or decrease the limit. Since its an API Am working with JSON. But to enhance the user experience I am also serving html/css and js files through express which internally utilizes the api and do little validation.


Since its a very simple API, so I tried to keep documentation simple and avoid to use swagger or anything like that. I used third party libs to make my life easier such as EXPRESS-VALIDATOR, EXPRESS-JWT, EXPRESS-ASYNC-ERRORS, BCRYPT and many more.
