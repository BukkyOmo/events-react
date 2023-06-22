import React, { forwardRef } from 'react';

type TextAreaProps = {
    textArea: string,
    // ref?: React.RefObject<HTMLTextAreaElement>,
    setTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    style?: React.CSSProperties,
    placeholder?: string,
    cols?: number,
    rows?: number
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    textArea,
    setTextArea,
    style,
    placeholder,
    cols = 64,
    rows = 3,
}: TextAreaProps, ref) => {
    return (
        <textarea
            ref={ref}
            value={textArea}
            onChange={setTextArea}
            cols={cols}
            rows={rows}
            placeholder={placeholder}
            style={style}
        />
    )
})

export default TextArea;
