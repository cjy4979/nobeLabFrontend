import { getNewsByPaperId } from '@/services/visit/newsController'
import { useLocation, useIntl, getLocale } from '@umijs/max'
import React, { useState, useEffect } from 'react'

function newsDetail() {
    const locale = getLocale()
    const location = useLocation()
    const paperId = location.search.split('?paperId=')[1]
    const [news, setNews] = useState<{ cn: string, en: string }>({ cn: "", en: "" })
    useEffect(() => {
        getNews()
    }, [])
    const getNews = async () => {
        const res = await getNewsByPaperId({ paperId: paperId })
        setNews(res.data)

    }
    return (
        <div style={{background:'#fff',padding:'20px 40px'}}
            dangerouslySetInnerHTML={{ __html: locale === 'zh-CN' ? news.cn.text : news.en.text }}
        >

        </div>
    )
}

export default newsDetail