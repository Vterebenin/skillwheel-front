import React from 'react'

export default function Index(props) {

	return (
		<div>
			<h2>{props.title}</h2>
			<h4>coordinates {props.coordinates.x} {props.coordinates.y}</h4>
			<h5>quad</h5>
		</div>
	)
}
