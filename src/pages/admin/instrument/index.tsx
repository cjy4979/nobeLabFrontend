import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Button, Card, Form, Input, Modal, Space, Upload, UploadFile, message, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import MyInstrument from './components/MyInstrument'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from '@umijs/max';
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import styles from './index.less'
import { v4 as uuidv4 } from 'uuid';
import { addInstrument, getInstruments, getInstrumentIntro, updateInstrumentIntro } from '@/services/admin/instrumentController';
import axios from 'axios';

declare interface instrument {
    id: string,
    picId: string,
    name_cn: string,
    name_en: string,
    path: string,
    isShow: number
}

function index() {
    const navigate = useNavigate()
    const [instrument, setInstrument] = useState<instrument[]>([])
    const [isAddInstrument, setIsAddInstrument] = useState<boolean>(false)
    const [instrumentPath, setCarsouselPath] = useState<string>()
    const [instrumentImageName, setCarsouselImageName] = useState<string>()
    const [instrumentId, setInstrumentId] = useState<string>()
    const [instrumentList, setInstrumentList] = useState<UploadFile[]>([])


    const [intro, setIntro] = useState<{ intro_cn: string, intro_en: string }>({ intro_cn: '', intro_en: '' })
    const [isUpdateIntro, setIsUpdateIntro] = useState<boolean>(false)
    // editor 实例
    const [editor_cn, setEditor_cn] = useState<IDomEditor | null>(null)   // TS 语法
    const [editor_en, setEditor_en] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html_cn, setHtml_cn] = useState('<p>hello</p>')
    const [html_en, setHtml_en] = useState('<p>hello</p>')

    useEffect(() => {
        getInstrumentPics()
        getInsIntro()
    }, [])

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
            setEditor_en(null)
        }
    }, [editor_en])



    //获取仪器设备图片
    const getInstrumentPics = async () => {
        setInstrument([])
        const data = await getInstruments()
        if (data.success) {
            setInstrument(data.data)
            return
        }
        message.error('请求失败，请尝试')
    }


    //提交仪器设备
    const onInstrumentFinish = async (values: any) => {
        if (!instrumentPath) {
            alert('请上传图片')
            return
        }
        const reqData = {
            ...values,
            path: instrumentPath,
            picId: instrumentId,
            imageName: instrumentImageName,
            type: 'instrument',
            isShow: 1
        }
        const data = await addInstrument(reqData)
        if (data.success) {
            message.success("上传成功！")
            setIsAddInstrument(false)
            getInstrumentPics()
            return
        }
        message.error('出错了!')
    };
    //上传仪器设备图片
    const uploadInstrument = async (file: any) => {
        let arr = instrumentList
        const uploadData = new FormData();
        uploadData.append('image', file.file);
        const res = await axios.post('/api/admin/instruments/image', uploadData, {
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
            setInstrumentId(uid) //设置uid
            arr.push({
                uid: uid,
                name: res.data.data.imageName,
                status: 'done',
                url: res.data.data.url,
            })
            setInstrumentList([...arr])

            return
        }
        message.error('图片上传失败')
    }
    const uploadInstrumentProps = {
        name: 'image',
        multiple: false,
        showUploadList: false,
        customRequest: uploadInstrument
    };


    //获取实验室简介
    const getInsIntro = async () => {
        const res = await getInstrumentIntro()
        console.log(res);

        if (res.success) {
            setIntro({
                intro_cn: res.data.cn[0] ? res.data.cn[0].text : '',
                intro_en: res.data.en[0] ? res.data.en[0].text : ''
            })
            setHtml_cn(res.data.cn[0] ? res.data.cn[0].text : '')
            setHtml_en(res.data.en[0] ? res.data.en[0].text : '')
            return
        }
        message.error('请求失败，请尝试')
    }
    const onInstrumentIntroFinish = async () => {
        let data = {
            intro_cn: html_cn,
            intro_en: html_en
        }
        const res = await updateInstrumentIntro(data)
        if (res.success) {
            message.success('更新成功')
            setIsUpdateIntro(false)
            getInsIntro()
            return
        }
        message.error('失败，请重试')
    }



    return (
        <div>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {/* 仪器设备图片控制 */}
                <div>
                    <Card title="仪器设备图片" extra={<Button type='primary' onClick={() => setIsAddInstrument(true)}>添加图片</Button>}>
                        <Space size="large" style={{ width: "100%", overflowX: "scroll", WebkitOverflowScrolling: "touch" }}>
                            {
                                instrument.map((item) => {
                                    return <MyInstrument key={item['id']} {...item} fresh={getInstrumentPics} />
                                })
                            }
                        </Space>
                    </Card>
                </div>
                {/* 仪器设备简介 */}
                <div>
                    <Card title="仪器设备介绍"
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
                        <Button type='primary' style={{ margin: '20px 0', display: isUpdateIntro ? 'block' : 'none' }}
                            onClick={onInstrumentIntroFinish}>提交</Button>
                    </Card>
                </div>
            </Space>

            <Modal
                open={isAddInstrument}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setIsAddInstrument(false)}
            >
                <Form onFinish={onInstrumentFinish}>
                    <Form.Item label="图片" valuePropName="fileList">
                        <Space>
                            <Image
                                width={100}
                                src={instrumentPath}
                            //style={{ display: instrumentPath ? "block" : "none" }}
                            />
                            <Upload listType="picture-card"
                                maxCount={1}
                                accept="image/*"
                                {...uploadInstrumentProps}
                                fileList={instrumentList}
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