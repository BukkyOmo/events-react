import React, { ReactNode } from 'react';

type FormProps = {
    children: ReactNode,
    style?: React.CSSProperties,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form = ({ children, style, handleSubmit }: FormProps) => {
    return (
        <form
            style={style}
            onSubmit={handleSubmit}
        >{children}</form>
    )
}

export default Form;
