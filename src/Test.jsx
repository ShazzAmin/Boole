import React, { Component } from "react";

export default class Test extends Component {
	constructor(props) {
		super(props);

		console.log("Test component created");
	}

	render() {
		return <p>Test</p>;
	}
}

