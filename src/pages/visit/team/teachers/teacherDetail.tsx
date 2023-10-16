import React, { useEffect, useState } from 'react'
import styles from './index.less'
import { getTeacherByUid } from '@/services/visit/teamsController'
import { getLocale, useIntl } from '@umijs/max'
import { Col, Divider, Row, Typography } from 'antd'

interface teacherType {
    uid: string,
    name: string,
    proTitle: string,
    title: string,
    education: string,
    researchDirection: string,
    email: string,
    imgpath: string,
    introDetail: string,
}

const beforeGet = {
    uid: '',
    name: '',
    proTitle: '',
    title: '',
    education: '',
    researchDirection: '',
    email: '',
    imgpath: '',
    introDetail: '',
}
const { Title, Text } = Typography

function teacherDetail() {
    const intl = useIntl()
    const locale = getLocale()
    const uid = location.search.split('?uid=')[1]
    const [cn, setCn] = useState<teacherType>(beforeGet)
    const [en, setEn] = useState<teacherType>(beforeGet)
    const msg = {
        edu: intl.formatMessage({
            id: 'teacher.education'
        }),
        researchD: intl.formatMessage({
            id: 'teacher.researchDirection'
        }),
        email: intl.formatMessage({
            id: 'teacher.email'
        })
    }
    useEffect(() => {
        getTeacher()
    }, [])
    const getTeacher = async () => {
        const res = await getTeacherByUid({ uid: uid })
        setCn(res.data.cn)
        setEn(res.data.en)
    }
    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <div className={styles.left}>
                    <img src={cn.imgpath} />
                </div>

                <div className={styles.descrption}>
                    <Title level={3} style={{ marginBottom: 0 }}>{locale === 'zh-CN' ? cn.name : en.name}</Title>
                    <Title level={4} style={{ marginTop: 12 }} color='lightgrey'>{locale === 'zh-CN' ? cn.proTitle : en.proTitle}</Title>
                    <Row>
                        <Col span={locale === 'zh-CN' ? 2 : 4}>
                            <Title level={5}>
                                {msg.edu}
                            </Title>
                        </Col>
                        <Col span={locale === 'zh-CN' ? 21 : 19} offset={1}>
                            <p>{locale === 'zh-CN' ? cn.education : en.education}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={locale === 'zh-CN' ? 2 : 4}>
                            <Title level={5}>
                                {msg.researchD}
                            </Title>
                        </Col>
                        <Col span={locale === 'zh-CN' ? 21 : 19} offset={1}>
                            <p>{locale === 'zh-CN' ? cn.researchDirection : en.researchDirection}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={locale === 'zh-CN' ? 2 : 4}>
                            <Title level={5}>
                                {msg.email}
                            </Title>
                        </Col>
                        <Col span={locale === 'zh-CN' ? 21 : 19} offset={1}>
                            <p>{locale === 'zh-CN' ? cn.email : en.email}</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <Divider />
            <div dangerouslySetInnerHTML={{ __html: locale === 'zh-CN' ? cn.introDetail : en.introDetail }}>

            </div>
        </div>
    )
}

export default teacherDetail