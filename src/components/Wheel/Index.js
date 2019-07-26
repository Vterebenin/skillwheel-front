import React from "react";
import * as d3 from "d3";
import data from './data'
import userData from './reaaldata';


class BarChartV1 extends React.Component {

	constructor(props) {
		super(props)
        this.realData = userData.areas
        console.log(this.realData)
        this.realArr = {}
        this.realArr.children = []
        
        this.realData = Object.keys(this.realData).map((key) => {
            return this.realArr.children.push(this.realData[key])
        })
        this.realArr.children.forEach(element => {
            element.children = [];
            Object.keys(element).map((key) => {
                return element.children.push(element[key])
            })
        });
        console.log(this.realArr, "realArr")
        console.log(this.data);
        console.log(typeof(data[0]))
		this.partition = data => {
			const root = d3.hierarchy(data)
				.sum(d => 200)
			return d3.partition().size([2 * Math.PI, root.height + 1])(root);
        }

        Object.size = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        console.log(Object.keys(this.realData).length)

        this.realColor = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, Object.keys(this.realData).length + 1))
		this.format = d3.format(",d")
		this.width = this.props.width;
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
        // this.charts(this.partition, this.data, d3, this.width, this.color, this.arc, this.format, this.radius)
        this.charts(this.partition, this.realArr, d3, this.width, this.realColor, this.arc, this.format, this.radius)
        
	}

	componentDidUpdate() {
        // this.charts(this.partition, this.data, d3, this.width, this.color, this.arc, this.format, this.radius)
        this.charts(this.partition, this.realArr, d3, this.width, this.realColor, this.arc, this.format, this.radius)
	}

	charts(partition, data, d3, width, color, arc, format, radius) {
		const root = partition(data);
        console.log(root);
        root.each(d => d.current = d);
        console.log(root.descendants().slice(1))
		console.log(this.viz)
		const svg = d3.select(this.viz)
			.attr("viewBox", [0, 0, width, width])
			.style("font", "10px sans-serif");

		const g = svg.append("g")
			.attr("transform", `translate(${width / 2},${width / 2})`);

		const path = g.append("g")
			.selectAll("path")
			.data(root.descendants().slice(1))
			.join("path")
			.attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
			.attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
			.attr("d", d => arc(d.current));

		path.filter(d => d.children)
			.style("cursor", "pointer")
			.on("click", clicked);

		path.append("title")
			.text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

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
			.text(d => d.data.name);

		const parent = g.append("circle")
			.datum(root)
			.attr("r", radius)
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.on("click", clicked);

		function clicked(p) {
			parent.datum(p.parent || root);

			root.each(d => d.target = {
				x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
				x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
				y0: Math.max(0, d.y0 - p.depth),
				y1: Math.max(0, d.y1 - p.depth)
			});

			const t = g.transition().duration(750);

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

export default BarChartV1;