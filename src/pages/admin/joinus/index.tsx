import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import styles from './index.less'
import { Button, Card, Form, Input, message, Radio, Typography } from 'antd'
import { useNavigate } from '@umijs/max'
import { getRecruitByType, updateRecruitByType } from '@/services/admin/joinusController'
const { Title } = Typography

function index() {
    const navigate = useNavigate()
    // editor 实例
    const [editor_cn, setEditor_cn] = useState<IDomEditor | null>(null)   // TS 语法
    const [editor_en, setEditor_en] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html_cn, setHtml_cn] = useState('<p>hello</p>')
    const [html_en, setHtml_en] = useState('<p>hello</p>')
    const [title_cn, setTitle_cn] = useState<string>()
    const [title_en, setTitle_en] = useState<string>()

    const [form_cn] = Form.useForm()
    const [form_en] = Form.useForm()

    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    const [recruit, setRecruit] = useState<{ recruit_cn: string, recruit_en: string }>({ recruit_cn: '', recruit_en: '' })

    const [type, setType] = useState<'students' | 'teachers' | 'assistants'>('students')

    useEffect(() => {
        getRecrutDetail()
    }, [type])

    const getRecrutDetail = async () => {
        const res = await getRecruitByType({ type: type })
        if (res.success) {
            if(res.data.cn[0]){
                setRecruit({
                    recruit_cn: res.data.cn[0].text,
                    recruit_en: res.data.en[0].text
                })
                form_cn.setFieldsValue({ title_cn: res.data.cn[0].title })
                form_en.setFieldsValue({ title_en: res.data.en[0].title })
                setTitle_cn(res.data.cn[0].title)
                setTitle_en(res.data.en[0].title)
                setHtml_cn(res.data.cn[0].text)
                setHtml_en(res.data.en[0].text)
            }else{
                setRecruit({
                    recruit_cn: '',
                    recruit_en: ''
                })
                form_cn.setFieldsValue({ title_cn: '' })
                form_en.setFieldsValue({ title_en: '' })
                setTitle_cn('')
                setTitle_en('')
                setHtml_cn('')
                setHtml_en('')
            }
            
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


    const onClick = async () => {
        if (!title_cn || !title_en) {
            message.error('请填写标题')
            return
        }
        let data = {
            type: type,
            recruit_cn: {
                text: html_cn,
                title: title_cn
            },
            recruit_en: {
                text: html_en,
                title: title_en
            }
        }
        const resData = await updateRecruitByType(data)
        if (resData.success) {
            message.success('提交成功')
            setIsUpdate(false)
            getRecrutDetail()
            return
        }
        message.error('提交失败请重试')
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '94%', marginLeft: '3%' }}>

                <Radio.Group defaultValue={type}>
                    <Radio.Button value="students" onClick={() => setType("students")}>招募博硕士及本科生</Radio.Button>
                    <Radio.Button value="teachers" onClick={() => setType("teachers")}>招募青年教师及专职科研人员</Radio.Button>
                    <Radio.Button value="assistants" onClick={() => setType("assistants")}>招募科研助理</Radio.Button>
                </Radio.Group>
            </div>
            <Card title={title_cn}
                extra={<Button type={isUpdate ? 'dashed' : 'primary'} onClick={() => setIsUpdate(!isUpdate)}>{isUpdate ? '取消' : '更新'}</Button>}
            >
                <div className={styles.container}>
                    <div className={styles.left}>
                        <Form style={{ margin: "20px 20px" }} form={form_cn}>
                            <Form.Item label="中文标题" name="title_cn" rules={[{ required: true, message: '请输入中文标题!' }]} initialValue={title_cn}>
                                <Input style={{ maxWidth: "600px" }} disabled={!isUpdate} onChange={(e) => setTitle_cn(e.target.value)}></Input>
                            </Form.Item>
                        </Form>
                        {
                            !isUpdate ?
                                <div dangerouslySetInnerHTML={{ __html: recruit.recruit_cn }}>

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
                                <Input style={{ maxWidth: "600px" }} disabled={!isUpdate} onChange={(e) => setTitle_en(e.target.value)}></Input>
                            </Form.Item>
                        </Form>
                        {
                            !isUpdate ?
                                <div dangerouslySetInnerHTML={{ __html: recruit.recruit_en }}>

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
                    style={{ margin: '20px 0', display: isUpdate ? 'block' : 'none' }}
                    onClick={onClick}
                >提交</Button>
            </Card>
        </div>

    )
}

export default index