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

export default function AddDean() {
    const user = usePage().props.auth.user;
    const { teachers } = usePage().props;
    const { faculties } = usePage().props;
    const { deans } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        faculty_id: '',
        teacher_id: '',
        dean_message: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    const submit = (e) => {
        e.preventDefault();

        post(route('dean.add'), {
            onSuccess: () => {
                setModalMessage('Dean added successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: () => {
                setModalMessage('Failed to add Dean. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    const facultyOptions = faculties.map((faculty) => ({
        label: faculty.name,
        value: faculty.id,
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
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add Dean</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="faculty_id" value="Select Faculty"/>
                                    <SearchableDropdown
                                        options={facultyOptions}
                                        onChange={(value) => setData('faculty_id', value)}
                                        placeholder="Select Faculty"
                                    />
                                    <InputError message={errors.faculty_id} className="mt-2"/>
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
                                    <InputLabel htmlFor="dean_message" value="Dean Message"/>
                                    <TextArea
                                        id="dean_message"
                                        type="text"
                                        name="dean_message"
                                        value={data.dean_message}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('dean_message', e.target.value)}
                                    />
                                    <InputError message={errors.dean_message} className="mt-2"/>
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Current Deans</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Faculty Name</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Dean</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {deans.map((dean, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-gray-800">{dean.faculty?.name}</td>
                                        <td className="px-4 py-2 text-gray-800">{dean.teacher.user?.name}</td>
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
