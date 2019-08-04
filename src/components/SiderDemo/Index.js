import React from 'react';

import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button } from 'antd';
import Wheel from '../Wheel/Index'
import Loader from '../Loader/Index';
import UserContent from '../UserContent/Index';
import SkillContent from '../SkillContent/Index'
import { connect } from 'react-redux';
import { getSkill } from '../../actions';
const { Content } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
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
		console.log(collapsed);
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
		console.log(this.state.content)
	}


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
			<Layout style={{ minHeight: '100vh' }}>
				{this.state.loading && <Loader />}

				<Menu theme="light" mode="horizontal" style={{ textAlign: "right" }}>

					<Menu.Item key="6" style={{ float: "left" }}>SkillWheel</Menu.Item>
					<SubMenu
						key="sub1"
						title={
							<span>
								<Icon type="global" />
								<span>Языки</span>
							</span>
						}
					>
						<Menu.Item key="1">Русский</Menu.Item>
						<Menu.Item key="2">Английский</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub2"
						title={
							<span>
								<Icon type="user" />
								<span>Профиль</span>
							</span>
						}
					>
						<Menu.Item key="3">Мой профиль</Menu.Item>
						<Menu.Item key="4">Настройки</Menu.Item>
						<Menu.Divider />
						<Menu.Item key="5">Выйти</Menu.Item>
					</SubMenu>

				</Menu>
				<Content style={{ margin: '0 16px' }}>

					<Row gutter={100} style={{ margin: '0 auto', maxWidth: "1200px" }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Мой профиль</Breadcrumb.Item>
							{user && <Breadcrumb.Item>{user.name}</Breadcrumb.Item>}
						</Breadcrumb>
						<h1>Ваш профиль:</h1>
						<Col span={8}>
							{this.props.skillId ? (
								<Button onClick={this.onButtonClick}>
									{this.state.content ? 'Посмотреть текущий скилл' : 'Назад в профиль'}
								</Button>
							) : (
									''
								)}

							{this.state.content ? (
								<UserContent />
							) : (
									<SkillContent />
								)}

						</Col>
						<Col span={16}>
							<Wheel clickHandler={this.skillClick} />
						</Col>
					</Row>
				</Content>
			</Layout>
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