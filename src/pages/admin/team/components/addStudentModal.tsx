import React, { useState } from 'react'
import { Button, Form, Input, Modal, Radio, Space, Upload, Image, UploadFile, message, Row, Col, Select, List, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { addStudent } from '@/services/admin/teamsController';

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

function addStudentModal(props: { isAddStudent: boolean, fresh: Function, cancel: Function }) {
    //const [isAddStudent, setIsAddStudent] = useState<boolean>(props.isAddStudent)

    const [imgPath, setImgPath] = useState<string>('')
    const [picList, setpPicList] = useState<UploadFile[]>([])
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

    const onClick = async () => {
        // if (!title_cn || !title_en) {
        //     message.error('请填写标题')
        //     return
        // }
        const uid = uuidv4()
        let cn = student_cn
        cn.imgpath = imgPath
        cn.uid = uid
        let en = student_en
        en.imgpath = imgPath

        en.uid = uid
        let data = {
            student_cn: cn,
            student_en: en
        }


        const resData = await addStudent(data)

        if (resData.success) {
            message.success('提交成功')
            //setIsAddStudent(false)
            props.fresh()
            return
        }
        message.error('提交失败请重试')
    }

    //中文表单的更改
    const onCnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setStudent_cn((pre) => ({
            ...pre,
            [id]: value,
        }));
    }
    const onEnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setStudent_en((pre) => ({
            ...pre,
            [id]: value,
        }));
    }

    //上传图片
    const uploadPic = async (file: any) => {
        let arr = picList
        const uploadData = new FormData();
        uploadData.append('image', file.file);
        const res = await axios.post('/api/admin/teams/image', uploadData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        });
        // 拿到调取接口返回的数据
        if (res.data.success) {
            const uid = uuidv4()
            setImgPath(res.data.data.url) //设置图片地址
            //setIntroPicId(uid) //设置uid
            arr.push({
                uid: uid,
                name: res.data.data.imageName,
                status: 'done',
                url: res.data.data.url,
            })
            setpPicList([...arr])

            return
        }
        message.error('图片上传失败')
    }
    const uploadPicProps = {
        name: 'image',
        multiple: false,
        showUploadList: false,
        customRequest: uploadPic
    };
    return (
        <Modal
            open={props.isAddStudent}
            footer={false}
            destroyOnClose={true}
            onCancel={() => props.cancel()}
            width={720}
        >
            <Row gutter={16}>
                {/* 中文信息 */}
                <Col span={11}>
                    <Form >
                        <Form.Item label="照片" valuePropName="fileList">
                            <Space>
                                <Image
                                    width={100}
                                    src={imgPath}
                                />
                                <Upload listType="picture-card"
                                    maxCount={1}
                                    accept="image/*"
                                    {...uploadPicProps}
                                    fileList={picList}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>选择图片</div>
                                    </div>
                                </Upload>
                            </Space>
                        </Form.Item>
                        <Form.Item label="中文名" name="name" rules={[{ required: true, message: '请输入中文名!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="学历" name="eduQualification" rules={[{ required: true, message: '请选择学历!' }]}>
                            <Select
                                //style={{ width: 120 }}
                                onChange={(e) => { setStudent_cn((pre) => ({ ...pre, eduQualification: e })) }}
                                options={[
                                    { value: 'master', label: '硕士' },
                                    { value: 'PHD', label: '博士' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="入学年份" name="year" rules={[{ required: true, message: '请输入入学年份!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="毕业学校" name="graduatedSchool" rules={[{ required: true, message: '请输入毕业学校!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="研究方向" name="researchDirection" rules={[{ required: true, message: '请输入研究方向!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="爱好" name="hobby" rules={[{ required: true, message: '请输入爱好!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                    </Form>
                </Col>

                {/* 英文信息 */}
                <Col span={11} offset={2}>
                    <Form >
                        <Form.Item label="照片" valuePropName="fileList">
                            <Space>
                                <Image
                                    width={100}
                                    src={imgPath}
                                />
                                <Upload listType="picture-card"
                                    maxCount={1}
                                    accept="image/*"
                                    {...uploadPicProps}
                                    fileList={picList}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>选择图片</div>
                                    </div>
                                </Upload>
                            </Space>
                        </Form.Item>
                        <Form.Item label="英文名" name="name" rules={[{ required: true, message: '请输入英文名!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="学历" name="eduQualification" rules={[{ required: true, message: '请选择学历!' }]}>
                            <Select
                                //style={{ width: 120 }}
                                onChange={(e) => { setStudent_en((pre) => ({ ...pre, eduQualification: e })) }}
                                options={[
                                    { value: 'master', label: 'MASTER' },
                                    { value: 'PHD', label: 'PHD' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="入学年份" name="year" rules={[{ required: true, message: '请输入入学年份!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="毕业学校(英)" name="graduatedSchool" rules={[{ required: true, message: '请输入毕业学校!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="研究方向(英)" name="researchDirection" rules={[{ required: true, message: '请输入研究方向!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="爱好(英)" name="hobby" rules={[{ required: true, message: '请输入爱好!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Button onClick={onClick} type="primary" >提交</Button>
        </Modal>
    )
}

export default addStudentModal