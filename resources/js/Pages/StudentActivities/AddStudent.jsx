import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";
import SearchableDropdown from "@/Components/SearchableDropdown.jsx";
import axios from 'axios';

export default function AddStudent() {
    const user = usePage().props.auth.user;
    const { faculties, degrees, halls, teachers } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        SID: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        faculty_id: '',
        degree_id: '',
        level: '',
        semester: '',
        session_year: '',
        hall_id: '',
        residential_status: '',
        image: '', // New state for file upload
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query
    const levels = ['1', '2', '3', '4', '5'];
    const semesters = ['I', 'II'];

    // const submit = async (e) => {
    //     e.preventDefault();
    //     console.log(data);
    //     try {
    //         const response = await axios.post(route('student.add'), data);
    //         const { status, message } = response.data;
    //
    //         if (status === 'success') {
    //             setModalMessage(message);
    //             setModalType('success');
    //         } else {
    //             setModalMessage(message);
    //             setModalType('error');
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             setModalMessage(error.response.data.message || 'An unexpected error occurred.');
    //             // setModalMessage(error.response.data.message );
    //             setModalType('error');
    //         } else {
    //             setModalMessage('Failed to connect to the server. Please try again.');
    //             setModalType('error');
    //         }
    //     } finally {
    //         setModalOpen(true);
    //     }
    // };

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        try {
            const response = await axios.post(route('student.add'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { status, message } = response.data;

            if (status === 'success') {
                setModalMessage(message);
                setModalType('success');
            } else {
                setModalMessage(message);
                setModalType('error');
            }
        } catch (error) {
            setModalMessage(error.response?.data?.message || 'An unexpected error occurred.');
            setModalType('error');
        } finally {
            setModalOpen(true);
        }
    };


    const facultyOptions = faculties.map((faculty) => ({
        label: faculty.name,
        value: faculty.id,
    }));

    const degreeOptions = degrees.map((degree) => ({
        label: degree.name,
        value: degree.id,
    }));

    const hallOptions = halls.map((hall) => ({
        label: hall.name,
        value: hall.id,
    }));

    return (
        <Layout user={user}>
            <Head title="Register Student" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Register Student</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="SID" value="Student ID"/>
                                    <TextInput
                                        id="SID"
                                        type="text"
                                        name="SID"
                                        value={data.SID}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('SID', e.target.value)}
                                    />
                                    <InputError message={errors.SID} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name"/>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email"/>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="phone" value="Phone"/>
                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    <InputError message={errors.phone} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="image" value="Your Image"/>
                                    <TextInput
                                        id="image"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />

                                    <InputError message={errors.image} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="faculty_id" value="Select Faculty"/>
                                    <SearchableDropdown
                                        options={facultyOptions}
                                        onChange={(value) => setData('faculty_id', value)}
                                        placeholder="Select Faculty"
                                    />
                                    <InputError message={errors.faculty_id} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="degree_id" value="Select Degree"/>
                                    <SearchableDropdown
                                        options={degreeOptions}
                                        onChange={(value) => setData('degree_id', value)}
                                        placeholder="Select Degree"
                                    />
                                    <InputError message={errors.degree_id} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="level" value="Level"/>

                                    <select
                                        id="level"
                                        name="level"
                                        value={data.level}
                                        className='mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                        onChange={(e) => setData('level', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Level</option>
                                        {levels.map((level, index) => (
                                            <option key={index} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.level} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="semester" value="Semester"/>

                                    <select
                                        id="semester"
                                        name="semester"
                                        value={data.semester}
                                        className='mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                        onChange={(e) => setData('semester', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Semester</option>
                                        {semesters.map((semester, index) => (
                                            <option key={index} value={semester}>
                                                {semester}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.semester} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="session_year" value="Session"/>
                                    <TextInput
                                        id="session_year"
                                        type="text"
                                        name="session_year"
                                        value={data.session_year}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('session_year', e.target.value)}
                                    />
                                    <InputError message={errors.session_year} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="hall_id" value="Select Hall"/>
                                    <SearchableDropdown
                                        options={hallOptions}
                                        onChange={(value) => setData('hall_id', value)}
                                        placeholder="Select Hall"
                                    />
                                    <InputError message={errors.hall_id} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="residential_status" value="Residential Status"/>

                                    <select
                                        id="residential_status"
                                        name="residential_status"
                                        value={data.residential_status}
                                        className='mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                        onChange={(e) => setData('residential_status', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Level</option>
                                        <option value="Resident">Resident</option>
                                        <option value="Non-Resident">Non-Resident</option>

                                        {/*{levels.map((level, index) => (*/}
                                        {/*    <option key={index} value={level}>*/}
                                        {/*        {level}*/}
                                        {/*    </option>*/}
                                        {/*))}*/}
                                    </select>
                                    <InputError message={errors.residential_status} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password"/>

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.password} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Register
                                    </PrimaryButton>
                                </div>
                            </form>
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
