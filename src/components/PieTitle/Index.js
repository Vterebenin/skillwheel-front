import React, { useEffect } from 'react'

export default function Index(props) {

	let { x, y, wheelX, wheelY } = props.coordinates
	let { width, height } = props.wSize

	if ((x >= wheelX) && (x <= wheelX + props.wSize.width) && (y <= wheelY + props.wSize.height) && (x >= wheelY)) {
		console.log("in the box");
	}

	let isInTheBox = true;
	
	
	let visibility = isInTheBox ? "visible" : "hidden" 
	let animation = isInTheBox ? "tooltipAppear 4s ease 1" : "none"
	return (
		<div
			className="sk-tooltip"
			style={{ 
				position: "absolute", 
				animation: animation,
				visibility: visibility,
				left: `${props.coordinates.x}px`, 
				top: `${props.coordinates.y}px` 
			}}
		>
			{/* <h2>{props.title}</h2>
			<h4>coordinates {props.coordinates.x} {props.coordinates.y}</h4>
			<h5>quad</h5> */}
		</div>
	)
}
