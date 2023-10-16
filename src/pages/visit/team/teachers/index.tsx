import React, { useEffect, useState } from 'react'
import { Avatar, List, Radio, theme, Card, Divider } from 'antd'
import { useNavigate, history, useIntl, getLocale } from '@umijs/max'
import { getTeachers, getTeachersByTitle } from '@/services/visit/teamsController'

const { Meta } = Card;

function index() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const intl = useIntl();
  const locale = getLocale()
  const navigate = useNavigate()
  const [proList, setProList] = useState([])
  const [APList, setAPList] = useState([])
  const [lecList, setLecList] = useState([])

  useEffect(() => {
    getTeacher()
  }, [])

  const msg = {
    teachers: intl.formatMessage({
      id: 'team.teachers'
    }),
    students: intl.formatMessage({
      id: 'team.students'
    }),
    graduated: intl.formatMessage({
      id: 'team.graduated'
    }),
    pro: intl.formatMessage({
      id: 'teacher.professor'
    }),
    AP: intl.formatMessage({
      id: 'teacher.assistant'
    }),
    lecturer: intl.formatMessage({
      id: 'teacher.lecturer'
    })
  }

  const getTeacher = async () => {
    const [resPro, resAP, resLec] = await Promise.all([
      getTeachersByTitle({ title: "professor" }),
      getTeachersByTitle({ title: "assitant" }),
      getTeachersByTitle({ title: "lecturer" }),
    ])
    setProList(resPro.data)
    setAPList(resAP.data)
    setLecList(resLec.data)
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '94%', marginLeft: '3%', marginBottom: '20px' }}>

        <Radio.Group defaultValue={location.pathname.split('/')[3]}>
          <Radio.Button value="teachers" onClick={() => navigate('/visit/team/teachers')}>{msg.teachers}</Radio.Button>
          <Radio.Button value="students" onClick={() => navigate('/visit/team/students')}>{msg.students}</Radio.Button>
          <Radio.Button value="graduated" onClick={() => navigate('/visit/team/graduated')}>{msg.graduated}</Radio.Button>
        </Radio.Group>

      </div>
      <Divider orientation="left">{msg.pro}</Divider>
      <List
        grid={{ gutter: 18, column: 4 }}
        dataSource={proList}
        style={{ background: colorBgContainer }}
        renderItem={(item: any, index) => (
          <List.Item
            key={index}
            onClick={() => history.push(`/visit/team/teacherDetail?uid=${item.uid}`)}

          >
            {/* <List.Item.Meta
              avatar={<Avatar size="large" src={item.cn.imgpath} />}
              title={item.cn.name + '/' + item.en.name}
            /> */}
            <Card
              hoverable
              style={{ width: 250, height: 480 }}
              cover={<img alt="example" src={item.cn.imgpath} />}
            >
              <Meta title={locale === 'zh-CN' ? item.cn.name : item.en.name} description={locale === 'zh-CN' ? item.cn.proTitle : item.en.proTitle} />
            </Card>
          </List.Item>
        )}
      />

      <Divider orientation="left">{msg.AP}</Divider>
      <List
        grid={{ gutter: 18, column: 4 }}
        dataSource={APList}
        style={{ background: colorBgContainer }}
        renderItem={(item: any, index) => (
          <List.Item
            key={index}
            onClick={() => history.push(`/visit/team/teacherDetail?uid=${item.uid}`)}

          >
            {/* <List.Item.Meta
              avatar={<Avatar size="large" src={item.cn.imgpath} />}
              title={item.cn.name + '/' + item.en.name}
            /> */}
            <Card
              hoverable
              style={{ width: 250, height: 480 }}
              cover={<img alt="example" src={item.cn.imgpath} />}
            >
              <Meta title={locale === 'zh-CN' ? item.cn.name : item.en.name} description={locale === 'zh-CN' ? item.cn.proTitle : item.en.proTitle} />
            </Card>
          </List.Item>
        )}
      />

      <Divider orientation="left">{msg.lecturer}</Divider>
      <List
        grid={{ gutter: 18, column: 4 }}
        dataSource={lecList}
        style={{ background: colorBgContainer }}
        renderItem={(item: any, index) => (
          <List.Item
            key={index}
            onClick={() => history.push(`/visit/team/teacherDetail?uid=${item.uid}`)}

          >
            {/* <List.Item.Meta
              avatar={<Avatar size="large" src={item.cn.imgpath} />}
              title={item.cn.name + '/' + item.en.name}
            /> */}
            <Card
              hoverable
              style={{ width: 250, height: 480 }}
              cover={<img alt="example" src={item.cn.imgpath} />}
            >
              <Meta title={locale === 'zh-CN' ? item.cn.name : item.en.name} description={locale === 'zh-CN' ? item.cn.proTitle : item.en.proTitle} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default index