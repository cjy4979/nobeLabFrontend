import { getIntro, getIntroImages } from '@/services/visit/introController'
import { useLocation, history, getLocale } from '@umijs/max'
import { Image, Space } from 'antd'
import React, { useState, useEffect } from 'react'

function index() {
  const locale = getLocale()
  const location = useLocation()
  const [news, setNews] = useState<{ cn: { text: string }, en: { text: string } }>({ cn: { text: '' }, en: { text: '' } })
  const [images, setImages] = useState([])
  useEffect(() => {
    getText()
  }, [location])
  const getText = async () => {
    const res = await getIntro()
    const resImage = await getIntroImages()
    setImages(resImage.data)
    setNews(res.data.cn ? res.data : { cn: { text: '' }, en: { text: '' } })
  }
  return (
    <Space direction="vertical" style={{background: '#fff'}}>
      <div style={{ background: '#fff', padding: '20px 40px' }}
        dangerouslySetInnerHTML={{ __html: locale === 'zh-CN' ? news.cn.text : news.en.text }}
      >
      </div>
      {images.map((item: any, index) => {
        return (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={item.path}/>
            <p style={{
              width: '100%',
              fontSize: '18px',
              textAlign: 'center'
            }}>{locale === 'zh-CN' ? item.name_cn : item.name_en}</p>
          </div>
        )
      })}
    </Space>

  )
}

export default index