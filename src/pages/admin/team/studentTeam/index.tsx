import React, { useEffect, useState } from 'react'
import { Button, Radio, message, Row, Col, List, Avatar, theme } from 'antd';
import { useLocation, useNavigate, history } from '@umijs/max';
import AddStudentModal from '../components/addStudentModal';
import { getStudents } from '@/services/admin/teamsController';
import UpdateStudentModal from '../components/updateStudentModal';


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

const beforeUpdate = {
  uid: '',
  cn: {
    uid: '',
    name: '',
    year: '',
    eduQualification: '',
    graduatedSchool: '',
    researchDirection: '',
    hobby: '',
    imgpath: ''
  },
  en: {
    uid: '',
    name: '',
    year: '',
    eduQualification: '',
    graduatedSchool: '',
    researchDirection: '',
    hobby: '',
    imgpath: ''
  }
}

function index() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  const location = useLocation()
  const [stuList, setStuList] = useState<{ uid: string, cn: studentType, en: studentType }[]>([])
  const [imgPath, setImgPath] = useState<string>('')
  const [isAddStudent, setIsAddStudent] = useState<boolean>(false)
  const [isUpdateStudent, setIsUpdateStudent] = useState<boolean>(false)
  const [whichUpdate, setWhichUpdate] = useState<{ uid: string, cn: studentType, en: studentType }>(beforeUpdate)

  const [student_cn, setStudent_cn] = useState<studentType>({
    uid: '',
    name: '',
    year: '',
    eduQualification: '',
    graduatedSchool: '',
    researchDirection: '',
    hobby: '',
    imgpath: ''
  })
  const [student_en, setStudent_en] = useState<studentType>({
    uid: '',
    name: '',
    year: '',
    eduQualification: '',
    graduatedSchool: '',
    researchDirection: '',
    hobby: '',
    imgpath: ''
  })
  useEffect(() => {
    getStudent()
  }, [])

  const getStudent = async () => {
    const res = await getStudents()
    if (res && res.success) {
      setStuList(res.data)
      return
    }
    message.error('出错了')
  }



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '94%', marginLeft: '3%' }}>
        <Radio.Group defaultValue={location.pathname.split('/')[3]}>
          <Radio.Button value="teachers" onClick={() => navigate('/admin/team/teachers')}>团队老师</Radio.Button>
          <Radio.Button value="students" onClick={() => navigate('/admin/team/students')}>团队学生</Radio.Button>
          <Radio.Button value="graduated" onClick={() => navigate('/admin/team/graduated')}>过往成员</Radio.Button>
        </Radio.Group>
        <Button type='primary' onClick={() => setIsAddStudent(true)}>添加学生</Button>
      </div>
      <Row style={{ marginTop: '20px' }}>
        <Col span={22} offset={1}>
          <List
            //pagination={{ position: 'bottom', align: 'center', onChange: onChange, total: total }}
            // header={


            // }
            grid={{ gutter: 16, column: 4 }}
            dataSource={stuList}
            style={{ background: colorBgContainer }}
            renderItem={(item, index) => (
              <List.Item
                onClick={() => {
                  setWhichUpdate(item)
                  setIsUpdateStudent(true)
                }}
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
      <AddStudentModal isAddStudent={isAddStudent}
        fresh={() => {
          getStudent()
          setIsAddStudent(false)
        }}
        cancel={() => setIsAddStudent(false)}
      />
      <UpdateStudentModal isUpdateStudent={isUpdateStudent}
        fresh={() => {
          getStudent()
          setIsUpdateStudent(false)
          setWhichUpdate(beforeUpdate)
        }}
        {...whichUpdate}
        cancel={() => {
          setWhichUpdate(beforeUpdate)
          setIsUpdateStudent(false)
        }}
      />
    </div>
  )
}

export default index