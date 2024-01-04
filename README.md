# Track-it
[![Netlify Status](https://api.netlify.com/api/v1/badges/372d3b19-c769-4872-acda-ff184f4133cb/deploy-status)](https://app.netlify.com/sites/track-it-v1/deploys)

## Stack & deployment
Mono-repo (everything in typescript)
<br>
Backend :  Using Express, deployed on Heroku:  https://dashboard.heroku.com/login
<br>
Frontend : Using React with Vite, deployed on Netlify: https://app.netlify.com/sites/track-it-v1/overview 
<br>
All icons are from : www.svgrepo.com
<br>
Each push on production branch trigger a deployment on both front and backend
## Set-up
Require Node.js version > 20.0.0
<br>
Firt pull the project where you want: 
```
git clone https://github.com/VincentBernet/Track-It
```

Go in the Track-It folder, then install both back and front in one command: 
```
cd Track-It
npm install
```

And start the project in one command again: 
```
npm start
```
Open the localhost url shown in your terminal (something like : http://localhost:5173/)



