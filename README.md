# Cromwell_Nodejs_Application

#Prequesites:

1. Download and install the following if not installed:
   - Nodejs
   - Postgresql
   - Visual Studio IDE or any ide of your choice
  
2. Download Cromwell_Nodejs_Application from Github.
     - Download the application
     - extract downloaded file to whichever directory of your choice
     - Open the application in the IDE
  
3. Create the tables Register and Login with these fields:
     - Table register:
    first_name character varying COLLATE pg_catalog."default",
    last_name character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    psw character varying COLLATE pg_catalog."default",
    register_id integer NOT NULL,
    CONSTRAINT register_pkey PRIMARY KEY (register_id)
    - Table login:
    credentials_id integer NOT NULL,
    email character varying COLLATE pg_catalog."default",
    login character varying COLLATE pg_catalog."default",
    CONSTRAINT credentials_pkey PRIMARY KEY (credentials_id)

4. Install all packages in the react app and the node js backend app using npm install if not installed:
   - navigate to the my-react-app folder and use the command "npm install" to install all packages for the react app
   - navigate to the my-react-app-backend/nodejs_backend folder and use the command "npm install" to install all packages for the nodejs app.
     
#Run the Application:

1. Run the Backend first:
    - navigate to the backend folder
    - use command "node app" on command prompt to run the backend application or run the nodejs backend from the IDE.
3. Run the Frontend:
    - navigate to the frontend folder
    - use command "npm start" on command prompt to run the frontend application or run the react frontend from the IDE.
