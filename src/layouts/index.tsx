import React, { useEffect, useState } from 'react';
import styles from './index.less'
import { Breadcrumb, Col, Layout, Menu, Row, theme, Typography } from 'antd';
import { Link, Outlet } from '@umijs/max';
import { FormattedMessage, useIntl, SelectLang } from 'umi';
import { useNavigate } from '@umijs/max';
import zzuLogo from '@/assets/zzuLogo.png'
import { useLocation } from '@umijs/max';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const menuKeys = [
    'home',
    'intro',
    'news',
    'team',
    'instrument',
    'joinus'
]
function index() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const intl = useIntl();
    const navigate = useNavigate()
    const location = useLocation()

    //const [rootPath, setRootPath] = useState<string>()


    if (location.pathname.split('/')[1] === 'admin') {
        
        return (
            <Layout className="adminLayout">
                <Header className={styles.adminHeaderTop} style={{ background: colorBgContainer }}>
                    <div style={{ float: 'left' }}>
                        <img src={zzuLogo} alt="郑州大学 Zhengzhou University" style={{ width: '64px' }} />
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={[location.pathname.split('/')[2]]}
                        items={menuKeys.map((_, index) => {
                            return {
                                key: _,
                                label: intl.formatMessage({
                                    id: 'menu.' + _
                                }),
                                onClick: () => {
                                    navigate('/admin/' + _)
                                }
                            };
                        })}
                    />

                </Header>

                <Content style={{ padding: '0 20px', minHeight: '80vh' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                    <Row>
                        <Col span={24}>
                            <div className="site-layout-content"
                                style={{
                                    // background: colorBgContainer,
                                    marginTop: '25px'
                                }}>
                                <Outlet />
                            </div>
                        </Col>
                    </Row>

                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
            </Layout>
        )
    }


    return (
        <Layout className="layout">
            <Header className={styles.headerTop} style={{ background: '#086CBA' }}>
                <div >
                    <img src={zzuLogo} alt="郑州大学 Zhengzhou University" style={{ width: '120px' }} />
                </div>
                <div className={styles.zhTitle}>
                    <Title level={1} style={{ marginTop: 0, marginBottom: 0, color: '#fff' }}>纳米光电机与生医工程实验室</Title>
                    <Title level={1} style={{ marginTop: 0, marginBottom: 0, color: '#fff' }}>先进智能制造实验室</Title>
                </div>

                <div className={styles.enTitle}>
                    <SelectLang style={{ float: 'right', color: '#fff' }} />
                    <Title level={1} style={{ marginTop: 6, marginBottom: 0, color: '#fff' }}>(AIM-NOBELab)</Title>
                    <Title level={5} style={{ marginTop: 2, marginBottom: -5, color: '#fff' }}>Advanced Intelligent Manufacturing Lab</Title>
                    <Title level={5} style={{ marginTop: 0, marginBottom: 5, color: '#fff' }}>Nano Opto-mechatronics & Biomedical Engineering Lab</Title>
                </div>

            </Header>
            <Header style={{ display: 'flex', alignItems: 'center', background: colorBgContainer, justifyContent: 'center' }}>

                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={[location.pathname.split('/')[2]]}
                    items={menuKeys.map((_, index) => {
                        return {
                            key: _,
                            label: intl.formatMessage({
                                id: 'menu.' + _
                            }),
                            onClick: () => {
                                navigate('/visit/' + _)
                            }
                        };
                    })}
                />

            </Header>

            <Content style={{ padding: '0 50px', minHeight: '80vh' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Row>
                    <Col span={20} offset={2}>
                        <div className="site-layout-content"
                            style={{
                                //background: colorBgContainer,
                                marginTop: '25px'
                            }}>
                            <Outlet />
                        </div>
                    </Col>
                </Row>

            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#086CBA', color: '#ffffff', marginTop: '20px' }}>
                <p><a href="https://j.map.baidu.com/a7/Tw6K" style={{ color: '#fff' }} target="_blank">{intl.formatMessage({ id: 'home.address' })}</a></p>
                <p>{intl.formatMessage({ id: 'home.email' })}</p>
                <p>{intl.formatMessage({ id: 'home.rights' })}</p>
            </Footer>
        </Layout>
    );
}

export default index