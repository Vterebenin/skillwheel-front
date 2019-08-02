import React from "react";
import * as d3 from "d3";
import { connect } from 'react-redux'
import Loader from '../Loader/Index'
// эта библиотека, возможно, увеличит производительность ¯\_(ツ)_/¯
import { withFauxDOM } from 'react-faux-dom'
import {
	fetchAreaIfNeeded,
} from '../../actions'



class BarChartV1 extends React.Component {

	constructor(props) {
		super(props)
		this.handleClick = this.props.clickHandler
		const { dispatch } = this.props
		dispatch(fetchAreaIfNeeded())

	}

	componentDidMount() {
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.user !== prevProps.user) {
			const { dispatch, areas } = this.props
			dispatch(fetchAreaIfNeeded())

			const partition = data => {
				const root = d3.hierarchy(data)
					.sum(d => d.value)
					.sort((a, b) => b.value - a.value);
				// во втором параметре сайза можно задать количество кругов
				// 1 -- изначальное количество со всеми кругами.
				// если поставить 2, будет (общее количество - 1)кругов
				return d3.partition().size([2 * Math.PI, root.height + 2])(root);
			}

			const width = this.props.width || 700;
			const radius = width / 6
			const arc = d3.arc()
				.startAngle(d => d.x0)
				.endAngle(d => d.x1)
				// размер паддинга между чанками
				.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.01))
				.padRadius(radius * 1.5)
				// внутренний радиус
				.innerRadius(d => d.y0 * radius)
				// внешний
				.outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius))

			if (this.props.user !== prevProps.user) {
				this.charts(partition, areas, d3, width, arc, radius)
			}
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


			label.filter(function (d) {
				return +this.getAttribute("opacity") || labelVisible(d.target);
			}).transition(t)
				.attr("opacity", d => +labelVisible(d.target))
				.attrTween("transform", d => () => labelTransform(d.current))
			// .selectAll('.sk-wheel-text').node().classList.add("mynewclass");
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
		const { lastUpdated } = this.props
		return (
			<React.Fragment>
				{lastUpdated ? (
					<React.Fragment>
						<svg ref={viz => (this.viz = viz)}
							width={width} height={height} >
						</svg>
					</React.Fragment>
				) : (
					<Loader />
				)}

			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { userData } = state
	const { lastUpdated, user, areas } = userData
	return {
		lastUpdated,
		areas,
		user
	}
}

export default connect(mapStateToProps)(withFauxDOM(BarChartV1))