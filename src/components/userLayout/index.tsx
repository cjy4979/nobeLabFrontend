import React, { useEffect, useState } from 'react';
import styles from './index.less'
import { Breadcrumb, Col, Layout, Menu, Row, theme, Typography } from 'antd';
import { Outlet } from '@umijs/max';
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
    'recruit'
]
function index() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const intl = useIntl();
    const navigate = useNavigate()
    const location = useLocation()

    //const [rootPath, setRootPath] = useState<string>()

    useEffect(() => {

    }, [location])

    return (
        <Layout className="layout">
            <Header className={styles.headerTop} style={{ background: colorBgContainer }}>
                <div >
                    <img src={zzuLogo} alt="郑州大学 Zhengzhou University" style={{ width: '120px' }} />
                </div>
                <div className={styles.zhTitle}>
                    <Title level={2} style={{ marginBottom: 0 }}>纳米光电机与生医工程实验室</Title>
                    <Title level={2} style={{ marginTop: 12, marginBottom: 5 }}>先进智能制造实验室</Title>
                </div>

                <div className={styles.enTitle}>
                    <SelectLang style={{ float: 'right' }} />
                    <Title level={2} style={{ marginBottom: 5 }}>(AIM-NOBELab)</Title>
                    <Title level={5} style={{ marginTop: 8, marginBottom: -5 }}>Advanced Intelligent Manufacturing Lab</Title>
                    <Title level={5} style={{ marginTop: 0, marginBottom: 5 }}>Nano Opto-mechatronics & Biomedical Engineering Lab</Title>
                </div>

            </Header>
            <Header style={{ display: 'flex', alignItems: 'center', background: 'red', justifyContent: 'center' }}>

                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={[location.pathname.split('/')[1]]}
                    items={menuKeys.map((_, index) => {
                        return {
                            key: _,
                            label: intl.formatMessage({
                                id: 'menu.' + _
                            }),
                            onClick: () => {
                                navigate('/' + _)
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
                    <Col span={18} offset={4}>
                        <div className="site-layout-content" style={{ background: colorBgContainer, marginTop: '25px' }}>
                            <Outlet />
                        </div>
                    </Col>
                </Row>

            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    );
}

export default index