import React, { memo, ReactNode } from 'react';

interface Props {
    handleClick?: React.MouseEventHandler<HTMLElement>,
    children: ReactNode,
    style?: {}
    type?: string
}

export const Button: React.FC<Props> = memo(({ children, handleClick, style }) => {
    return (
        <button
            style={style}
            onClick={handleClick}
        >{children}
        </button>)
})
