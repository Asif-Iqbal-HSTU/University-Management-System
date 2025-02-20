import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";
import SearchableDropdown from "@/Components/SearchableDropdown";

export default function AddDepartment() {
    const user = usePage().props.auth.user;
    const { faculties } = usePage().props;
    const { departments } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        dept_code: '',
        faculty_id: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    const submit = (e) => {
        e.preventDefault();

        post(route('department.add'), {
            onSuccess: () => {
                setModalMessage('Department created successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: () => {
                setModalMessage('Failed to create department. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    const facultyOptions = faculties.map((faculty) => ({
        label: faculty.name,
        value: faculty.id,
    }));

    return (
        <Layout user={user}>
            <Head title="Department Add" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add Department</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Department Name"/>
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
                                    <InputLabel htmlFor="dept_code" value="Short Name"/>
                                    <TextInput
                                        id="dept_code"
                                        type="text"
                                        name="dept_code"
                                        value={data.dept_code}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('dept_code', e.target.value)}
                                    />
                                    <InputError message={errors.dept_code} className="mt-2"/>
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
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Current Departments</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <ul>
                                {departments.map((department, index) => (
                                    <li key={index}>
                                        {index + 1}. {department.name} ({department.dept_code})
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
