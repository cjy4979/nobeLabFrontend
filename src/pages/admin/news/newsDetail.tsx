
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import styles from './index.less'
import { Button, Card, Form, Input, message, Typography } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { getNewsByPaperId, updateNewsByPaperId } from '@/services/admin/newsController';
import { useLocation, useNavigate } from '@umijs/max'
const { Title } = Typography

function newsDetail() {
    const location = useLocation()
    const paperId = location.search.split('?paperId=')[1]
    const navigate = useNavigate()
    const [form_cn] = Form.useForm()
    const [form_en] = Form.useForm()
    // editor 实例
    const [editor_cn, setEditor_cn] = useState<IDomEditor | null>(null)   // TS 语法
    const [editor_en, setEditor_en] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html_cn, setHtml_cn] = useState('<p>hello</p>')
    const [html_en, setHtml_en] = useState('<p>hello</p>')
    const [title_cn, setTitle_cn] = useState<string>('')
    const [title_en, setTitle_en] = useState<string>('')

    const [news, setNews] = useState<{ news_cn: string, news_en: string }>({ news_cn: '', news_en: '' })

    const [isUpdateNews, setIsUpdateNews] = useState<boolean>(false)

    useEffect(() => {
        getNewsDetail()
    }, [])
    const getNewsDetail = async () => {
        const res = await getNewsByPaperId({ paperId: paperId })
        console.log(res);
        if (res.success) {
            setNews({
                news_cn: res.data.cn.text,
                news_en: res.data.en.text
            })
            form_cn.setFieldsValue({ title_cn: res.data.cn.title })
            form_en.setFieldsValue({ title_en: res.data.en.title })
            setTitle_cn(res.data.cn.title)
            setTitle_en(res.data.en.title)
            setHtml_cn(res.data.cn.text)
            setHtml_en(res.data.en.text)
            return
        }
        message.error('出错了，请刷新重试')
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

    const onNewsFinish = async () => {
        let data = {
            paperId: paperId,

            news_cn: {
                text: html_cn,
                title: title_cn
            },
            news_en: {
                text: html_en,
                title: title_en
            }
        }
        const res = await updateNewsByPaperId(data)
        if (res.success) {
            message.success('更新成功')
            setIsUpdateNews(false)
            getNewsDetail()
            return
        }
        message.error('失败，请重试')
    }


    return (
        <div>
            <Card title="实验室介绍"
                extra={<Button type={isUpdateNews ? 'dashed' : 'primary'} onClick={() => setIsUpdateNews(!isUpdateNews)}>{isUpdateNews ? '取消' : '更新'}</Button>}
            >

                <div className={styles.container}>
                    <div className={styles.left}>
                        <Form style={{ margin: "20px 20px" }} form={form_cn}>
                            <Form.Item label="中文标题" name="title_cn" rules={[{ required: true, message: '请输入中文标题!' }]} initialValue={title_cn}>
                                <Input style={{ maxWidth: "600px" }} disabled={!isUpdateNews} onChange={(e) => setTitle_cn(e.target.value)}></Input>
                            </Form.Item>
                        </Form>
                        {
                            !isUpdateNews ?
                                <div dangerouslySetInnerHTML={{ __html: news.news_cn }}>

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
                        <Form style={{ margin: "20px 20px" }} form={form_en}>
                            <Form.Item label="英文标题" name="title_en" rules={[{ required: true, message: '请输入英文标题!' }]} initialValue={title_en}>
                                <Input style={{ maxWidth: "600px" }} disabled={!isUpdateNews} onChange={(e) => setTitle_en(e.target.value)}></Input>
                            </Form.Item>
                        </Form>
                        {
                            !isUpdateNews ?
                                <div dangerouslySetInnerHTML={{ __html: news.news_en }}>

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
                <Button type='primary' htmlType="submit"
                    style={{ margin: '20px 0', display: isUpdateNews ? 'block' : 'none' }}
                    onClick={onNewsFinish}
                >提交</Button>
            </Card>
        </div>
    )
}

export default newsDetail