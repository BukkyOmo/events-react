import React, { useState } from 'react';
import { Button } from './Button';
import FormatDate from '../utils/dateFormat';

const Comment = ({ comments }) => {
    const [openComment, setOpenComments] = useState(false);

    const handleComments = async () => {
        openComment ? setOpenComments(false) : setOpenComments(true);
    }

    return (
        <div style={{ position: 'relative' }}>
            <Button
                children={`comments: ${comments?.length}`}
                style={{ padding: '3px', borderRadius: '10px' }}
                handleClick={handleComments}
            />
            {openComment && comments?.length > 0 ? (
                comments.map(comment => (
                    <div style={{
                        width: '400px',
                        position: 'relative',
                        left: '50px',
                        marginTop: '10px'
                    }} key={comment.id}>
                        <span
                            style={{
                                marginRight: '10px'
                            }}>
                            <strong>{comment?.firstname}</strong>
                        </span>
                        <span
                            style={{
                                fontWeight: '100',
                                fontSize: '13px'
                            }}>{FormatDate(comment?.created_at)}
                        </span>
                        <p
                            style={{
                                marginTop: '10px',
                                fontWeight: '10'
                            }}>{comment?.body}
                        </p>
                    </div>

                ))) : null}
        </div>
    )
}

export default Comment;
