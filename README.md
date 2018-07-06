Prerequisits
--
- Install nodejs (which includes npm) from https://nodejs.org/en/download/
- Install git https://git-scm.com/download/
- Install `rimraf`
<pre>
npm i -g rimraf
</pre>

Installation
--
This will clone the project, install dependencies and build the sample Hello World UI.

    git clone https://github.com/mehuge/cu-ui-starter-project
    cd cu-ui-starter-project
    rimraf .git
    npm run setup

Building
--
    npm start build

Testing in Browser
--
    npm start dev

Output
--

The output from a build is the `dist` folder.  This contains your ready to install UI.
