import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Button, Card, Form, Input, Modal, Space, Upload, UploadFile, message, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from '@umijs/max';
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { v4 as uuidv4 } from 'uuid';
import styles from './index.less'
import axios from 'axios';
import MyIntroPic from './components/MyIntroPic';
import { addIntroImages, getIntroImages, getIntro, updateIntro } from '@/services/admin/introController';

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
    const [introPic, setIntroPic] = useState<carousel[]>([])
    const [isAddIntroPic, setIsAddIntroPic] = useState<boolean>(false)
    const [introPicPath, setIntroPicPath] = useState<string>()
    const [introPicImageName, setIntroPicImageName] = useState<string>()
    const [introPicId, setIntroPicId] = useState<string>()
    const [introPicList, setIntroPicList] = useState<UploadFile[]>([])

    const [intro, setIntro] = useState<{ intro_cn: string, intro_en: string }>({ intro_cn: '', intro_en: '' })

    const [isUpdateIntro, setIsUpdateIntro] = useState<boolean>(false)

    // editor 实例
    const [editor_cn, setEditor_cn] = useState<IDomEditor | null>(null)   // TS 语法
    const [editor_en, setEditor_en] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html_cn, setHtml_cn] = useState('<p>hello</p>')
    const [html_en, setHtml_en] = useState('<p>hello</p>')

    useEffect(() => {
        getIntroPic()
        getHomeIntro()
    }, [])

    // 工具栏配置 
    const toolbarConfig: Partial<IToolbarConfig> = {}
    toolbarConfig.excludeKeys = ['group-video']
    useEffect(() => {
        console.log(toolbarConfig);

    })
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
            setEditor_en(null)
        }
    }, [editor_en])



    //获取简介图片
    const getIntroPic = async () => {
        setIntroPic([])
        const data = await getIntroImages()
        if (data.success) {
            setIntroPic(data.data)
            return
        }
        message.error('请求失败，请尝试')
    }


    //提交简介图片
    const onIntroPicFinish = async (values: any) => {
        if (!introPicPath) {
            alert('请上传图片')
            return
        }
        const reqData = {
            ...values,
            path: introPicPath,
            picId: introPicId,
            imageName: introPicImageName,
            type: 'intro',
            isShow: 1
        }
        const data = await addIntroImages(reqData)
        if (data.success) {
            message.success("上传成功！")
            setIsAddIntroPic(false)
            getIntroPic()
            return
        }
        message.error('出错了!')
    };
    //上传简介图片
    const uploadIntroPic = async (file: any) => {
        let arr = introPicList
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
            setIntroPicPath(res.data.data.url) //设置图片地址
            setIntroPicImageName(res.data.data.imageName)
            setIntroPicId(uid) //设置uid
            arr.push({
                uid: uid,
                name: res.data.data.imageName,
                status: 'done',
                url: res.data.data.url,
            })
            setIntroPicList([...arr])

            return
        }
        message.error('图片上传失败')
    }
    const uploadIntroPicProps = {
        name: 'image',
        multiple: false,
        showUploadList: false,
        customRequest: uploadIntroPic
    };

    //获取实验室简介
    const getHomeIntro = async () => {
        const res = await getIntro()
        if (res.success) {
            setHtml_cn(res.data.cn[0] ? res.data.cn[0].text : '<h1 style="text-align: center;">中文简介</h1>')
            setHtml_en(res.data.en[0] ? res.data.en[0].text : '<h1 style="text-align: center;">English Intro</h1>')
            setIntro({
                intro_cn: res.data.cn[0] ? res.data.cn[0].text : '<h1 style="text-align: center;">中文简介</h1>',
                intro_en: res.data.en[0] ? res.data.en[0].text : '<h1 style="text-align: center;">English Intro</h1>'
            })

            return
        }
        message.error('请求失败，请尝试')
    }

    const onIntroFinish = async () => {
        let data = {
            intro_cn: html_cn,
            intro_en: html_en
        }
        const res = await updateIntro(data)
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
                {/* 简介图片控制 */}
                <div>
                    <Card title="简介页图片" extra={<Button type='primary' onClick={() => setIsAddIntroPic(true)}>添加图片</Button>}>
                        <Space size="large" style={{ width: "100%", overflowX: "scroll", WebkitOverflowScrolling: "touch" }}>
                            {
                                introPic.map((item) => {
                                    return <MyIntroPic key={item['id']} {...item} fresh={getIntroPic} />
                                })
                            }
                        </Space>
                    </Card>
                </div>
                {/* 实验室简介 */}
                <div>
                    <Card title="实验室介绍"
                        extra={<Button type={isUpdateIntro ? 'dashed' : 'primary'} onClick={() => setIsUpdateIntro(!isUpdateIntro)}>{isUpdateIntro ? '取消' : '更新'}</Button>}
                    >

                        <div className={styles.container}>
                            <div className={styles.left}>
                                {
                                    !isUpdateIntro ?
                                        <div dangerouslySetInnerHTML={{ __html: intro.intro_cn }}>

                                        </div>
                                        :
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
                                }

                            </div>

                            <div className={styles.right}>
                                {
                                    !isUpdateIntro ?
                                        <div dangerouslySetInnerHTML={{ __html: intro.intro_en }}>

                                        </div>
                                        :
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
                                }
                            </div>
                        </div>
                        <Button type='primary' htmlType="submit" style={{ margin: '20px 0', display: isUpdateIntro ? 'block' : 'none' }} onClick={onIntroFinish}>提交</Button>
                    </Card>
                </div>
            </Space>

            <Modal
                open={isAddIntroPic}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setIsAddIntroPic(false)}
            >
                <Form onFinish={onIntroPicFinish}>
                    <Form.Item label="图片" valuePropName="fileList">
                        <Space>
                            <Image
                                width={100}
                                src={introPicPath}
                            //style={{ display: carouselPath ? "block" : "none" }}
                            />
                            <Upload listType="picture-card"
                                maxCount={1}
                                accept="image/*"
                                {...uploadIntroPicProps}
                                fileList={introPicList}
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