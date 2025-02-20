import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RoomAllocationModal({ student, hallId, applicationID, onClose }) {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    // console.log(application);
    useEffect(() => {
        axios.get(route('rooms.available', hallId)).then((response) => {
            setRooms(response.data);
        });
    }, []);

    const allocateStudent = () => {
        if (!selectedRoom) return alert('Please select a room.');

        axios.post(route('student.allocate', applicationID), {
            student_id: student.id,
            room_id: selectedRoom,
        })
            .then(() => {
                alert('Student allocated successfully!');
                onClose();
            })
            .catch((error) => {
                alert(error.response.data.error || 'Allocation failed!');
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-3/4">
                <h2 className="text-xl font-bold mb-4">Room Allocation for {student.user.name}</h2>

                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">Room No.</th>
                        <th className="px-4 py-2">Students</th>
                        <th className="px-4 py-2">Available Seats</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td className="px-4 py-2">{room.room_number}</td>
                            <td className="px-4 py-2">{room.students.join(', ') || 'Empty'}</td>
                            <td className="px-4 py-2">{room.available_seats}</td>
                            <td className="px-4 py-2">
                                <button
                                    className={`px-3 py-1 rounded ${selectedRoom === room.id ? 'bg-blue-600 text-white' : 'bg-blue-300'}`}
                                    onClick={() => setSelectedRoom(room.id)}
                                >
                                    Select
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="mt-4 flex justify-end space-x-4">
                    <button className="bg-gray-400 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={allocateStudent}>Allocate</button>
                </div>
            </div>
        </div>
    );
}
