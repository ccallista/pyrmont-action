# Pyrmont Action Website Remodelling
This repository is a project to remodel pyrmontaction.org.au, appointed by the Pyrmont Action Community Group. Database is **SQLite**, backend uses **Node.js**, and frontend uses **Vue.js**.

Current status of the remodelling is that all public facing pages has been completed, TODO includes member-only pages and admin pages which were out of scope for this stage of the project. Role-based login has been implemented which forms the foundation for those components.


## Setting Up the Website Locally
### Pre-requisites
To run the website, device needs to have Node.js installed. Follow the instructions as provided here https://nodejs.org/en/download.

Clone this repository, checkout the main branch for the latest version release.
```bash
git clone https://github.com/ccallista/pyrmont-action.git
```

Install all dependencies for both frontend and backend directories by running in the respective folders.
```bash
npm install
```

### Running the website
To start the frontend, navigate to the frontend folder and run:
```bash
npm run dev
```
In a different terminal instance, start the backend by navigating to the backend folder and running:
```bash
node server.js
```
By default, frontend would be accessible on http://localhost:5173 and backend on http://localhost:5000. Both of the frontend and backend must be running simultaneously for the website to be properly loaded and have all its features accessible.


## Future Development
### Existing credentials
Dummy admin-based role login:
- USERNAME: admin@admin.com
- PASSWORD: admin

Dummy member-based role login:
- USERNAME: 1@gmail.com
- PASSWORD: 1

Once logged in, user will remain logged in for 2 days regardless if they navigate to other pages in the website, or navigate away from the website.

### Contact-us email routing
To set the 'Send A Message' target email, configure "HOST_EMAIL" and "HOST_EMAIL_PASSWORD" in the .env within the backend folder. As an example, this is what the .env file should look like (no need to change REFRESH_TOKEN and ACCESS_TOKEN):
```bash
REFRESH_TOKEN = refresh
ACCESS_TOKEN = access
HOST_EMAIL = your_desired_email
HOST_EMAIL_PASSWORD = your_email_password
```





