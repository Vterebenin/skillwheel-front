import React, { Component } from 'react'
import './style.css'

export default class Index extends Component {
	render() {
		return (
			<div class="loader">
				<div class="outer"></div>
				<div class="middle"></div>
				<div class="inner"></div>
			</div>
		)
	}
}
