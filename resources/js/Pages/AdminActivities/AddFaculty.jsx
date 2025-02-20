import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";

export default function AddFaculty() {
    const user = usePage().props.auth.user;
    const { faculties } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        short_name: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    const submit = (e) => {
        e.preventDefault();

        post(route('faculty.add'), {
            onSuccess: () => {
                setModalMessage('Faculty created successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: () => {
                setModalMessage('Failed to create faculty. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    return (
        <Layout user={user}>
            <Head title="Faculty Add" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add Faculty</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Faculty Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="short_name" value="Short Name" />
                                    <TextInput
                                        id="short_name"
                                        type="text"
                                        name="short_name"
                                        value={data.short_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('short_name', e.target.value)}
                                    />
                                    <InputError message={errors.short_name} className="mt-2" />
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Current Faculties</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <ul>
                                {faculties.map((faculty, index) => (
                                    <li key={index}>
                                        {index + 1}. {faculty.name} ({faculty.short_name})
                                    </li>
                                ))}
                            </ul>
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
