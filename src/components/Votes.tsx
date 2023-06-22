import React, { useState } from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';

const Votes = ({ handleVotes, question }) => {
    const [userVotes, setUserVotes] = useState();
    // get an array of uservotes
    // map through it and check 
    // console.log(question.id, 'q id') // re nders 3 times
    return (
        // mapping
        <div>
            <span
                style={{
                    marginRight: '10px',
                    // backgroundColor: 'red'
                }}>
                < BiLike onClick={e => handleVotes(question.id, 'upvote')} color='black' />
            </span>
            <span style={{ padding: '0 8px 0 0' }}><strong>{question.vote_count}</strong></span>
            <span
                style={{
                    marginRight: '10px'
                }}><BiDislike onClick={e => handleVotes(question.id, 'downvote')} />
            </span>
        </div>
    )
}

export default Votes;


// votes logic -> youtube - initial count 10
// when you like a comment - add 1 = 11
// when you dislike - it removes your 1 vote = 11-1=10
// it doesn't discredit other people's likes
// say there were 10 likes
// if you dislike it doesn't take away 1
// it only saves the votes or displays