import {Head, Link, useForm, usePage} from '@inertiajs/react';
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
import {faEdit} from "@fortawesome/free-solid-svg-icons";

export default function CourseForOBE() {
    const user = usePage().props.auth.user;
    const { courses } = usePage().props;
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query
    console.log(courses);

    const filteredCourses = courses.filter((course) =>
        course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout user={user}>
            <Head title="Courses for OBE" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Courses for OBE</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">

                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Your Courses</h2>
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
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Credit</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Edit OBE</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">

                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-800">{course.courseCode}</td>
                                            <td className="px-4 py-2 text-gray-800">{course.courseTitle}</td>
                                            <td className="px-4 py-2 text-gray-800">{course.credit}</td>
                                            <td className="px-4 py-2 text-gray-800">
                                                <Link href={route('OBE_Items', { id: course.id })}>
                                                    ->
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-4 py-2 text-center text-gray-500"
                                        >
                                            No course found.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
