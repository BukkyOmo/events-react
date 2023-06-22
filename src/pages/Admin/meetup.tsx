import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import '../../App.css';
import { AuthContext, AuthContextInterface } from '../../App';


import useFetchEvents from '../../hooks/useFetch';
import MeetupProps from '../../types/Meetup';
import Form from '../../components/Form';
import TextArea from '../../components/TextArea';
import { Button } from '../../components/Button';
import TableRow from '../../components/TableRow';

export const AdminHomepage = () => {
    const { user } = useContext(AuthContext) as AuthContextInterface;

    // const { events, fetchEvents } = useFetchEvents();
    const [openForm, setOpenForm] = useState(false);
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState<File>();
    const [editForm, setEditForm] = useState(false);
    const [meetup, setMeetup] = useState({} as MeetupProps);
    const [id, setId] = useState(0);
    const [meetups, setMeetups] = useState([] as MeetupProps[]);
    const [editDone, setEditDone] = useState(false);

    const editMeetup = async () => {
        try {
            const { id, topic, description, location, date, time, file } = meetup;
            const data = { topic, description, location, date, time }

            let formData = new FormData();
            formData.append('image', file as Blob, file.name);
            formData.append('data', JSON.stringify(data));

            await axios.patch(`http://localhost:8040/api/v1/meetups/${id}`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': user.token
                }
            });

            setEditDone(true);
        } catch (error) {
            console.log(error, 'error')
        }

    }

    const getMeetups = async () => {
        try {
            const { data } = await axios.get('http://localhost:8040/api/v1/meetups');
            setMeetups(data.data);
        } catch (error) {
            console.log(error, 'error')
        }
    }

    useEffect(() => {
        getMeetups();
    }, [editDone]);

    useEffect(() => {
        if (JSON.stringify(meetup) != '{}') {
            editMeetup();
        }
    }, [meetup]);

    const openCreateEventForm = () => {
        openForm ? setOpenForm(false) : setOpenForm(true)
    }

    const handleCreateEvent = async (e: any) => {
        e.preventDefault();
        setOpenForm(false);

        const data = {
            topic, description, location, date, time
        }

        let formData = new FormData();
        formData.append('image', file as Blob, file?.name);
        formData.append('data', JSON.stringify(data));

        const meetup = await axios.post('http://localhost:8040/api/v1/meetups', formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': user.token
            }
        });
        console.log(meetup);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleDelete = (id: number, setModalIsOpen: (modalIsOpen: boolean) => void) => {
        console.log(id, 'id to delete')
        // make an api call to delte the meetup
        setModalIsOpen(false);
    }

    const handleEdit = (meetup: MeetupProps) => {
        setEditForm(true);
        setTopic(meetup.topic)
        setDescription(meetup.description)
        setLocation(meetup.location);
        setDate(meetup.date.slice(0, 10))
        setTime(meetup.time)
        setId(meetup.id)
    }

    const handleSubmitEditForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = { topic, description, date, location, time, file, id };
        setMeetup({ ...meetup, ...data })
        setEditForm(false);
        setTopic('')
        setDescription('')
        setLocation('');
        setDate('')
        setTime('')
    }

    return (
        <>
            <div className="container">
                <div className="navigation">
                    <ul>
                        <li>
                            <a href="/admin">
                                <span className="title">Meetups</span>
                            </a>
                        </li>
                        <li>
                            <a href="www.home">
                                <span className="title">Users</span>
                            </a>
                        </li>
                        <li>
                            <a href="www.home">
                                <span className="title">Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div style={{
                width: '950px',
                margin: 'auto',
                padding: '50px'
            }}>
                <Button
                    style={{ padding: '15px', display: editForm ? 'none' : 'block' }}
                    handleClick={openCreateEventForm}
                >Create Meetup</Button>
                <div className='form-container' style={{ justifyContent: 'start' }}>
                    <Form
                        style={{
                            display: openForm ? 'block' : 'none',
                            width: '500px',
                            marginTop: '20px',
                            border: '2px solid #000',
                            padding: '20px',
                        }}
                        handleSubmit={handleCreateEvent}
                    >
                        <input
                            type='text'
                            name='topic'
                            placeholder='Topic'
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                        />
                        <TextArea
                            textArea={description}
                            setTextArea={e => setDescription(e.target.value)}
                            placeholder='Description'
                            style={{
                                margin: '10px 0px 5px',
                                outline: 'none',
                                padding: '5px'
                            }}
                            cols={54}
                            rows={3}
                        />
                        <input
                            type='text'
                            name='location'
                            placeholder='Location'
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                        <input
                            type='date'
                            name='date'
                            placeholder='Date'
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        <input
                            type='time'
                            name='time'
                            placeholder='Time'
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        />
                        <input
                            type='file'
                            // name='image'
                            // placeholder='Image'
                            // value={image}
                            onChange={handleFileChange}
                        />
                        <button type="submit">Create Event</button>
                    </Form>
                    <Form
                        style={{
                            display: editForm ? 'block' : 'none',
                            width: '500px',
                            marginTop: '20px',
                            border: '2px solid #000',
                            padding: '20px',
                        }}
                        handleSubmit={handleSubmitEditForm}
                    >
                        <input
                            type='text'
                            name='topic'
                            placeholder='topic'
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                        />
                        <TextArea
                            textArea={description}
                            setTextArea={e => setDescription(e.target.value)}
                            placeholder='Description'
                            style={{
                                margin: '10px 0px 5px',
                                outline: 'none',
                                padding: '5px'
                            }}
                            cols={54}
                            rows={3}
                        />
                        <input
                            type='text'
                            name='location'
                            placeholder='Location'
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                        <input
                            type='date'
                            name='date'
                            placeholder={date}
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        <input
                            type='time'
                            name='time'
                            placeholder='Time'
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        />
                        <input
                            type='file'
                            // value={file}
                            onChange={handleFileChange}
                        />
                        <button type="submit">Edit Event</button>
                    </Form>
                </div>
            </div>

            <table id="customers">
                <tr>
                    <th>S/N</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>No of RSVPS</th>
                    <th>No of questions</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {
                    meetups?.map((meetup: MeetupProps, index) => (
                        <TableRow
                            key={meetup.id}
                            meetup={meetup}
                            index={index}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))
                }
            </table>

        </>
    )
}