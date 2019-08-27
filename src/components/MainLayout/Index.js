import React from 'react';

import { Breadcrumb, Button } from 'antd';
import Wheel from '../Wheel/Index'
import UserContent from '../UserContent/Index';
import SkillContent from '../SkillContent/Index'
import { connect } from 'react-redux';
import { getSkill } from '../../actions';
import MainWrapper from "../MainWrapper/Index";


class SiderDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: true,
		};

		this.onButtonClick = this.onButtonClick.bind(this)
		this.skillClick = this.skillClick.bind(this)
	}

	// обработчик для клика кнопки смены контента и профиля
	onButtonClick = () => {
		if (this.state.skillId !== null) {
			this.setState({
				content: !this.state.content
			})
		} else {
			alert("take a look at the skill")
		}
	}

	// обработчик для кликов на скиллы(2-ой уровень)
	skillClick(content) {
		const { dispatch } = this.props
		dispatch(getSkill(content.data.id))
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
				<div className="main">
					<div className="main__pathline">
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Мой профиль</Breadcrumb.Item>
							{user && <Breadcrumb.Item>{user.name}</Breadcrumb.Item>}
						</Breadcrumb>
					</div>
					<div className="main__content">
						<div className="main__col main__info">
							<h1>Ваш профиль:</h1>
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

							{this.state.content
								? (
									<UserContent />
								)
								: (
									<SkillContent />
								)}
						</div>
						<div className="main__col main__wheel" ref={(divElement) => this.divElement = divElement}>
							<Wheel clickHandler={this.skillClick} />
						</div>
					</div>
				</div>


			</MainWrapper >
		);
	}
}
function mapStateToProps(state) {
	const { skillId } = state.skillOfClickedArea
	const { user } = state.selectedUser
	return {
		user,
		skillId,
	}
}
export default connect(mapStateToProps)(SiderDemo) 