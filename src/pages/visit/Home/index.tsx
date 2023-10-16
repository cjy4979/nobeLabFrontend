import { getLocale, useIntl, history } from '@umijs/max';
import styles from './index.less';
import { Card, Carousel, Col, Row, ConfigProvider, Typography, List, Image } from 'antd';
import { useEffect, useState } from 'react';
import { getCarousel, getIntro, getNewsList, getRecruitList, getAchievementsPic } from '@/services/visit/homeConroller';
import dayjs from 'dayjs'

const { Title } = Typography;

const HomePage: React.FC = () => {
  const intl = useIntl();
  const locale = getLocale()
  const contentStyle: React.CSSProperties = {
    minHeight: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const [intro, setIntro] = useState<{ cn: string, en: string }>({ cn: '', en: '' })
  const [carousel, setCarousel] = useState([])
  const [achievement, setAchievement] = useState([])
  const [newsList, setNewsList] = useState<any>({ cn: [], en: [] })
  const [recruitList, setRecruitList] = useState<any>({ cn: [], en: [] })

  const msg = {
    intro: intl.formatMessage({
      id: 'menu.intro'
    }),
    introDetail: intl.formatMessage({
      id: 'home.intro'
    }),
    news: intl.formatMessage({
      id: 'menu.news'
    }),
    recruit: intl.formatMessage({
      id: 'menu.joinus'
    }),
    achievements: intl.formatMessage({
      id: 'menu.achievements'
    })
  }
  useEffect(() => {
    getIndexMsg()
  }, [])

  const getIndexMsg = async () => {
    const [resCarousel, resIntro, resNewList, resJoinus, resAchievements] = await Promise.all([
      getCarousel(),
      getIntro(),
      getNewsList(),
      getRecruitList(),
      getAchievementsPic()
    ])

    setIntro({
      cn: resIntro.data.cn.text,
      en: resIntro.data.en.text
    })
    setCarousel(resCarousel.data)
    setNewsList(resNewList.data)
    setRecruitList(resJoinus.data)
    setAchievement(resAchievements.data)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          //colorPrimary: '#00b96b',
          //borderRadius: 2,

          // 派生变量，影响范围小
          //colorBgContainer: '#f6ffed',
        },
        components: {
          Card: {
            headerBg: '#086CBA',
            extraColor: '#ffffff'
          },
        },
      }}
    >

      <div className={styles.container}>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 32]}>
          {/* 轮播图 */}
          <Col span={12}>
            <Carousel autoplay>
              {carousel.map((item: any, index) => {
                return (
                  <div key={index}>
                    <Image height={500} src={item.path} width={'100%'} />
                    <p style={{
                      position: 'absolute',
                      bottom: -12,
                      left: 0,
                      width: '100%',
                      backgroundColor: 'lightgray',
                      fontSize: '18px',
                      textAlign: 'center'
                    }}>{locale === 'zh-CN' ? item.name_cn : item.name_en}</p>
                  </div>
                )
              })}
            </Carousel>
          </Col>
          {/* 实验室简介 */}
          <Col span={12} >
            <Card title={<Title level={4} style={{ color: '#ffffff', marginBottom: 0 }}>{msg.intro}</Title>}
              extra={<a href="/visit/intro" style={{ color: '#ffffff' }}>More</a>}
              style={{ width: "100%", height: 500 }}
              bordered={false}>
              <div style={{ textIndent: '2em' }} >
                {locale === 'zh-CN' ? intro.cn : intro.en}
              </div>
            </Card>
          </Col>

          {/* 最新消息 */}
          <Col span={8}>
            <Card title={<Title level={4} style={{ color: '#ffffff', marginBottom: 0 }}>{msg.news}</Title>}
              extra={<a href="/visit/news" style={{ color: '#ffffff' }}>More</a>}
              style={{ width: "100%", height: 410 }}
              bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={locale === 'zh-CN' ? newsList.cn : newsList.en}
                renderItem={(item: any, index) => (
                  <List.Item extra={dayjs(item.createdAt).format('YYYY-MM-DD')}
                  onClick={()=>history.push(`/visit/newsDetail?paperId=${item.paperId}`)}
                  
                  >
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '75%' }}>{item.title}</p>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          {/* 人才招聘 */}
          <Col span={8}>
            <Card title={<Title level={4} style={{ color: '#ffffff', marginBottom: 0 }}>{msg.recruit}</Title>}
              extra={<a href="/visit/joinus" style={{ color: '#ffffff' }}>More</a>}
              style={{ width: "100%", height: 410 }}
              bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={locale === 'zh-CN' ? recruitList.cn : recruitList.en}
                renderItem={(item: any, index) => (
                  <List.Item
                    extra={dayjs(item.createdAt).format('YYYY-MM-DD')}
                    onClick={()=>history.push(`/visit/joinus?type=${item.type}`)}
                  >
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '75%' }}>{item.title}</p>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* 研究成果 */}
          <Col span={8} >
            <Card title={<Title level={4} style={{ color: '#ffffff', marginBottom: 0 }}>{msg.achievements}</Title>}
              extra={<a href="/visit/intro" style={{ color: '#ffffff' }}>More</a>}
              style={{ width: "100%" }}
              bordered={false}>
              <Carousel autoplay>
                {achievement.map((item: any, index) => {
                  return (
                    <div key={index}>
                      <Image height={300} src={item.path} width={'100%'} />
                    </div>
                  )
                })}
              </Carousel>
            </Card>

          </Col>
        </Row>

        <Row>

        </Row>


      </div>

    </ConfigProvider>
  );
};

export default HomePage;
