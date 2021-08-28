#!/bin/bash

# change to backend directory
cd backend
#create new git repository and add everything
git init
git add .

# disable gpg signing for the next commit
git -c commit.gpgsign=false commit

git commit -m "Initialize for Heroku deployment"  
# git remote add heroku git@heroku.com:cheathub-backend.git
heroku git:remote -a cheathub-backend   
echo "Added heroku backend remote"

#pull heroku but then checkback out our current local master and mark everything as merged
git pull heroku master
git checkout --ours .
git add -u

# disable gpg signing for the next commit
git -c commit.gpgsign=false commit

git commit -m "merged"
echo "Merged with github"

#push back to heroku, open web browser, and remove git repository
git push heroku master
heroku open
rm -fr .git

#go back to wherever we started.
echo "Everything done."
cd -