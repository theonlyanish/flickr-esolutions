Esolutions Flickr Client 
- A Flickr Search application with authentication to search through the Flickr library via tags

Technologies used - React, Node.js, Express, CSS, HTML.    
Libraries used - MaterialUI, ReactDOM, react-router-dom, crypto, querystring

Run instructions post cloning and extraction - 
1. Insert API key and secret in relevant variables in file 'frontend/src/config/config.js' and in file 'backend/server.jsx'
2. 'cd my-app' to enter the project directory
3. 'cd backend' to enter the backend folder
4. 'npm install' to install all dependencies
5. 'node server.jsx' in order to run the application on port 3000
6. Open a separate terminal in order to run the frontend side
7. 'cd my-app' to enter the project directory
8. 'cd frontend' to enter the frontend folder
9. 'npm install' to install all dependencies
10. 'npm build' to build the react application
12. 'npm start' in order to run the application
13. This step will ask to run the application on a separate port for which 'Y' must be entered in order to the application on port 3001

Note - The backend must run on port 3000 and the frontend must run on port 3001 only.

Using the application
1. The last step of the installation will open the link 'http://localhost:3001/' from where the user must proceed
2. The application will initiate authentication via Oauth which will redirect to Flickr
3. Flickr will ask for login or registration details followed by authorization
4. Once user authorization is granted, the application will then perform other authentication flow steps, i.e - request token, access token, and verifying access-token
5. Once the authorization is completed in the backend, it will automatically redirect to search
6. On the search page, tags are considered for user input and so all queries should be spaced in order to be considered as separate tags
7. Here, live search can be used, or the search button next to the search bar
8. The application will fetch 30 images and if more results are required, the user can click on 'load more' at the end of the results in order to generate 30 more
9. Error handling - If invalid words or empty search queries are sent, it will return a message on the page stating it

![image](https://github.com/theonlyanish/flickr-esolutions/assets/28725271/a7774ddc-a60e-43a9-95f2-0fbf098c8f0e)
