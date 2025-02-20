import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";
import SearchableDropdown from "@/Components/SearchableDropdown";

export default function AddTeacher() {
    const user = usePage().props.auth.user;
    const { faculties, departments, designations, teachers } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        designation_id: '',
        faculty_id: '',
        department_id: '',
        password: '',
        password_confirmation: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query

    const submit = (e) => {
        e.preventDefault();

        post(route('teacher.add'), {
            onSuccess: () => {
                setModalMessage('Teacher added successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: () => {
                setModalMessage('Failed to add teacher. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    const facultyOptions = faculties.map((faculty) => ({
        label: faculty.name,
        value: faculty.id,
    }));

    const departmentOptions = departments.map((department) => ({
        label: department.name,
        value: department.id,
    }));

    const designationOptions = designations.map((designation) => ({
        label: designation.name,
        value: designation.id,
    }));

    // Filter teachers based on search query
    const filteredTeachers = teachers.filter((teacher) =>
        teacher.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout user={user}>
            <Head title="Teacher Add" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add Teacher</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name"/>
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
                                    <InputLabel htmlFor="faculty_id" value="Select Faculty"/>
                                    <SearchableDropdown
                                        options={facultyOptions}
                                        onChange={(value) => setData('faculty_id', value)}
                                        placeholder="Select Faculty"
                                    />
                                    <InputError message={errors.faculty_id} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="department_id" value="Select Department"/>
                                    <SearchableDropdown
                                        options={departmentOptions}
                                        onChange={(value) => setData('department_id', value)}
                                        placeholder="Select Department"
                                    />
                                    <InputError message={errors.department_id} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="designation_id" value="Select Designation"/>
                                    <SearchableDropdown
                                        options={designationOptions}
                                        onChange={(value) => setData('designation_id', value)}
                                        placeholder="Select Designation"
                                    />
                                    <InputError message={errors.designation_id} className="mt-2"/>
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
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Current Teachers</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <div className="mb-4">
                                <TextInput
                                    type="text"
                                    name="search"
                                    value={searchQuery}
                                    placeholder="Search Teachers..."
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Faculty</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Department</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Designation</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {filteredTeachers.length > 0 ? (
                                    filteredTeachers.map((teacher, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-800">{teacher.user?.name}</td>
                                            <td className="px-4 py-2 text-gray-800">{teacher.faculty?.name}</td>
                                            <td className="px-4 py-2 text-gray-800">{teacher.department?.name}</td>
                                            <td className="px-4 py-2 text-gray-800">{teacher.designation?.name}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-4 py-2 text-center text-gray-500"
                                        >
                                            No teachers found.
                                        </td>
                                    </tr>
                                )}
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
