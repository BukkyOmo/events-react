import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

let CustomizedButton = styled(Button)`
	background-color: black;
`;

interface Meetup {
	id: number;
	topic: string;
	description: string;
	location: string;
	date: string;
	time?: string;
	image_url: string;
	archived?: boolean;
	created_at?: string;
    updated_at?: string;
    age?: number;
}

export const MeetupCard: React.FC<Meetup> = (props): JSX.Element => {
	const navigate = useNavigate();
	return (
		<Card sx={{ maxWidth: 250, marginTop: '30px' }}>
			<CardMedia
				component='img'
				alt='event'
				image={props.image_url}
			/>
			<CardContent sx={{ height: '250px' }}>
				<Typography gutterBottom variant='h5' component='div'>
					{props.topic}
				</Typography>
				<Typography variant='body1' display='block' color='text.secondary'>
					{props.description?.slice(0, 60)}...
				</Typography>

				<Typography variant='body1' display='block' color='text.secondary'>
					<b>Location</b>: {props.location}
				</Typography>
				<Typography variant='body1' display='block' color='text.secondary'>
					<b>Date</b>: {new Date(props.date).toDateString()}
				</Typography>
				<Typography variant='body1' display='block' color='text.secondary'>
					<b>Time</b>: {props.date}
				</Typography>
			</CardContent>
			<CardActions>
				<CustomizedButton
					onClick={() => navigate(`/meetups/${props.id}`)}
					style={{ width: '120px', height: '50px' }}
					size='small'
					variant='contained'
				>
					View Event
				</CustomizedButton>
			</CardActions>
		</Card>
	);
};
