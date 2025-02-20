import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";
import SearchableDropdown from "@/Components/SearchableDropdown";
import TextArea from "@/Components/TextArea.jsx";

export default function AddChairman() {
    const user = usePage().props.auth.user;
    const { teachers } = usePage().props;
    const { departments } = usePage().props;
    const { chairmen } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        department_id: '',
        teacher_id: '',
        chairman_message: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    const submit = (e) => {
        e.preventDefault();

        post(route('chairman.add'), {
            onSuccess: () => {
                setModalMessage('Chairman added successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: () => {
                setModalMessage('Failed to add Chairman. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    const departmentOptions = departments.map((department) => ({
        label: department.name,
        value: department.id,
    }));

    const teacherOptions = teachers.map((teacher) => ({
        label: teacher.user?.name,
        value: teacher.id,
    }));

    return (
        <Layout user={user}>
            <Head title="Chairman Add" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add Chairman</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="department_id" value="Select Department"/>
                                    <SearchableDropdown
                                        options={departmentOptions}
                                        onChange={(value) => setData('department_id', value)}
                                        placeholder="Select Department"
                                    />
                                    <InputError message={errors.department_id} className="mt-2"/>
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
                                    <InputLabel htmlFor="chairman_message" value="Chairman Message"/>
                                    <TextArea
                                        id="chairman_message"
                                        type="text"
                                        name="chairman_message"
                                        value={data.chairman_message}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('chairman_message', e.target.value)}
                                    />
                                    <InputError message={errors.chairman_message} className="mt-2"/>
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Current Chairmen</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Department Name</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Chairman</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {chairmen.map((chairman, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-gray-800">{chairman.department?.name}</td>
                                        <td className="px-4 py-2 text-gray-800">{chairman.teacher.user?.name}</td>
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
