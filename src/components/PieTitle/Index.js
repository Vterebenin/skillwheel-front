import React, { useState, useEffect } from 'react'

export default function Index(props) {

	let { x, y, wheelX, wheelY } = props.coordinates
	let { width, height } = props.wSize
	const [isInTheBox, setIsInTheBox] = useState(false)
	// console.log("left:", wheelX);
	// console.log("right:", wheelX+width);
	// console.log("top:", wheelY);
	// console.log("bottom:", wheelY + height);
	// console.log("current", "x:", x, "y:", y);
	useEffect(() => {
		if ((x >= wheelX + 20) && (x <= wheelX + width - 20) && (y <= wheelY + height - 20) && (y >= wheelY + 20)) {
			setIsInTheBox(false)
			setTimeout(() => {
				setIsInTheBox(true)
			}, 500);
		} else {

			setIsInTheBox(false)
			setTimeout(() => {
				setIsInTheBox(false)
			}, 501);
		}
	}, [x, wheelX, width, y, wheelY, height])



	let visibility = isInTheBox ? "visible" : "hidden"
	let animation = isInTheBox ? "tooltipAppear 2s ease 1" : "none"
	return (
		<React.Fragment>
			{props.title &&
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
					<h2>{props.title}</h2>
					{/* <h4>coordinates {props.coordinates.x} {props.coordinates.y}</h4> */}
					{/* <h5>quad</h5> */}
				</div>}
		</React.Fragment>


	)
}
