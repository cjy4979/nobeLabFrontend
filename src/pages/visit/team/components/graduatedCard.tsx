import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import styles from './index.less'
import { getLocale, useIntl } from '@umijs/max';

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
function studentCard(props: { uid: string, cn: graduatedType, en: graduatedType }) {
    const locale = getLocale()
    const intl = useIntl()
    const [data, setData] = useState<graduatedType>({
        uid: '',
        name: '',
        graduatedYear: '',
        graduatedSchool: '',
        graduationDestination: '',
        major: '',
        imgpath: '',
        eduQualification: ''
    })
    const cn = props.cn
    const en = props.en
    useEffect(() => {
        setData(locale === 'zh-CN' ? cn : en)
    }, [locale])

    const msg = {
        time: intl.formatMessage({
            id: "graduated.time"
        }),
        major: intl.formatMessage({
            id: "graduated.major"
        }),
        graduatedFrom: intl.formatMessage({
            id: "graduated.graduatedFrom"
        }),
        graduationDestination: intl.formatMessage({
            id: "graduated.graduationDestination"
        })
    }
    const cnQualifi = {
        'PHD': '博士研究生',
        'master': '硕士研究生'
    }

    return (
        <div className={styles.card}>
            <div className={styles.photo}>
                <img src={data.imgpath} />
            </div>
            <h1 className={styles.name}>{data.name}</h1>
            <h3 className={styles.eduQualification}>{locale === 'zh-CN' ? cnQualifi[`${data.eduQualification}`] : data.eduQualification}</h3>
            <div className={styles.graduatedSchool}><b>{msg.time}/{msg.major}</b>--{data.graduatedYear} / {data.major}</div>
            <div className={styles.graduatedSchool}><b>{msg.graduatedFrom}</b>--{data.graduatedSchool} </div>
            <div className={styles.researchDirection}><b>{msg.graduationDestination}</b>--{data.graduationDestination}</div>
        </div>
    )
}

export default studentCard