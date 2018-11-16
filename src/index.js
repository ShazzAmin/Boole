import React from "react";
import ReactDOM from "react-dom";

import Test from "./Test.jsx";

document.addEventListener("DOMContentLoaded", function() {
	console.log("boole initialized!");

	const appContainer = document.createElement("div");
	ReactDOM.render(<Test />, appContainer);
	document.body.appendChild(appContainer);
});

