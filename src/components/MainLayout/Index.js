import React from 'react';

import { Breadcrumb, Row, Col, Button } from 'antd';
import Wheel from '../Wheel/Index'
import UserContent from '../UserContent/Index';
import SkillContent from '../SkillContent/Index'
import { connect } from 'react-redux';
import { getSkill } from '../../actions';
import MainWrapper from "../MainWrapper/Index";
import PieTitle from '../PieTitle/Index';
import * as d3 from "d3";


class SiderDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: true,
			title: undefined,
			coordinates: {
				x: 0,
				y: 0,
				wheelX: 0,
				wheelY: 0
			},
			wheelSize: {
				width: 0,
				height: 0
			}
		};
	
		this.onButtonClick = this.onButtonClick.bind(this)
		this.skillClick = this.skillClick.bind(this)
		this.mouseoverHandler = this.mouseoverHandler.bind(this)


	}

	componentDidMount() {
		this.setState({
			loading: false,
		})
	}



	onCollapse = collapsed => {
		this.setState({ collapsed });
	};

	onButtonClick = () => {
		if (this.state.skillId !== null) {
			this.setState({
				content: !this.state.content
			})
		} else {
			alert("take a look at the skill")
		}
	}


	skillClick(content) {
		const { dispatch } = this.props
		dispatch(getSkill(content.data.id))
		console.log(this);
		
		if (this.state.skillId !== null) {
			this.setState({
				content: false
			})
		}
	}

	mousemoveWheel(e) {
		console.log(e.screenX)
	}

	mouseoverHandler(e) {
		// console.log(content)
		this.setState({
			title: e.data.title,
			coordinates: {
				x: d3.event.pageX,
				y: d3.event.pageY,
				wheelX: this.divElement.offsetLeft,
				wheelY: this.divElement.offsetTop
			},
			wheelSize: {
				width: this.divElement.clientHeight,
				height: this.divElement.clientWidth
			}
		})
		console.log(this.state);

	}

	render() {
		const { user } = this.props
		const { title, coordinates, wheelSize } = this.state
		return (
			<MainWrapper>
				<PieTitle title={title} coordinates={coordinates} wSize={wheelSize} />
				<Row gutter={100} style={{ margin: '0 auto', maxWidth: "1280px" }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Мой профиль</Breadcrumb.Item>
						{user && <Breadcrumb.Item>{user.name}</Breadcrumb.Item>}
					</Breadcrumb>
					<h1>Ваш профиль:</h1>
					<Col span={8}>
						{this.props.skillId
							? (
								<Button onClick={this.onButtonClick}>
									{this.state.content ? 'Посмотреть текущий скилл' : 'Назад в профиль'}
								</Button>
							)
							: (
								<Button disabled>
									{this.state.content ? 'Посмотреть текущий скилл' : 'Назад в профиль'}
								</Button>
							)
						}

						{this.state.content ? (
							<UserContent />
						) : (
								<SkillContent />
							)}

					</Col>
					<Col span={16}>
						<div ref={ (divElement) => this.divElement = divElement}>
							<Wheel  mouseoverHandler={this.mouseoverHandler} clickHandler={this.skillClick} />
						</div>
					</Col>
				</Row>
			</MainWrapper>
		);
	}
}
function mapStateToProps(state) {
	const { skillId } = state.skillOfClickedArea
	const { user } = state.selectedUser
	const { skillname } = state.nameOfHoveredArea
	return {
		user,
		skillname,
		skillId,
	}
}
export default connect(mapStateToProps)(SiderDemo) 