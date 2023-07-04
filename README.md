Esolutions Flickr Client
- A Flickr Search application with authentication to search through the flickr library via tags

Technologies used - React, Node.js, Express, CSS, HTML
Libraries used - MaterialUI, ReactDOM, react-router-dom, crypto, querystring

Run instructions - 
1. Insert API key and secret in relevant variables in file '/src/config/config.js'
2. 'cd my-app' to enter project directory
3. 'cd backend' to enter the backend folder
4. 'npm install' to install all dependencies
5. 'node server.jsx' in order to run the application on port 3000
6. Open a separate terminal in order to run the frontend side
7. 'cd my-app' to enter project directory
8. 'cd frontend' to enter the frontend folder
9. 'npm install' to install all dependencies
10. 'npm build' to build the react application
12. 'npm start' in order to run the application on port 3001

Note - The backend must run on port 3000 and the frontend must run on port 3001

Using the application
1. The application will initiate authentication via Oauth which will redirect to Flickr
2. Flickr will ask for login or registration details followed by authorization
3. Once user authorization is granted, the application will then perform other authentication flow steps, i.e - request token, access token and verifying access-token
4. Once the authorization is completed in the backend, it will automatically redirect to search
5. On the search page, tags are considered for user input and so all queries should be spaced in order to be considered as separate tags
6. Here, live search can be used or the search button next to the search bar
7. The application will fetch 30 images and if more results are required, the user can click on 'load more' at the end of the results in order to generate 30 more
8. Error handling - If invalid words or empty search queries are sent, it will return a message on the page stating it
