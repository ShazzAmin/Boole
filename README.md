Boole
=====

*by Shazz Amin, Derek Yin*

Browser extension adding various quality-of-life features and workflow improvements to the online George editor.


### Set-up
##### Prerequisites:
* npm (^6.4.1)

`npm install`


### Run (Web App)

`npm run start`

\* For verification to work, the browser must have its security protections disabled (for Chrome, use the `--disable-web-security` launch option (this requires you to explicitly specify a profile with the `--user-data-dir` launch option)).


### Build (Web App)

`npm run build`


### Build & Run (Browser Extension)
##### Prerequisites:
* A modern web browser

1. `npm run build-ext`

1. Load the `build-ext/` directory as an unpacked extension into the web browser.

2. Visit [Ask George](https://www.student.cs.uwaterloo.ca/~se212/george/ask-george/).

