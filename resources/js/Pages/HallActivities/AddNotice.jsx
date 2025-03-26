import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";
import SearchableDropdown from "@/Components/SearchableDropdown.jsx";
import TextArea from "@/Components/TextArea.jsx";

export default function AddNotice() {
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    const submit = (e) => {
        e.preventDefault();

        post(route('notice.add'), {
            onSuccess: () => {
                setModalMessage('Notice added successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: () => {
                setModalMessage('Failed to add Notice. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    return (
        <Layout user={user}>
            <Head title="Notice Add" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add a Notice</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="title" value="Title"/>
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    <InputError message={errors.title} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Description"/>
                                    <TextArea
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2"/>
                                </div>
                                {/*<div className="mt-4">*/}
                                {/*    <InputLabel htmlFor="role" value="For which users?"/>*/}

                                {/*    <select*/}
                                {/*        id="role"*/}
                                {/*        name="role"*/}
                                {/*        value={data.role}*/}
                                {/*        className='mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'*/}
                                {/*        onChange={(e) => setData('role', e.target.value)}*/}
                                {/*        required*/}
                                {/*    >*/}
                                {/*        <option value="">Select Role</option>*/}
                                {/*        <option value="student">Student</option>*/}
                                {/*        <option value="teacher">Teacher</option>*/}
                                {/*    </select>*/}
                                {/*    <InputError message={errors.semester} className="mt-2"/>*/}
                                {/*</div>*/}
                                {/*<div className="mt-4">*/}
                                {/*    <InputLabel htmlFor="category" value="Select Category"/>*/}

                                {/*    <select*/}
                                {/*        id="category"*/}
                                {/*        name="category"*/}
                                {/*        value={data.category}*/}
                                {/*        className='mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'*/}
                                {/*        onChange={(e) => setData('category', e.target.value)}*/}
                                {/*        required*/}
                                {/*    >*/}
                                {/*        <option value="">Select Category</option>*/}
                                {/*        <option value="Hall Seat">Hall Seat</option>*/}
                                {/*        <option value="Hall Clearance">Hall Clearance</option>*/}
                                {/*    </select>*/}
                                {/*    <InputError message={errors.category} className="mt-2"/>*/}
                                {/*</div>*/}
                                <div className="mt-4">
                                    <InputLabel htmlFor="start_date" value="Start Date"/>
                                    <input
                                        id="start_date"
                                        type="date" // Use "datetime-local" if you need both date and time
                                        name="start_date"
                                        value={data.start_date}
                                        className="mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.start_date} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="end_date" value="End Date"/>
                                    <input
                                        id="end_date"
                                        type="date" // Use "datetime-local" if you need both date and time
                                        name="end_date"
                                        value={data.end_date}
                                        className="mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.end_date} className="mt-2"/>
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Notice Preview</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            {/*  Here start to show a notice preview with the things I enter to the form. This preview should be made live at the time ot filling up the form  */}
                            <div className="mt-4">
                                <p className="text-lg font-bold text-gray-700">{data.title || "Title will appear here"}</p>
                                <p className="text-gray-600 mt-2">{data.description || "Description will appear here"}</p>
                                {/*<p className="text-sm text-gray-500 mt-4">*/}
                                {/*    <strong>Category:</strong> {data.category || "Not selected"}*/}
                                {/*</p>*/}
                                {/*<p className="text-sm text-gray-500">*/}
                                {/*    <strong>Role:</strong> {data.role || "Not selected"}*/}
                                {/*</p>*/}
                                <p className="text-sm text-gray-500">
                                    <strong>Start Date:</strong> {data.start_date || "Not selected"}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>End Date:</strong> {data.end_date || "Not selected"}
                                </p>
                            </div>
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
