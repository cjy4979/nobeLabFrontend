import { Descriptions } from 'antd';
import React from 'react'

interface teacherType {
    uid: string,
    name: string,
    proTitle: string,
    title: string,
    education: string,
    researchDirection: string,
    email: string,
    imgpath: string,
    introDetail: string
}

function teacher(props: { uid: string, cn: teacherType, en: teacherType }) {
    return (
        <Descriptions size={'small'} title={props.cn.name + "/" + props.en.name}>
            <Descriptions.Item label="职称">{props.cn.proTitle}</Descriptions.Item>
            <Descriptions.Item label="学历/经历">{props.cn.education}</Descriptions.Item>
            <Descriptions.Item label="研究方向">{props.cn.researchDirection}</Descriptions.Item>
            <Descriptions.Item label="职称(英)">{props.cn.proTitle}</Descriptions.Item>
            <Descriptions.Item label="学历/经历(英)">{props.en.education}</Descriptions.Item>
            <Descriptions.Item label="研究方向(英)">{props.en.researchDirection}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{props.cn.email}</Descriptions.Item>
        </Descriptions>
    )
}

export default teacher