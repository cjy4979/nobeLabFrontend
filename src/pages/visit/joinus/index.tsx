import { getRecruitByType } from '@/services/visit/joinusController'
import { useLocation, history, getLocale } from '@umijs/max'
import { Radio, Space } from 'antd'
import React, { useState, useEffect } from 'react'

function index() {
    const locale = getLocale()
    const location = useLocation()
    const [type, setType] = useState<string>(location.search.length>0 ? location.search.split('?type=')[1] : "students")
    const [news, setNews] = useState<{ cn: { text: string }, en: { text: string } }>({ cn: { text: '' }, en: { text: '' } })
    useEffect(() => {
        setNews({ cn: { text: '' }, en: { text: '' } })
        setType(location.search.length>0 ? location.search.split('?type=')[1] : "students")
        getText()        
    }, [type, location])
    const getText = async () => {
        const res = await getRecruitByType({ type: type })
        setNews(res.data.cn ? res.data : { cn: { text: '' }, en: { text: '' } })
    }
    return (
        <Space direction="vertical">
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '94%', marginLeft: '3%' }}>

                <Radio.Group defaultValue={type} style={{ minWidth: 800 }}>
                    <Radio.Button value="students" onClick={() => history.push("/visit/joinus?type=students")}>招募博硕士及本科生</Radio.Button>
                    <Radio.Button value="teachers" onClick={() => history.push("/visit/joinus?type=teachers")}>招募青年教师及专职科研人员</Radio.Button>
                    <Radio.Button value="assistants" onClick={() => history.push("/visit/joinus?type=assistants")}>招募科研助理</Radio.Button>
                </Radio.Group>
            </div>
            <div style={{ background: '#fff', padding: '20px 40px' }}
                dangerouslySetInnerHTML={{ __html: locale === 'zh-CN' ? news.cn.text : news.en.text }}
            >

            </div>
        </Space>

    )
}

export default index