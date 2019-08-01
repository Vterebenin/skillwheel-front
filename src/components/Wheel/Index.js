import React from "react";
import * as d3 from "d3";
import { userData } from '../mocks/realdata'
import { encode_utf8 } from '../helpers/Index'
// эта библиотека, возможно, увеличит производительность ¯\_(ツ)_/¯
import { withFauxDOM } from 'react-faux-dom'



class BarChartV1 extends React.Component {

	constructor(props) {
		super(props)
		this.handleClick = this.props.clickHandler
		// копирование объектов в JSe это какой-то пиздец
		this.realData = JSON.parse(JSON.stringify(userData))
		this.realArr = this.realData
		this.realArr.children = []
		for (let [key] of Object.entries(this.realData.areas)) {
			const pushObj = {}
			pushObj.color = this.realData.areas[key].color
			pushObj.title = this.realData.areas[key].title
			pushObj.children = this.realData.areas[key].skills
			this.realArr.children.push(pushObj)
		}
		this.fetchedData = null;
		this.realArr.children.forEach(element => {

			Object.keys(element.children).map((key) => {
				element.children[key].value = 2
				element.children[key].id = element.children[key].skill.id
				element.children[key].color = element.children[key].level.color
				element.children[key].title = element.children[key].skill.title
				return element
			})
		});

		this.partition = data => {
			const root = d3.hierarchy(data)
				.sum(d => d.value)
				.sort((a, b) => b.value - a.value);
			// во втором параметре сайза можно задать количество кругов
			// 1 -- изначальное количество со всеми кругами.
			// если поставить 2, будет (общее количество - 1)кругов
			return d3.partition().size([2 * Math.PI, root.height + 2])(root);
		}



		this.realColor = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, this.realArr.children.length + 1))
		this.format = d3.format(",d")
		this.width = this.props.width || 700;
		this.radius = this.width / 6
		this.arc = d3.arc()
			.startAngle(d => d.x0)
			.endAngle(d => d.x1)
			// размер паддинга между чанками
			.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.01))
			.padRadius(this.radius * 1.5)
			// внутренний радиус
			.innerRadius(d => d.y0 * this.radius)
			// внешний
			.outerRadius(d => Math.max(d.y0 * this.radius, d.y1 * this.radius - 1))



	}



	componentDidMount() {
		function encode_utf8( s ){
			return unescape( encodeURIComponent( s ) );
		}
		function decode_utf8(s) {
			return decodeURIComponent(escape(s));
		}
		let fetchedData;
		this.fetchedData = fetch(`https://raw.githubusercontent.com/Vterebenin/skillwheel-front/master/fetchedData.json`)
			.then(response => response.json())
			.then(text => {
				fetchedData = JSON.parse(encode_utf8(encode_utf8(text.toString())))
				console.log(fetchedData.name)
			})
		this.charts(this.partition, this.realArr, d3, this.width, this.arc, this.radius)

	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.data !== prevProps.data) {
			this.charts(this.partition, this.realArr, d3, this.width, this.arc, this.radius)
		}
	}


	charts(partition, data, d3, width, arc, radius) {
		const root = partition(data);
		root.each(d => d.current = d);
		const svg = d3.select(this.viz)
			.attr("viewBox", [0, 0, width, width])
			.style("font", "12px sans-serif");

		const g = svg.append("g")
			.attr("transform", `translate(${width / 2},${width / 2})`);

		const path = g.append("g")
			.selectAll("path")
			.data(root.descendants().slice(1))
			.join("path")
			.attr("fill", d => { return d.data.color })
			.attr("id", d => d.data.id)
			// цвет интенсивности закраски чанков 
			.attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
			.attr("d", d => arc(d.current))
			.on("click", this.handleClick);


		path.filter(d => d.children)
			.style("cursor", "pointer")
			.on("click", clicked);

		path.append("title")
			.text(d => `${d.ancestors().map(d => d.data.title).reverse().join("/")}\n`);


		let label = g.append("g")
			.attr("pointer-events", "none")
			.attr("text-anchor", "middle")
			.style("user-select", "none")
			.selectAll("foreignObject")
			.data(root.descendants().slice(1))
			.join("foreignObject")
			.attr("class", "sk-wheel-foreign")
			.attr("width", 150)
			.attr("height", 100)
			.attr("dy", "0.35em")
			.attr("opacity", d => +labelVisible(d.current))
			.attr("transform", d => labelTransform(d.current))
			.append("xhtml:div")
			.attr("class", "sk-wheel-text")
			
			.html(d => d.data.title)

		// переопределение таргета лейбла
		label._groups[0] = label._groups[0].map(e => {
			return e.parentNode
		})
		

		const parent = g.append("circle")
			.datum(root)
			.attr("r", radius)
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.on("click", clicked);

		function clicked(p) {
			parent.datum(p.parent || root);

			root.each(d => {
				d.target = {
					x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
					x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
					y0: Math.max(0, d.y0 - p.depth),
					y1: Math.max(0, d.y1 - p.depth)
				}
			});

			// время анимации в милисекундах
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

			
			console.log(label);
			label.filter(function (d) {
				return +this.getAttribute("opacity") || labelVisible(d.target);
			}).transition(t)
				.attr("opacity", d => +labelVisible(d.target))
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
			const y = (d.y0 + d.y1) / 2 * radius - 10;
			return `rotate(${x - 90}) translate(${y}, 10) rotate(${x < 180 ? 0 : 180})`;
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