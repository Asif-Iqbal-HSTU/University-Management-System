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
import NumberInput from "@/Components/NumberInput.jsx";

export default function AddCourse() {
    const user = usePage().props.auth.user;
    const { degrees, departments, courses } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        courseCode: '',
        courseTitle: '',
        department_id: '',
        degree_id: '',
        credit: '',
        contactHourPerWeek: '',
        level: '',
        semester: '',
        academicSession: '',
        type: '',
        type_T_S: '',
        totalMarks: '',
        instructor: '',
        prerequisites: '',
        summary: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query

    const submit = (e) => {
        e.preventDefault();

        post(route('course.add'), {
            onSuccess: () => {
                setModalMessage('Course added successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: (errors) => {
                console.error(errors); // Log errors for debugging
                setModalMessage('Failed to add Course. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    const departmentOptions = departments.map((department) => ({
        label: department.name,
        value: department.id,
    }));

    const degreeOptions = degrees.map((degree) => ({
        label: degree.name,
        value: degree.id,
    }));

    const levels = ['1', '2', '3', '4', '5'];
    const semesters = ['I', 'II'];
    const academicSessions = ['January-June', 'July-December'];

    const filteredCourses = courses.filter((course) =>
        course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout user={user}>
            <Head title="Course Add" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Add Course</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="courseCode" value="Course Code"/>
                                    <TextInput
                                        id="courseCode"
                                        type="text"
                                        name="courseCode"
                                        value={data.courseCode}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('courseCode', e.target.value)}
                                    />
                                    <InputError message={errors.courseCode} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="courseTitle" value="Course Title"/>
                                    <TextInput
                                        id="courseTitle"
                                        type="text"
                                        name="courseTitle"
                                        value={data.courseTitle}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('courseTitle', e.target.value)}
                                    />
                                    <InputError message={errors.courseTitle} className="mt-2"/>
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
                                    <InputLabel htmlFor="degree_id" value="Select Degree"/>
                                    <SearchableDropdown
                                        options={degreeOptions}
                                        onChange={(value) => setData('degree_id', value)}
                                        placeholder="Select Degree"
                                    />
                                    <InputError message={errors.degree_id} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="credit" value="Credit"/>
                                    <NumberInput
                                        id="credit"
                                        type="text"
                                        name="credit"
                                        value={data.credit}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('credit', e.target.value)}
                                    />
                                    <InputError message={errors.credit} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="contactHourPerWeek" value="Contact Hour Per Week"/>
                                    <NumberInput
                                        id="contactHourPerWeek"
                                        type="text"
                                        name="contactHourPerWeek"
                                        value={data.contactHourPerWeek}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('contactHourPerWeek', e.target.value)}
                                    />
                                    <InputError message={errors.contactHourPerWeek} className="mt-2"/>
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
                                    <InputLabel htmlFor="academicSession" value="Academic Session"/>

                                    <select
                                        id="academicSession"
                                        name="academicSession"
                                        value={data.academicSession}
                                        className='mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                        onChange={(e) => setData('academicSession', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Academic Session</option>
                                        {academicSessions.map((academicSession, index) => (
                                            <option key={index} value={academicSession}>
                                                {academicSession}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.academicSession} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="type" value="Core/ Not-Core"/>

                                    <select
                                        id="type"
                                        name="type"
                                        value={data.type}
                                        className='mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                        onChange={(e) => setData('type', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Core/ Not-Core</option>
                                        <option value="Core">Core</option>
                                        <option value="Not-Core">Not-Core</option>
                                    </select>
                                    <InputError message={errors.type} className="mt-2"/>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="type_T_S" value="Theory/ Sessional"/>

                                    <select
                                        id="type_T_S"
                                        name="type_T_S"
                                        value={data.type_T_S}
                                        className='mt-1 block w-full border-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                        onChange={(e) => setData('type_T_S', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Theory/ Sessional</option>
                                        <option value="Theory">Theory</option>
                                        <option value="Sessional">Sessional</option>
                                    </select>
                                    <InputError message={errors.type_T_S} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="prerequisites" value="Prerequisites"/>
                                    <TextArea
                                        id="prerequisites"
                                        type="text"
                                        name="prerequisites"
                                        value={data.prerequisites}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('prerequisites', e.target.value)}
                                    />
                                    <InputError message={errors.prerequisites} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="summary" value="Summary"/>
                                    <TextArea
                                        id="summary"
                                        type="text"
                                        name="summary"
                                        value={data.summary}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('summary', e.target.value)}
                                    />
                                    <InputError message={errors.summary} className="mt-2"/>
                                </div>
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Current Courses</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <div className="mb-4">
                                <TextInput
                                    type="text"
                                    name="search"
                                    value={searchQuery}
                                    placeholder="Search by Course Code..."
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Course Code</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Course Name</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Degree</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Department</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Credit</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">

                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-800">{course.courseCode}</td>
                                            <td className="px-4 py-2 text-gray-800">{course.courseTitle}</td>
                                            <td className="px-4 py-2 text-gray-800">{course.degree?.name}</td>
                                            <td className="px-4 py-2 text-gray-800">{course.department?.name}</td>
                                            <td className="px-4 py-2 text-gray-800">{course.credit}</td>
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
