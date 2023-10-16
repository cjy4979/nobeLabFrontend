import React, { useEffect, useState } from 'react'
import { Avatar, List, Radio, theme, Card, Divider } from 'antd'
import { useNavigate, history, useIntl, getLocale } from '@umijs/max'
import { getStudents } from '@/services/visit/teamsController'
import StudentCard from '../components/studentCard';

const { Meta } = Card;

function index() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const intl = useIntl();
  const locale = getLocale()
  const navigate = useNavigate()
  const [studentList, setStudentList] = useState([])
  useEffect(() => {
    getStudent()
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
  }

  const getStudent = async () => {
    const res = await getStudents()
    setStudentList(res.data)
    console.log(res);

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
      <Divider></Divider>
      <List
        grid={{ gutter: 16 }}
        dataSource={studentList}
        style={{ background: colorBgContainer }}
        renderItem={(item: any, index) => (
          <List.Item
            key={index}
          >
            {/* <List.Item.Meta
              avatar={<Avatar size="large" src={item.cn.imgpath} />}
              title={item.cn.name + '/' + item.en.name}
            /> */}
            <StudentCard {...item} />
          </List.Item>
        )}
      />
    </div>
  )
}

export default index