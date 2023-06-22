import React from 'react';
import Modal from './Modal';

const TableRow = ({ meetup, index, handleEdit, handleDelete }) => {
  
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{meetup?.topic}</td>
            <td>{meetup?.location}</td>
            <td>10</td>
            <td>20</td>
            <td>
                <button onClick={() => handleEdit(meetup)}>
                    Edit
                </button>
            </td>
            <td>
                <Modal
                    openButtonText="Delete"
                    handleAction={handleDelete}
                    children='Are you sure you want to delete this meetup?'
                    id={meetup.id}
                />
            </td>
        </tr>
    )
}

export default TableRow;
