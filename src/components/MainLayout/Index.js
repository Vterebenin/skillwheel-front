import React from 'react';

import { Breadcrumb, Row, Col, Button } from 'antd';
import Wheel from '../Wheel/Index'
import UserContent from '../UserContent/Index';
import SkillContent from '../SkillContent/Index'
import { connect } from 'react-redux';
import { getSkill } from '../../actions';
import MainWrapper from "../MainWrapper/Index";
// сторонние



class SiderDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: true,
		};

		this.onButtonClick = this.onButtonClick.bind(this)
		this.skillClick = this.skillClick.bind(this)
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


	render() {
		const { user } = this.props
		return (
			<MainWrapper>
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
						<div ref={(divElement) => this.divElement = divElement}>
							<Wheel clickHandler={this.skillClick} />
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