import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";
import SearchableDropdown from "@/Components/SearchableDropdown";

export default function AddBuilding() {
    const user = usePage().props.auth.user;
    const { buildings } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        purpose: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    const submit = (e) => {
        e.preventDefault();

        post(route('building.add'), {
            onSuccess: () => {
                setModalMessage('Building added successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: () => {
                setModalMessage('Failed to add Building. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    return (
        <Layout user={user}>
            <Head title="Building Add" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add Building</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Building Name"/>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="purpose" value="Purpose"/>
                                    <TextInput
                                        id="purpose"
                                        type="text"
                                        name="purpose"
                                        value={data.purpose}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('purpose', e.target.value)}
                                    />
                                    <InputError message={errors.purpose} className="mt-2"/>
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Current Buildings</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <ul>
                                {buildings.map((building, index) => (
                                    <li key={index}>
                                        {index + 1}. {building.name}
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
