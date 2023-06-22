import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext, AuthContextInterface } from '../../App';

import { Button } from '../../components/Button';
import Question from '../../components/Question';
import Meetup from '../../components/Meetup';
import TextArea from '../../components/TextArea';

import { MeetupProps } from '../../types/meetup';

interface Question {
	id: number;
	body: string;
	firstname: string;
	meetup_id: number;
	vote_count: number;
	created_at: number;
	role: string;
	comments: [];
}

export const MeetupPage = () => {
	const [meetup, setMeetup] = useState<MeetupProps | null>(null);
	const [questions, setQuestions] = useState<Question[] | null>(null);
	const [rsvp, setRsvp] = useState(false);
	const [rsvpCount, setRsvpCount] = useState(0);
	const [textArea, setTextArea] = useState<string>('');
	const [votes, setVotes] = useState(0);

	const { user } = useContext(AuthContext) as AuthContextInterface;
	const { id } = useParams();

	// sort questions fn
	// refactor hooks
	// get all votes of a logged in user -> id, type(upvote or downvote), question-id - Conditionally style the votes icon
	// create table in admin/meetups & fetch all meetups in it

	const handleFetchMeetup = async () => {
		const { data } = await axios.get(
			`http://localhost:8040/api/v1/meetups/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: user.token,
				},
			}
		);
		setMeetup(data.data);
	};

	const handleFetchQuestions = async () => {
		const { data } = await axios.get(
			`http://localhost:8040/api/v1/questions/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: user.token,
				},
			}
		);
		setQuestions(data.data);
	};

	const handleFetchRsvpCount = async () => {
		const { data } = await axios.get(
			`http://localhost:8040/api/v1/rsvps/count/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: user.token,
				},
			}
		);
		setRsvpCount(data.data);
	};

	const fetchRsvp = async () => {
		const { data } = await axios.get(
			`http://localhost:8040/api/v1/rsvps/user/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: user.token,
				},
			}
		);
		setRsvp(Boolean(data.data));
	};

	const handleAddRSVP = useCallback(async () => {
		const { data } = await axios.post(
			`http://localhost:8040/api/v1/rsvps/${id}`,
			{},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: user.token,
				},
			}
		);
		setRsvp(data.data[0].status);
	}, []);

	const handleAddQuestion = async () => {
		const { data } = await axios.post(
			`http://localhost:8040/api/v1/questions/${id}`,
			{
				body: textArea,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: user.token,
				},
			}
		);

		const newQuestion = data.data;
		newQuestion[0].firstname = user.user.firstname;
		setQuestions([...(questions as Question[]), ...newQuestion]);
		setTextArea('');
	};

	const cancelReservation = async () => {
		const { data } = await axios.patch(
			`http://localhost:8040/api/v1/rsvps/cancel/${id}`,
			{},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: user.token,
				},
			}
		);
		setRsvp(data.data.status);
	};

	const handleVotes = async (id?: number, type?: string) => {
		try {
			const { data } = await axios.post(
				`http://localhost:8040/api/v1/votes/${id}`,
				{
					type,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: user.token,
					},
				}
			);

			setVotes(data.data.vote_count);
		} catch (error) {
			console.log(error.response.data.error, 'vote error');
		}
	};

	useEffect(() => {
		handleFetchMeetup();
	}, [id]);

	useEffect(() => {
		handleFetchRsvpCount();
	}, [rsvp]);

	useEffect(() => {
		fetchRsvp();
	}, []);

	useEffect(() => {
		handleFetchQuestions();
	}, [votes]);

	return (
		<div
			style={{
				margin: '50px 200px',
			}}
		>
			<Meetup
				meetup={meetup}
				rsvp={rsvp}
				rsvpCount={rsvpCount}
				handleAddRSVP={handleAddRSVP}
				cancelReservation={cancelReservation}
			/>
			<div>
				<h1>Questions</h1>
				{questions && questions?.length > 0 ? (
					<div>
						{questions?.map((question) => (
							<div key={question.id}>
								<Question question={question} handleVotes={handleVotes} />
							</div>
						))}
					</div>
				) : (
					<p>
						<em>Be the first to ask a question</em>
					</p>
				)}
			</div>
			<div style={{ width: '545px', position: 'relative' }}>
				<TextArea
					textArea={textArea}
					setTextArea={(e) => setTextArea(e.target.value)}
					placeholder={'Ask a question'}
					style={{
						margin: '10px 0px 5px',
						outline: 'none',
						padding: '5px',
					}}
					cols={63}
				/>
				<Button
					handleClick={handleAddQuestion}
					style={{
						position: 'absolute',
						right: 13,
						top: 70,
					}}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

// TODO:

// refactor code - start STARTED
// -> fix logic on vote

// -> admin meetup table - DONE

// -> next week-> ->admin users table
// -> user profile settings/info page
// ALL1126BF100

// if i downvote - i get -1
// then i upvote - i get 0
// then i try to upvote i get the error you cannot upvote more than once
// need to look into the

// downvote cancels out users upvote
// on edit -> an effect call is made to fetch the new meetups
// delete a meetup
// get all users
// disable /enable a user
// get all votes of a logged in user -> id, type(upvote or downvote), question-id - Conditionally style the votes icon
// logic to check if user token is expired, - if yes, log user out
// convert effects to useReducer
// add a loader
// add all toasts
//
