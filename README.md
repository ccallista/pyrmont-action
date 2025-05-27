# Pyrmont Action Website
This repository is a project that remodels pyrmontaction.org.au. Database is **SQLite**, backend uses **Node.js**, and frontend uses **Vue.js**. It is currently only available to run locally as it is still in the development stage, however hosting should be considered for official public release.

Current status of the remodelling is that all public facing pages has been completed, TODO includes member-only pages and admin pages which were out of scope for this stage of the project. Role-based login has been implemented which forms the foumdation to those components.


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
### General folder structure (frontend)

### General folder structure (backend)




