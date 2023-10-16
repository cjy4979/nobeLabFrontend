import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function index() {
    const [content, setContent] = useState('')
    const handleContentChange = (value: React.SetStateAction<string>)=>{
        setContent(value)
    }
    return (
        <div style={{minHeight:'800px'}}>
            <ReactQuill value={content} onChange={handleContentChange}></ReactQuill>
        </div>
    )
}

export default index