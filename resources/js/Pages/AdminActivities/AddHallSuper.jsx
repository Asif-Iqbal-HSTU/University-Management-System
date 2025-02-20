import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";
import SearchableDropdown from "@/Components/SearchableDropdown";
import TextArea from "@/Components/TextArea.jsx";
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';


export default function AddHallSuper() {
    const user = usePage().props.auth.user;
    const { teachers, halls, hallSupers } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        hall_id: '',
        teacher_id: '',
        hall_super_message: '',
    });

    const [hallSuperList, setHallSuperList] = useState(hallSupers); // Initialize with props

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(route('hall.super.add'), data);
            const { status, message } = response.data;

            if (status === 'success') {
                setModalMessage(message);
                setModalType('success');
                // Inertia.reload();
                // Update the hallSupers list locally
                const updatedHallSuper = {
                    hall: halls.find((hall) => hall.id === data.hall_id),
                    teacher: teachers.find((teacher) => teacher.id === data.teacher_id),
                };
                setHallSuperList((prev) => [...prev, updatedHallSuper]);
            } else {
                setModalMessage(message);
                setModalType('error');
            }
        } catch (error) {
            if (error.response) {
                setModalMessage(error.response.data.message || 'An unexpected error occurred.');
                setModalType('error');
            } else {
                setModalMessage('Failed to connect to the server. Please try again.');
                setModalType('error');
            }
        } finally {
            setModalOpen(true);
        }
    };


    const hallOptions = halls.map((hall) => ({
        label: hall.name,
        value: hall.id,
    }));

    const teacherOptions = teachers.map((teacher) => ({
        label: teacher.user?.name,
        value: teacher.id,
    }));

    return (
        <Layout user={user}>
            <Head title="Add Hall Super" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add Hall Super</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="hall_id" value="Select Hall"/>
                                    <SearchableDropdown
                                        options={hallOptions}
                                        onChange={(value) => setData('hall_id', value)}
                                        placeholder="Select Hall"
                                    />
                                    <InputError message={errors.hall_id} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="teacher_id" value="Select Teacher"/>
                                    <SearchableDropdown
                                        options={teacherOptions}
                                        onChange={(value) => setData('teacher_id', value)}
                                        placeholder="Select Teacher"
                                    />
                                    <InputError message={errors.teacher_id} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="hall_super_message" value="Hall Super Message (Optional)"/>
                                    <TextArea
                                        id="hall_super_message"
                                        type="text"
                                        name="hall_super_message"
                                        value={data.hall_super_message}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('hall_super_message', e.target.value)}
                                    />
                                    <InputError message={errors.hall_super_message} className="mt-2"/>
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Current Hall Supers</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Hall Name</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Hall Super</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {hallSuperList.map((hallSuper, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-gray-800">{hallSuper.hall?.name}</td>
                                        <td className="px-4 py-2 text-gray-800">{hallSuper.teacher.user?.name}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <NewModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                message={modalMessage}
                type={modalType}
            />
        </Layout>
    );
}
