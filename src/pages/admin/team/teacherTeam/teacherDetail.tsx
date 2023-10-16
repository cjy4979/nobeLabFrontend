import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import styles from './index.less'
import { Button, Form, Input, message, Select, Space, Typography, Image, Upload, UploadFile } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from '@umijs/max'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios';
import { addTeacher, getTeacherByUid, updateTeacher } from '@/services/admin/teamsController'
import { useLocation } from '@umijs/max'
const { Title } = Typography

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

function teacherDetail() {
    const location = useLocation()
    const navigate = useNavigate()
    // editor 实例
    const [editor_cn, setEditor_cn] = useState<IDomEditor | null>(null)   // TS 语法
    const [editor_en, setEditor_en] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html_cn, setHtml_cn] = useState('<p>hello</p>')
    const [html_en, setHtml_en] = useState('<p>hello</p>')
    const [uid, setUid] = useState<string>('')
    const [form_cn] = Form.useForm()
    const [form_en] = Form.useForm()

    const [teacher_cn, setTeacher_cn] = useState<teacherType>({
        uid: '',
        name: '',
        proTitle: '',
        title: '',
        education: '',
        researchDirection: '',
        email: '',
        imgpath: '',
        introDetail: ''
    })
    const [teacher_en, setTeacher_en] = useState<teacherType>({
        uid: '',
        name: '',
        proTitle: '',
        title: '',
        education: '',
        researchDirection: '',
        email: '',
        imgpath: '',
        introDetail: ''
    })


    const [imgPath, setImgPath] = useState<string>('')
    const [picList, setpPicList] = useState<UploadFile[]>([])

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        getTeacher()
        form_cn.setFieldsValue(teacher_cn)
        form_en.setFieldsValue(teacher_en)
    }, [])

    const getTeacher = async () => {
        const res = await getTeacherByUid({ uid: location.search.split('?uid=')[1] })
        if (res.success) {
            setUid(res.data.cn.uid)
            setTeacher_cn(res.data.cn)
            form_cn.setFieldsValue(res.data.cn)
            setHtml_cn(res.data.cn.introDetail)
            setTeacher_en(res.data.en)
            setHtml_en(res.data.en.introDetail)
            form_en.setFieldsValue(res.data.en)
            setImgPath(res.data.cn.imgpath)
            return
        }
        message.error('出错了')
    }

    // 工具栏配置 
    const toolbarConfig: Partial<IToolbarConfig> = {}
    toolbarConfig.excludeKeys = ['group-video']

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
        MENU_CONF: {
            uploadImage:
            {
                server: '/api/uploadPic',
                // form-data fieldName ，默认值 'wangeditor-uploaded-image'
                fieldName: 'image',

                // 单个文件的最大体积限制，默认为 2M
                maxFileSize: 5 * 1024 * 1024, // 5M

                // 最多可上传几个文件，默认为 100
                maxNumberOfFiles: 20,

                // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []       
                allowedFileTypes: ['image/*'],

                // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
                // meta: {
                //     token: 'xxx',
                //     otherKey: 'yyy'
                // },

                // 将 meta 拼接到 url 参数中，默认 false
                metaWithUrl: false,

                // 自定义增加 http  header
                headers: {
                    'authorization': `Bearer ${sessionStorage.getItem('token')}`
                },

                // 跨域是否传递 cookie ，默认为 false
                //withCredentials: true,

                // 超时时间，默认为 10 秒
                timeout: 5 * 1000, // 5 秒
            }

        }
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor_cn == null) return
            editor_cn.destroy()
            setEditor_cn(null)
        }
    }, [editor_cn])

    useEffect(() => {
        return () => {
            if (editor_en == null) return
            editor_en.destroy()
            setEditor_cn(null)
        }
    }, [editor_en])

    const onClick = async () => {
        let cn = teacher_cn
        cn.imgpath = imgPath
        cn.introDetail = html_cn
        let en = teacher_en
        en.imgpath = imgPath
        en.introDetail = html_cn
        let data = {
            uid: uid,
            teacher_cn: cn,
            teacher_en: en
        }
        
        const resData = await updateTeacher(data)

        if (resData.success) {
            message.success('提交成功')
            navigate('/admin/team')
            return
        }
        message.error('提交失败请重试')
    }

    const onCnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setTeacher_cn((pre) => ({
            ...pre,
            [id]: value,
        }));
    }

    const onEnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        setTeacher_en((pre) => ({
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
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            <div className={styles.container}>

                <div className={styles.left}>
                    <Form style={{ margin: "20px 20px" }} form={form_cn}>
                        <Form.Item label="照片" valuePropName="fileList">
                            <Space>
                                <Image
                                    width={100}
                                    src={imgPath}
                                //style={{ display: carouselPath ? "block" : "none" }}
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
                        <Form.Item label="中文名" name="name" rules={[{ required: true, message: '请输入老师的中文名!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="职称" name="title" rules={[{ required: true, message: '请选择老师的职称!' }]}>
                            <Select
                                style={{ width: 120 }}
                                onChange={(e) => { setTeacher_cn((pre) => ({ ...pre, title: e })) }}
                                options={[
                                    { value: 'professor', label: '教授' },
                                    { value: 'assitant', label: '副教授' },
                                    { value: 'lecturer', label: '讲师' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="头衔" name="proTitle" rules={[{ required: true, message: '请输入老师的中文头衔!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="学历/经历" name="education" rules={[{ required: true, message: '请输入老师的学历/经历!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="研究方向" name="researchDirection" rules={[{ required: true, message: '请输入老师的研究方向!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                        <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入老师的邮箱!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onCnChange}></Input>
                        </Form.Item>
                    </Form>

                    <div style={{ border: '1px solid #ccc', zIndex: 100, minHeight: '800px' }}>
                        <Toolbar
                            editor={editor_cn}
                            defaultConfig={toolbarConfig}
                            mode="default"
                            style={{ borderBottom: '1px solid #ccc' }}
                        />
                        <Editor
                            defaultConfig={editorConfig}
                            value={html_cn}
                            onCreated={setEditor_cn}
                            onChange={editor => setHtml_cn(editor.getHtml())}
                            mode="default"
                            style={{ overflowY: 'hidden' }}
                        />
                    </div>
                </div>

                <div className={styles.right}>
                    <Form style={{ margin: "20px 20px" }} form={form_en}>
                        <Form.Item label="照片" valuePropName="fileList">
                            <Space>
                                <Image
                                    width={100}
                                    src={imgPath}
                                //style={{ display: carouselPath ? "block" : "none" }}
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
                        <Form.Item label="英文名" name="name" rules={[{ required: true, message: '请输入老师的英文名!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="职称" name="title" rules={[{ required: true, message: '请选择老师的职称!' }]}>
                            <Select
                                style={{ width: 120 }}
                                onChange={(e) => { setTeacher_en((pre) => ({ ...pre, title: e })) }}
                                options={[
                                    { value: 'professor', label: 'Professor' },
                                    { value: 'assitant', label: 'Associate professor' },
                                    { value: 'lecturer', label: 'Lecturer' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="头衔" name="proTitle" rules={[{ required: true, message: '请输入老师的英文头衔!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="学历/经历" name="education" rules={[{ required: true, message: '请输入老师的学历/经历!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="研究方向" name="researchDirection" rules={[{ required: true, message: '请输入老师的研究方向!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                        <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入老师的邮箱!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={onEnChange}></Input>
                        </Form.Item>
                    </Form>
                    <div style={{ border: '1px solid #ccc', zIndex: 100, minHeight: '800px' }}>
                        <Toolbar
                            editor={editor_en}
                            defaultConfig={toolbarConfig}
                            mode="default"
                            style={{ borderBottom: '1px solid #ccc' }}
                        />
                        <Editor
                            defaultConfig={editorConfig}
                            value={html_en}
                            onCreated={setEditor_en}
                            onChange={editor => setHtml_en(editor.getHtml())}
                            mode="default"
                            style={{ overflowY: 'hidden' }}
                        />
                    </div>
                </div>
            </div>
            <Button type="primary" style={{ margin: "30px 0" }} onClick={() => onClick()}>提交</Button>
        </div>

    )
}

export default teacherDetail