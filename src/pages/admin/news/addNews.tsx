import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import styles from './index.less'
import { Button, Form, Input, message, Typography } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { addNewsByPaperId } from '@/services/admin/newsController'
import { useNavigate } from '@umijs/max'
const { Title } = Typography

function addNews() {
    const navigate = useNavigate()
    // editor 实例
    const [editor_cn, setEditor_cn] = useState<IDomEditor | null>(null)   // TS 语法
    const [editor_en, setEditor_en] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html_cn, setHtml_cn] = useState('<p>hello</p>')
    const [html_en, setHtml_en] = useState('<p>hello</p>')
    const [title_cn, setTitle_cn] = useState<string>()
    const [title_en, setTitle_en] = useState<string>()

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml_cn('<h1 style="text-align: center;">中文标题</h1><hr/><p>新闻内容</p>')
            setHtml_en('<h1 style="text-align: center;">Title EN-US</h1><hr/><p>news content</p>')
        }, 500)
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
            setEditor_cn(null)
        }
    }, [editor_en])

    function insertText() {
        if (editor_cn == null) return
        editor_cn.insertText(' hello ')
    }

    function printHtml() {
        if (editor_cn == null) return
        console.log(editor_cn.getHtml())
    }
    const onClick = async () => {
        if (!title_cn || !title_en) {
            message.error('请填写标题')
            return
        }
        const paperId = uuidv4()
        let data = {
            news_cn: {
                paperId: paperId,
                text: html_cn,
                title: title_cn
            },
            news_en: {
                paperId: paperId,
                text: html_en,
                title: title_en
            }
        }
        const resData = await addNewsByPaperId(data)
        console.log(resData);
        if (resData.success) {
            message.success('提交成功')
            navigate('/admin/news')
            return
        }
        message.error('提交失败请重试')
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems:'center' }}>
            <Title>添加新闻</Title>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Form style={{ margin: "20px 20px" }}>
                        <Form.Item label="中文标题" name="title_cn" rules={[{ required: true, message: '请输入中文标题!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={(e) => setTitle_cn(e.target.value)}></Input>
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
                    <Form style={{ margin: "20px 20px" }}>
                        <Form.Item label="英文标题" name="title_en" rules={[{ required: true, message: '请输入英文标题!' }]}>
                            <Input style={{ maxWidth: "600px" }} onChange={(e) => setTitle_en(e.target.value)}></Input>
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

export default addNews