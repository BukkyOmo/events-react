import React from 'react';
import { useEffect } from 'react';
import styled from '@emotion/styled';

import { MeetupCard } from '../../components/Card';
import useFetchEvents from '../../hooks/useFetch';
import { MeetupProps } from '../../types/meetup';

export const HomePage = () => {
	const { events, fetchEvents } = useFetchEvents(
		'http://localhost:8040/api/v1/meetups'
	);

	useEffect(() => {
		fetchEvents();
    }, []);
    // console.log(events, 'events from homepage')

	if (events?.isLoading) return <h1>...Loading</h1>;

	return (
		<ContainerDiv
			style={{
				width: '80%',
				marginInline: 'auto',
				margin: '15px auto',
			}}
		>
			{events?.data?.map((meetup: MeetupProps) => (
				<MeetupCard key={meetup?.id} {...meetup} />
			))}
		</ContainerDiv>
	);
};

const ContainerDiv = styled.div`
	display: flex;
	grid-gap: 30px;
	grid-template-columns: auto;
	flex-wrap: wrap;
	margin: 0 100px;
`;
