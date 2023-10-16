import React, { useEffect, useState } from 'react'
import {List, Radio, theme,  Divider } from 'antd'
import { useNavigate, history, useIntl, getLocale } from '@umijs/max'
import { getGraduated } from '@/services/visit/teamsController'
import GraduatedCard from '../components/graduatedCard';


function index() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const intl = useIntl();
    const locale = getLocale()
    const navigate = useNavigate()
    const [GraduatedList, setGraduatedList] = useState([])
    useEffect(() => {
        getGraduatedList()
    }, [])

    const msg = {
        Graduateds: intl.formatMessage({
            id: 'team.Graduateds'
        }),
        students: intl.formatMessage({
            id: 'team.students'
        }),
        graduated: intl.formatMessage({
            id: 'team.graduated'
        }),
    }

    const getGraduatedList = async () => {
        const res = await getGraduated()
        setGraduatedList(res.data)
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '94%', marginLeft: '3%', marginBottom: '20px' }}>

                <Radio.Group defaultValue={location.pathname.split('/')[3]}>
                    <Radio.Button value="Graduateds" onClick={() => navigate('/visit/team/Graduateds')}>{msg.Graduateds}</Radio.Button>
                    <Radio.Button value="students" onClick={() => navigate('/visit/team/students')}>{msg.students}</Radio.Button>
                    <Radio.Button value="graduated" onClick={() => navigate('/visit/team/graduated')}>{msg.graduated}</Radio.Button>
                </Radio.Group>

            </div>
            <List
                grid={{ gutter: 16 }}
                dataSource={GraduatedList}
                style={{ background: colorBgContainer }}
                renderItem={(item: any, index) => (
                    <List.Item
                        key={index}
                    >
                        <GraduatedCard {...item} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default index