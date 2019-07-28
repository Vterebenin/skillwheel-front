import React from "react";
import * as d3 from "d3";
import { userData } from '../mocks/realdata'

import { withFauxDOM } from 'react-faux-dom'


class BarChartV1 extends React.Component {

	constructor(props) {
		super(props)
        this.realData = userData
        console.log(this.realData, "unidata")
        this.realArr = userData
		this.realArr.children = []
		Object.keys(this.realData.areas).map((key) => {
			const pushObj = {}
			pushObj.color = this.realData.areas[key].color
			pushObj.title = this.realData.areas[key].title
			// pushObj.value = 2
			pushObj.children = this.realData.areas[key].skills
            return this.realArr.children.push(pushObj)
		})
        this.realArr.children.forEach(element => {
			
			Object.keys(element.children).map((key) => {
				element.children[key].value = 2
				element.children[key].id = element.children[key].skill.id
				element.children[key].color = element.children[key].level.color
				element.children[key].title = element.children[key].skill.title
				// console.log(element.children[key])
				// if (key === "children") {
					// element.children.children.push(element[key].skill)
					return element
				// }
            })
		});
		
		this.partition = data => {
			const root = d3.hierarchy(data)
				.sum(d => d.value)
				.sort((a, b) => b.value - a.value);
			return d3.partition().size([2 * Math.PI, root.height + 2])(root);
        }

       
        console.log(Object.keys(this.realData).length)

        this.realColor = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, this.realArr.children.length + 1))
		this.format = d3.format(",d")
		this.width = this.props.width || 700;
		this.radius = this.width / 6
		this.arc = d3.arc()
			.startAngle(d => d.x0)
			.endAngle(d => d.x1)
			.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
			.padRadius(this.radius * 1.5)
			.innerRadius(d => d.y0 * this.radius)
			.outerRadius(d => Math.max(d.y0 * this.radius, d.y1 * this.radius - 1))
	}

	componentDidMount() {
        this.charts(this.partition, this.realArr, d3, this.width,  this.arc,  this.radius)
        
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.data !== prevProps.data) {
			this.charts(this.partition, this.realArr, d3, this.width,  this.arc,  this.radius)
		}
	}

	charts(partition, data, d3, width, arc, radius) {
		const root = partition(data);
        console.log(root, "real");
		root.each(d => d.current = d);
		root.descendants().slice(1).map(d => console.log(d.data));
		const svg = d3.select(this.viz)
			.attr("viewBox", [0, 0, width, width])
			.style("font", "10px sans-serif");

		const g = svg.append("g")
			.attr("transform", `translate(${width / 2},${width / 2})`);

		const path = g.append("g")
			.selectAll("path")
			.data(root.descendants().slice(1))
			.join("path")
			// .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.title); })
			.attr("fill", d => { return d.data.color })
			.attr("id", d => d.data.id)
			.attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
			.attr("d", d => arc(d.current))
			.on("click", pathClick);


		path.filter(d => d.children)
			.style("cursor", "pointer")
			.on("click", clicked);

		path.append("title")
			.text(d => `${d.ancestors().map(d => d.data.title).reverse().join("/")}\n`);

		const label = g.append("g")
			.attr("pointer-events", "none")
			.attr("text-anchor", "middle")
			.style("user-select", "none")
			.selectAll("text")
			.data(root.descendants().slice(1))
			.join("text")
			.attr("dy", "0.35em")
			.attr("fill-opacity", d => +labelVisible(d.current))
			.attr("transform", d => labelTransform(d.current))
			.text(d => d.data.title);

		const parent = g.append("circle")
			.datum(root)
			.attr("r", radius)
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.on("click", clicked);
		function pathClick() {
			console.log(this.id);
		}
		function clicked(p) {
			parent.datum(p.parent || root);

			root.each(d => d.target = {
				x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
				x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
				y0: Math.max(0, d.y0 - p.depth),
				y1: Math.max(0, d.y1 - p.depth)
			});


			const t = g.transition().duration(1000);

			// Transition the data on all arcs, even the ones that aren’t visible,
			// so that if this transition is interrupted, entering arcs will start
			// the next transition from the desired position.
			path.transition(t)
				.tween("data", d => {
					const i = d3.interpolate(d.current, d.target);
					return t => d.current = i(t);
				})
				.filter(function (d) {
					return +this.getAttribute("fill-opacity") || arcVisible(d.target);
				})
				.attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
				.attrTween("d", d => () => arc(d.current));

			label.filter(function (d) {
				return +this.getAttribute("fill-opacity") || labelVisible(d.target);
			}).transition(t)
				.attr("fill-opacity", d => +labelVisible(d.target))
				.attrTween("transform", d => () => labelTransform(d.current));
		}

		function arcVisible(d) {
			return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
		}

		function labelVisible(d) {
			return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
		}

		function labelTransform(d) {
			const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
			const y = (d.y0 + d.y1) / 2 * radius;
			return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
		}

		return svg.node();
	}


	render() {
		const { width, height } = this.props;
		return (
			<svg ref={viz => (this.viz = viz)}
				width={width} height={height} >
			</svg>
		);
	}
}

export default withFauxDOM(BarChartV1);