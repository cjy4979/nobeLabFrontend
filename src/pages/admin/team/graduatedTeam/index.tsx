import React, { useEffect, useState } from 'react'
import { Button, Radio, message, Row, Col, List, Avatar, theme } from 'antd';

import { useLocation, useNavigate, history } from '@umijs/max';
import { getGraduated } from '@/services/admin/teamsController';
import AddGraduatedModal from '../components/addGraduatedModal';
import UpdateGraduatedModal from '../components/updateGraduatedModal';

interface graduatedType {
    uid: string,
    name: string,
    graduatedYear: string,
    graduatedSchool: string,
    graduationDestination: string,
    major: string,
    imgpath: string,
    eduQualification: string
}
const beforeUpdate = {
    uid: '',
    name: '',
    graduatedYear: '',
    graduatedSchool: '',
    graduationDestination: '',
    major: '',
    imgpath: '',
    eduQualification: ''
}

function index() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate()
    const location = useLocation()
    const [graList, setGraList] = useState<{ uid: string, cn: graduatedType, en: graduatedType }[]>([])

    const [isAddGraduated, setIsAddGraduated] = useState<boolean>(false)
    const [isUpdateGraduated, setIsUpdateGraduated] = useState<boolean>(false)
    const [whichUpdate, setWhichUpdate] = useState<{ uid: string, cn: graduatedType, en: graduatedType }>({
        uid: '',
        cn: beforeUpdate,
        en: beforeUpdate
    })

    useEffect(() => {
        getGraduatedStudent()
    }, [])

    const getGraduatedStudent = async () => {
        const res = await getGraduated()
        if (res && res.success) {
            setGraList(res.data)
            return
        }
        message.error('出错了')
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '94%', marginLeft: '3%' }}>

                <Radio.Group defaultValue={location.pathname.split('/')[3]}>
                    <Radio.Button value="teachers" onClick={() => navigate('/admin/team/teachers')}>团队老师</Radio.Button>
                    <Radio.Button value="students" onClick={() => navigate('/admin/team/students')}>团队学生</Radio.Button>
                    <Radio.Button value="graduated" onClick={() => navigate('/admin/team/graduated')}>过往成员</Radio.Button>
                </Radio.Group>
                <Button type='primary' onClick={() => setIsAddGraduated(true)}>添加过往成员</Button>

            </div>
            <Row style={{ marginTop: '20px' }}>
                <Col span={22} offset={1}>
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={graList}
                        style={{ background: colorBgContainer }}
                        renderItem={(item, index) => (
                            <List.Item
                                //extra={<p>{dayjs(item.createdAt).format('YYYY-MM-DD')}</p>}
                                onClick={() => {
                                    setWhichUpdate(item)
                                    setIsUpdateGraduated(true)
                                }}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size="large" src={item.cn.imgpath} />}
                                    title={item.cn.name + '/' + item.en.name}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
            <AddGraduatedModal isAddGraduated={isAddGraduated}
                fresh={() => {
                    getGraduatedStudent()
                    setIsAddGraduated(false)
                }}
                cancel={() => setIsAddGraduated(false)}
            />
            <UpdateGraduatedModal isUpdateGraduated={isUpdateGraduated}
                fresh={() => {
                    getGraduatedStudent()
                    setIsUpdateGraduated(false)
                    setWhichUpdate({ uid: '', cn: beforeUpdate, en: beforeUpdate })
                }}
                {...whichUpdate}
                cancel={() => {
                    setIsUpdateGraduated(false)
                    setWhichUpdate({ uid: '', cn: beforeUpdate, en: beforeUpdate })
                }}
            />
        </div>
    )
}

export default index