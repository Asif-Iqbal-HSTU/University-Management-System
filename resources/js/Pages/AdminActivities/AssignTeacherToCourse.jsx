import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";
import SearchableDropdown from "@/Components/SearchableDropdown";

export default function AddDegree() {
    const user = usePage().props.auth.user;
    const { teachers, courses } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        faculty_id: '',
        credit_hours: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    const submit = (e) => {
        e.preventDefault();

        post(route('course.assign'), {
            onSuccess: () => {
                setModalMessage('Degree created successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: () => {
                setModalMessage('Failed to create degree. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    const courseOptions = courses.map((course) => ({
        label: course.courseCode,
        value: course.id,
    }));

    const teacherOptions = teachers.map((teacher) => ({
        label: teacher.user?.name,
        value: teacher.id,
    }));

    return (
        <Layout user={user}>
            <Head title="Degree Add" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add Degree</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="course_id" value="Select Course"/>
                                    <SearchableDropdown
                                        options={courseOptions}
                                        onChange={(value) => setData('course_id', value)}
                                        placeholder="Select Course"
                                    />
                                    <InputError message={errors.course_id} className="mt-2"/>
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
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Current Degrees</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Degree Name</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Faculty</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Credit Hour</th>
                                </tr>
                                </thead>
                                {/*<tbody className="divide-y divide-gray-200">*/}
                                {/*{degrees.map((degree, index) => (*/}
                                {/*    <tr key={index} className="hover:bg-gray-50">*/}
                                {/*        <td className="px-4 py-2 text-gray-800">{degree.name}</td>*/}
                                {/*        <td className="px-4 py-2 text-gray-800">{degree.faculty?.name}</td>*/}
                                {/*        <td className="px-4 py-2 text-gray-800">{degree.credit_hours}</td>*/}
                                {/*    </tr>*/}
                                {/*))}*/}
                                {/*</tbody>*/}
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
