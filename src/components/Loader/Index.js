import React, { Component } from 'react'
import './style.css'

export default class Index extends Component {
	render() {
		return (
			<div className="loader">
				<div className="outer"></div>
				<div className="middle"></div>
				<div className="inner"></div>
			</div>
		)
	}
}
