Boole
=====

*by Shazz Amin, Derek Yin*

A full-featured front end for George with various qualify-of-life features and workflow improvements.

## Key Features

* Full file management system with auto assignment fetching/saving

![](/docs/file_management.gif)

* Ask George verification with attention grabbing visual feedback

![](/docs/verification.gif)

* Auto completion of rules

![](/docs/auto_completion.gif)

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




### License
[MIT](LICENSE)

Copyright (c) 2018 Shazz Amin, Derek Yin 