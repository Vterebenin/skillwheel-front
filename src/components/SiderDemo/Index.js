import React from 'react';

import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button } from 'antd';
import Wheel from '../Wheel/Index'
import UserContent from '../UserContent/Index';
import { userData } from '../mocks/realdata'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            content: true
        };
        this.onButtonClick = this.onButtonClick.bind(this)
    }

    onTitleClick = (key, domEvent) => {
        return false;
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    onButtonClick = () => {
        this.setState({
            content: !this.state.content
        })
        console.log(this.state.content)
    }

    searchObj(obj, id) {
            
            
        for (var key in obj) {
            var value = obj[key];
            if (typeof value === 'object') {
                this.searchObj(value, id);
            }
            if (key === "id") {
                if (value === id) {
                    console.log(obj)
                    console.log('property=' + key + ' value=' + value);
                }
            }
        }
    }

    render() {
      

        
        const skillClick = (content) => {
            
            console.log(userData);
            console.log(content.data.id)
            this.searchObj(userData, content.data.id)
        }
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu onTitleClick={this.onTitleClick} theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>User</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="team" />
                                    <span>Team</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>{userData.name}</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1>Ваш профиль:</h1>
                        <Button onClick={this.onButtonClick}>toggle Content</Button>
                        <Row gutter={8}>
                            <Col span={8}>
                                {this.state.content ? (
                                    <UserContent />
                                ) : (
                                    "123"
                                )}

                            </Col>
                            <Col span={16}>
                                <Wheel clickHandler={skillClick} />
                            </Col>
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderDemo