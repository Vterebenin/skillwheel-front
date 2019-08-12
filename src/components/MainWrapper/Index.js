import React, { Component } from 'react';
import { Layout, Menu, Icon, } from 'antd';
const { Content } = Layout;
const { SubMenu } = Menu;

class Index extends Component {

	render() {
		const { children } = this.props
		return (
			<Layout style={{ minHeight: '100vh', maxWidth: '1920px', margin: "0 auto", width: "100%" }}>

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

					{children}

				</Content>
			</Layout>
		);
	}
}
export default Index 