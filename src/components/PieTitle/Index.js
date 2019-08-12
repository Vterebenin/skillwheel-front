import React, { useState, useEffect } from 'react'

export default function Index(props) {

	let { x, y, wheelX, wheelY } = props.coordinates
	let { width, height } = props.wSize
	const [isInTheBox, setIsInTheBox] = useState(false)
	const [mouseX, setMouseX] = useState(0)
	const [mouseY, setMouseY] = useState(0)

	window.addEventListener("mousemove", function(e) {
		setMouseX(e.clientX)
		setMouseY(e.clientY)
	})
	// console.log("left:", wheelX);
	// console.log("right:", wheelX+width);
	// console.log("top:", wheelY);
	// console.log("bottom:", wheelY + height);
	// console.log("current", "x:", x, "y:", y);
	useEffect(() => {
		if ((mouseX >= 1.05*wheelX) && (mouseX <= wheelX + 0.95*width) && (mouseY <= wheelY + 0.95*height) && (mouseY >= 1.05*wheelY)) {
			// console.log("+");
			setIsInTheBox(true)
		} else {
			// console.log("-");
			setIsInTheBox(false)
		}
	}, [mouseX, wheelX, width, mouseY, wheelY, height])



	let opacity = isInTheBox ? 1 : 0
	// let animation = isInTheBox ? "tooltipAppear 1s ease 1" : "none"
	return (
		<React.Fragment>
			{props.title &&
				<div
					className="sk-tooltip"
					style={{
						position: "absolute",
						// animation: animation,
						opacity: opacity,
						left: `${mouseX}px`,
						top: `${mouseY}px`,
						cursor: 'pointer'
					}}
				>
					<div className="sk-tooltip--connector"></div>
					<h2 className="sk-tooltip--name">{props.title}</h2>
				</div>}
		</React.Fragment>


	)
}
