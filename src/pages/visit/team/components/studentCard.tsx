import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import styles from './index.less'
import { getLocale, useIntl } from '@umijs/max';

const { Meta } = Card;

interface studentType {
    uid: string,
    name: string,
    year: string,
    eduQualification: string,
    graduatedSchool: string,
    researchDirection: string,
    hobby: string,
    imgpath: string
}

function studentCard(props: { uid: string, cn: studentType, en: studentType }) {
    const locale = getLocale()
    const intl = useIntl()
    const [data, setData] = useState<studentType>({
        uid: '',
        name: '',
        year: '',
        eduQualification: '',
        graduatedSchool: '',
        researchDirection: '',
        hobby: '',
        imgpath: ''
    })
    const cn = props.cn
    const en = props.en
    useEffect(() => {
        setData(locale === 'zh-CN' ? cn : en)
    }, [locale])

    const msg = {
        reD: intl.formatMessage({
            id: "student.researchDirection"
        }),
        hobby: intl.formatMessage({
            id: "student.hobby"
        }),
        graduatedFrom: intl.formatMessage({
            id: "student.graduatedFrom"
        }),
        addmissionYear: intl.formatMessage({
            id: "student.addmissionYear"
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
            <div className={styles.graduatedSchool}><b>{msg.addmissionYear}</b>--{data.year}</div>
            <div className={styles.graduatedSchool}><b>{msg.graduatedFrom}</b>--{data.graduatedSchool} </div>
            <div className={styles.researchDirection}><b>{msg.reD}</b>--{data.researchDirection}</div>
            <div className={styles.hobby}><b>{msg.hobby}</b>--{data.hobby}</div>
        </div>
    )
}

export default studentCard