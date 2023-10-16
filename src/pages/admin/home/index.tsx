import { Button, Card, Form, Input, Modal, Space, Upload, UploadFile, message, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import MyCarousel from './components/MyCarousel'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from '@umijs/max';
import { v4 as uuidv4 } from 'uuid';
import { addAchievementsPic, addCarousel, getAchievementsPic, getCarousel, getIntro, updateIntro } from '@/services/admin/homeConroller';
import axios from 'axios';
import MyAchievement from './components/MyAchievement';

declare interface carousel {
    id: string,
    picId: string,
    name_cn: string,
    name_en: string,
    path: string,
    isShow: number
}

function index() {
    const navigate = useNavigate()
    const [carousel, setCarousel] = useState<carousel[]>([])
    const [isAddCarousel, setIsAddCarousel] = useState<boolean>(false)
    const [carouselPath, setCarsouselPath] = useState<string>()
    const [carouselImageName, setCarsouselImageName] = useState<string>()
    const [carouselId, setCarouselId] = useState<string>()
    const [carouselList, setCarouselList] = useState<UploadFile[]>([])

    const [achievement, setAchievement] = useState<carousel[]>([])
    const [isAddAchievement, setIsAddAchievement] = useState<boolean>(false)
    const [achievementPath, setAchievementPath] = useState<string>()
    const [achievementImageName, setAchievementImageName] = useState<string>()
    const [achievementId, setAchievementId] = useState<string>()
    const [achievementList, setAchievementList] = useState<UploadFile[]>([])

    const [intro, setIntro] = useState<{ intro_cn: string, intro_en: string }>({ intro_cn: '', intro_en: '' })
    const [form] = Form.useForm()
    const [isUpdateIntro, setIsUpdateIntro] = useState<boolean>(false)

    useEffect(() => {
        getCarouselPics()
        getAchievementPics()
        getHomeIntro()
    }, [])


    //获取走马灯图片
    const getCarouselPics = async () => {
        setCarousel([])
        const data = await getCarousel()
        if (data.success) {
            setCarousel(data.data)
            return
        }
        message.error('请求失败，请尝试')
    }


    //提交走马灯
    const onCarouselFinish = async (values: any) => {
        if (!carouselPath) {
            alert('请上传图片')
            return
        }
        const reqData = {
            ...values,
            path: carouselPath,
            picId: carouselId,
            imageName: carouselImageName,
            type: 'carousel',
            isShow: 1
        }
        const data = await addCarousel(reqData)
        if (data.success) {
            message.success("上传成功！")
            setIsAddCarousel(false)
            getCarouselPics()
            return
        }
        message.error('出错了!')
    };
    //上传走马灯图片
    const uploadCarousel = async (file: any) => {
        let arr = carouselList
        const uploadData = new FormData();
        uploadData.append('image', file.file);
        const res = await axios.post('/api/admin/home/image', uploadData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        });
        // 拿到调取接口返回的数据
        if (res.data.success) {
            const uid = uuidv4()
            setCarsouselPath(res.data.data.url) //设置图片地址
            setCarsouselImageName(res.data.data.imageName)
            setCarouselId(uid) //设置uid
            arr.push({
                uid: uid,
                name: res.data.data.imageName,
                status: 'done',
                url: res.data.data.url,
            })
            setCarouselList([...arr])

            return
        }
        message.error('图片上传失败')
    }
    const uploadCarouselProps = {
        name: 'image',
        multiple: false,
        showUploadList: false,
        customRequest: uploadCarousel
    };

    //获取科研成果图片
    const getAchievementPics = async () => {
        setAchievement([])
        const data = await getAchievementsPic()
        if (data.success) {
            setAchievement(data.data)
            return
        }
        message.error('请求失败，请尝试')
    }


    //提交科研成果图片
    const onAchievementFinish = async (values: any) => {
        if (!achievementPath) {
            alert('请上传图片')
            return
        }
        const reqData = {
            ...values,
            path: achievementPath,
            picId: achievementId,
            imageName: achievementImageName,
            type: 'achievement',
            isShow: 1
        }
        const data = await addAchievementsPic(reqData)
        if (data.success) {
            message.success("上传成功！")
            setIsAddAchievement(false)
            getAchievementPics()
            return
        }
        message.error('出错了!')
    };
    //上传科研成果图片
    const uploadAchievement = async (file: any) => {
        let arr = achievementList
        const uploadData = new FormData();
        uploadData.append('image', file.file);
        const res = await axios.post('/api/admin/home/image', uploadData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        });
        // 拿到调取接口返回的数据
        if (res.data.success) {
            const uid = uuidv4()
            setAchievementPath(res.data.data.url) //设置图片地址
            setAchievementImageName(res.data.data.imageName)
            setAchievementId(uid) //设置uid
            arr.push({
                uid: uid,
                name: res.data.data.imageName,
                status: 'done',
                url: res.data.data.url,
            })
            setAchievementList([...arr])

            return
        }
        message.error('图片上传失败')
    }
    const uploadAchievementProps = {
        name: 'image',
        multiple: false,
        showUploadList: false,
        customRequest: uploadAchievement
    };

    //获取实验室简介
    const getHomeIntro = async () => {
        const res = await getIntro()
        if (res.success) {
            setIntro({
                intro_cn: res.data.cn[0] ? res.data.cn[0].text : '',
                intro_en: res.data.en[0] ? res.data.en[0].text : ''
            })
            form.setFieldsValue({
                intro_cn: res.data.cn[0] ? res.data.cn[0].text : '',
                intro_en: res.data.en[0] ? res.data.en[0].text : ''
            })
            return
        }
        message.error('请求失败，请尝试')
    }

    const onIntroFinish = async (values: { intro_cn: string, intro_en: string }) => {
        const res = await updateIntro(values)
        if (res.success) {
            message.success('更新成功')
            setIsUpdateIntro(false)
            getHomeIntro()
            return
        }
        message.error('失败，请重试')
    }


    return (
        <div>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {/* 走马灯控制 */}
                <div>
                    <Card title="实验室图片" extra={<Button type='primary' onClick={() => setIsAddCarousel(true)}>添加图片</Button>}>
                        <Space size="large" style={{ width: "100%", overflowX: "scroll", WebkitOverflowScrolling: "touch" }}>
                            {
                                carousel.map((item) => {
                                    return <MyCarousel key={item['id']} {...item} fresh={getCarouselPics} />
                                })
                            }
                        </Space>
                    </Card>
                </div>
                {/* 科研成果控制 */}
                <div>
                    <Card title="科研成果图片" extra={<Button type='primary' onClick={() => setIsAddAchievement(true)}>添加图片</Button>}>
                        <Space size="large" style={{ width: "100%", overflowX: "scroll", WebkitOverflowScrolling: "touch" }}>
                            {
                                achievement.map((item) => {
                                    return <MyAchievement key={item['id']} {...item} fresh={getAchievementPics} />
                                })
                            }
                        </Space>
                    </Card>
                </div>
                {/* 实验室简介 */}
                <div>
                    <Card title="实验室简介"
                        extra={<Button type={isUpdateIntro ? 'dashed' : 'primary'} onClick={() => setIsUpdateIntro(!isUpdateIntro)}>{isUpdateIntro ? '取消' : '更新'}</Button>}
                    >
                        <Form onFinish={onIntroFinish} form={form}>
                            <Form.Item name="intro_cn" label="中文简介" initialValue={intro.intro_cn} >
                                <Input.TextArea disabled={!isUpdateIntro}>
                                </Input.TextArea>
                            </Form.Item>
                            <Form.Item name="intro_en" label="英文简介" initialValue={intro.intro_en}>
                                <Input.TextArea disabled={!isUpdateIntro}>
                                </Input.TextArea>
                            </Form.Item>
                            <Button type='primary' htmlType="submit" style={{ display: isUpdateIntro ? 'block' : 'none' }}>提交</Button>
                        </Form>
                    </Card>
                </div>
            </Space>

            <Modal
                open={isAddCarousel}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setIsAddCarousel(false)}
            >
                <Form onFinish={onCarouselFinish}>
                    <Form.Item label="图片" valuePropName="fileList">
                        <Space>
                            <Image
                                width={100}
                                src={carouselPath}
                            //style={{ display: carouselPath ? "block" : "none" }}
                            />
                            <Upload listType="picture-card"
                                maxCount={1}
                                accept="image/*"
                                {...uploadCarouselProps}
                                fileList={carouselList}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>选择图片</div>
                                </div>
                            </Upload>
                        </Space>
                    </Form.Item>
                    <Form.Item name='name_cn' label='中文名' rules={[{ required: true, message: '请输入图片中文名' }]}>
                        <Input >
                        </Input>
                    </Form.Item>
                    <Form.Item name='name_en' label='英文名' rules={[{ required: true, message: '请输入图片英文名' }]}>
                        <Input >
                        </Input>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={isAddAchievement}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setIsAddAchievement(false)}
            >
                <Form onFinish={onAchievementFinish}>
                    <Form.Item label="图片" valuePropName="fileList">
                        <Space>
                            <Image
                                width={100}
                                src={carouselPath}
                            //style={{ display: carouselPath ? "block" : "none" }}
                            />
                            <Upload listType="picture-card"
                                maxCount={1}
                                accept="image/*"
                                {...uploadAchievementProps}
                                fileList={achievementList}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>选择图片</div>
                                </div>
                            </Upload>
                        </Space>
                    </Form.Item>
                    <Form.Item name='name_cn' label='中文名' rules={[{ required: true, message: '请输入图片中文名' }]}>
                        <Input >
                        </Input>
                    </Form.Item>
                    <Form.Item name='name_en' label='英文名' rules={[{ required: true, message: '请输入图片英文名' }]}>
                        <Input >
                        </Input>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default index