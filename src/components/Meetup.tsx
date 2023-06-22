import React from 'react';
import { Button } from './Button';

const Meetup = ({ meetup, rsvp, handleAddRSVP, cancelReservation, rsvpCount }) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '50px',
                marginBottom: '50px'
            }}
            key={meetup?.id}>
            <div
                style={{
                    minWidth: '550px',
                    objectFit: 'cover'
                }}>
                <img
                    src={meetup?.image_url}
                    alt="event image"
                    style={{
                        width: '100%'
                    }} />
            </div>
            <div
                style={{
                    marginTop: '20px'
                }}>
                <div
                    style={{
                        lineHeight: '30px'
                    }}>
                    <span><em>Number of registered attendees: <strong>{rsvpCount}</strong></em></span>
                    <h1>{meetup?.topic?.toUpperCase()}</h1>
                    <p>
                        <strong>Location:</strong>
                        {meetup?.location}
                    </p>
                    <p>
                        <strong>Date:</strong>
                        {meetup?.date?.slice(0, 10)}
                    </p>
                    <p>
                        <strong>Time:</strong>
                        {meetup?.time}
                    </p>
                </div>
                <div style={{
                    marginTop: '40px',
                    lineHeight: '25px',
                    fontWeight: '200'
                }}>
                    <h2>Description</h2>
                    <p>{meetup?.description}</p>
                </div>
                <div>
                    {
                        !rsvp ?
                            <Button handleClick={handleAddRSVP}>RSVP</Button>
                            :
                            <>
                                <span style={{
                                    marginRight: '10px',
                                    border: '2px solid red',
                                    padding: '10px',
                                }}>You've reserved a spot!</span>
                                <Button
                                    style={{ margin: '20px', width: '200px' }}
                                    handleClick={cancelReservation}
                                >Unreserve your spot</Button>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Meetup;
