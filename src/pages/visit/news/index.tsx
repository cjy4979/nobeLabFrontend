import { getNewsList } from '@/services/visit/newsController'
import { Button, Col, List, Row, theme, message, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { history } from '@umijs/max'
import { getLocale, useIntl } from '@umijs/max';
const { Title } = Typography

function index() {
  const intl = useIntl();
  const locale = getLocale()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [newsList, setNewsList] = useState<any>({ cn: [], en: [] })
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const res = await getNewsList({ current: current, pageSize: pageSize })
    if (res.success) {
      setNewsList({ cn: res.data.cn, en: res.data.en })
      setTotal(res.data.total)
      return
    }
    message.error('请求出错')
  }
  const onChange = (page: React.SetStateAction<number>) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <List
            pagination={{ position: 'bottom', align: 'center', onChange: onChange, total: total }}
            style={{ background: colorBgContainer }}
            dataSource={locale === 'zh-CN' ? newsList.cn : newsList.en}
            renderItem={(item: any, index) => (
              <List.Item
                extra={<p>{dayjs(item.createdAt).format('YYYY-MM-DD')}</p>}
                onClick={() => history.push(`/visit/newsDetail?paperId=${item.paperId}`)}
                style={{ margin: '0 20px' }}
              >
                <List.Item.Meta
                  title={item.title}
                //description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>

    </div>
  )
}
export default index
