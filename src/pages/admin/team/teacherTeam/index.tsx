import React, { useEffect, useState } from 'react'
import { Col, Radio, Row, message, Image, Button, List, Avatar, theme } from 'antd';
import { history, useLocation, useNavigate } from '@umijs/max';
import { getTeachers } from '@/services/admin/teamsController';
import Teacher from '../components/teacher';
import Title from 'antd/es/typography/Title';

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

function index() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  const location = useLocation()
  const [teachers, setTeachers] = useState<{ uid: string, cn: teacherType, en: teacherType }[]>([])
  useEffect(() => {
    console.log(location.pathname.split('/')[3]);
    getTeacher()
  }, [])
  const getTeacher = async () => {
    const res = await getTeachers()
    if (res.success) {
      setTeachers(res.data)
      return
    }
    message.error('请求失败')

  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '94%', marginLeft: '3%' }}>

        <Radio.Group defaultValue={location.pathname.split('/')[3]}>
          <Radio.Button value="teachers" onClick={() => navigate('/admin/team/teachers')}>团队老师</Radio.Button>
          <Radio.Button value="students" onClick={() => navigate('/admin/team/students')}>团队学生</Radio.Button>
          <Radio.Button value="graduated" onClick={() => navigate('/admin/team/graduated')}>过往成员</Radio.Button>
        </Radio.Group>
        <Button type='primary' onClick={() => history.push('/admin/team/addteacher')}>添加老师</Button>

      </div>
      <Row style={{ marginTop: '20px' }}>
        {/* {
          teachers.map((item) => {
            return (
              <Col span={12} key={item['uid']} style={{ display: 'flex' }}>
                <Image src={item.cn.imgpath} style={{ minHeight: 140, minWidth: 100 }} />
                <Teacher key={item['uid']} {...item} />
              </Col>
            )

          })
        } */}
        <Col span={22} offset={1}>
          <List
            //pagination={{ position: 'bottom', align: 'center', onChange: onChange, total: total }}
            // header={


            // }
            grid={{ gutter: 16, column: 4 }}
            dataSource={teachers}
            style={{ background: colorBgContainer }}
            renderItem={(item, index) => (
              <List.Item
                //extra={<p>{dayjs(item.createdAt).format('YYYY-MM-DD')}</p>}
                onClick={() => history.push(`/admin/team/teacherDetail?uid=${item.uid}`)}

              >
                <List.Item.Meta
                  avatar={<Avatar size="large" src={item.cn.imgpath} />}
                  title={item.cn.name + '/' + item.en.name}
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