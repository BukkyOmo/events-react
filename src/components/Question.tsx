import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { AuthContext, AuthContextInterface } from '../App';
import { Button } from './Button';
import Votes from './Votes';
import TextArea from './TextArea';
import Comment from './Comment';
import FormatDate from '../utils/dateFormat';

type Comment = {
    id: number;
    body: string;
    firstname: string;
    created_at: string;
    question_id: number;
}

const Question = ({ question, handleVotes }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState('');
    const [showTextArea, setShowTextArea] = useState(false);
    const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);
    const { user } = useContext(AuthContext) as AuthContextInterface;

    const { id } = question;
    // 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

    // TODO: Check that token is not expired, if it is, redirect to login page

    const handleSubmitComment = async () => {
        //TODO: use toast to return error when user tries to post an empty comment
        const { data } = await axios.post(`http://localhost:8040/api/v1/comments/${id}`, {
            comment
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.token

            }
        });

        data.data[0].firstname = user.user.firstname;
        setComments([...(comments as Comment[]), ...data.data]);
        setComment('');
        setShowTextArea(false);
    }

    const handleOpenTextArea = () => {
        showTextArea ? setShowTextArea(false) : setShowTextArea(true);
    }

    const handleFetchComments = useCallback((async () => {
        const { data } = await axios.get(`http://localhost:8040/api/v1/comments/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.token

            }
        });
        setComments(data.data);
    }), []);

    useEffect(() => {
        handleFetchComments();
    }, [])

    // when showTextArea updates to true, focus on the textarea
    useEffect(() => {
        showTextArea && commentTextAreaRef.current?.focus();
    }, [showTextArea]);

    return (
        <div
            style={{
                marginTop: '10px'
            }}>
            <span
                style={{
                    marginRight: '10px'
                }}>
                <strong>{question?.firstname}</strong>
            </span>
            <span
                style={{
                    fontWeight: '100',
                    fontSize: '13px'
                }}>{FormatDate(question?.created_at)}
            </span>
            <p
                style={{
                    marginTop: '10px',
                    fontWeight: '10'
                }}>{question?.body}
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Votes
                    handleVotes={handleVotes}
                    question={question} />
                <Button
                    handleClick={handleOpenTextArea} // buton for opening text area for comment
                >Comment
                </Button>
            </div>
            {showTextArea && (
                <div style={{ width: '545px', position: 'relative' }}>
                    <TextArea
                        ref={commentTextAreaRef}
                        placeholder='Enter comment'
                        textArea={comment}
                        setTextArea={(e) => setComment(e.target.value)}
                        style={{
                            margin: '10px 0px 5px',
                            outline: 'none',
                            padding: '5px'
                        }}
                    />
                    <Button
                        children='Add Comment'
                        handleClick={handleSubmitComment}
                    />
                </div>
            )}
            {/* when one comment is first posted the button for comment count and view comments doesnt show */}
            {comments?.length ? <Comment comments={comments} /> : null}
        </div>
    )
}

export default Question;
