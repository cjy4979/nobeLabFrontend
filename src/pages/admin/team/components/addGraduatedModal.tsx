import React, { useState } from 'react'
import { Button, Form, Input, Modal, Radio, Space, Upload, Image, UploadFile, message, Row, Col, Select, List, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { addGraduated } from '@/services/admin/teamsController';

interface graduatedType {
    uid: string,
    name: string,
    graduatedYear: string,
    graduatedSchool: string,
    graduationDestination: string,
    major: string,
    imgpath: string,
    eduQualification: string
}

function addStudentModal(props: { isAddGraduated: boolean, fresh: Function, cancel: Function }) {
    //const [isAddStudent, setIsAddStudent] = useState<boolean>(props.isAddStudent)

    const [imgPath, setImgPath] = useState<string>('')
    const [picList, setpPicList] = useState<UploadFile[]>([])
    const [graduated_cn, setGraduated_cn] = useState<graduatedType>({
        uid: '',
        name: '',
        graduatedYear: '',
        graduatedSchool: '',
        graduationDestination: '',
        major: '',
        imgpath: '',
        eduQualification: ''
    })
    const [graduated_en, setGraduated_en] = useState<graduatedType>({
        uid: '',
        name: '',
        graduatedYear: '',
        graduatedSchool: '',
        graduationDestination: '',
        major: '',
        imgpath: '',
        eduQualification: ''
    })

    const onClick = async () => {
        // if (!title_cn || !title_en) {
        //     message.error('请填写标题')
        //     return
        // }
        const uid = uuidv4()
        let cn = graduated_cn
        cn.imgpath = imgPath
        cn.uid = uid
        let en = graduated_en
        en.imgpath = imgPath

        en.uid = uid
        let data = {
            graduated_cn: cn,
            graduated_en: en
        }


        const resData = await addGraduated(data)

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
        setGraduated_cn((pre) => ({
            ...pre,
            [id]: value,
        }));
    }
    const onEnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setGraduated_en((pre) => ({
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
            open={props.isAddGraduated}
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
                                onChange={(e) => { setGraduated_cn((pre) => ({ ...pre, eduQualification: e })) }}
                                options={[
                                    { value: 'master', label: '硕士' },
                                    { value: 'PHD', label: '博士' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="毕业时间" name="graduatedYear" rules={[{ required: true, message: '请输入毕业年份!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="专业" name="major" rules={[{ required: true, message: '请输入专业!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="毕业院校/专业" name="graduatedSchool" rules={[{ required: true, message: '请输入院校/专业!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="毕业去向" name="graduationDestination" rules={[{ required: true, message: '请输入毕业去向!' }]}>
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
                                onChange={(e) => { setGraduated_en((pre) => ({ ...pre, eduQualification: e })) }}
                                options={[
                                    { value: 'master', label: 'MASTER' },
                                    { value: 'PHD', label: 'PHD' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="毕业时间" name="graduatedYear" rules={[{ required: true, message: '请输入毕业时间!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="专业" name="major" rules={[{ required: true, message: '请输入专业!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="本科院校/专业(英)" name="graduatedSchool" rules={[{ required: true, message: '请输入本科院校/专业!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="毕业去向(英)" name="graduationDestination" rules={[{ required: true, message: '请输入毕业去向!' }]}>
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