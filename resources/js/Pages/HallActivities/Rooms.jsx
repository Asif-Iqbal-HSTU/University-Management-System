import React from 'react';
import {Head, Link, usePage} from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";

export default function Room({ student, hallId, applicationID, onClose }) {
    const user = usePage().props.auth.user;
    const { rooms, hall } = usePage().props;

    console.log(hall);

    return (
        <Layout user={user}>
            <Head title="Hall Rooms" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">
                                Hall Rooms
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols- gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">
                                Current Rooms
                            </h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        SL No.
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        Room No.
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        Students
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        Available Seats
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {rooms.map((room, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 text-gray-800">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 text-gray-800">
                                            {room.room_number}
                                        </td>
                                        <td className="px-4 py-2 text-gray-800">
                                            {room.students.length > 0 ? (
                                                room.students.map((studentID, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={route('profile.student', studentID)}
                                                        className="hover:underline text-gray-800"
                                                    >
                                                        {studentID}
                                                    </Link>
                                                )).reduce((prev, curr) => [prev, ', ', curr]) // Add comma separator
                                            ) : (
                                                'Empty'
                                            )}
                                        </td>

                                        <td className="px-4 py-2 text-gray-800">
                                            {room.available_seats}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
