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
    const { course } = usePage().props;
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query
    console.log(course);

    return (
        <Layout user={user}>
            <Head title="Courses for OBE" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">OBE Items</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">

                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Your Courses</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                            <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 flex items-center justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        <Link href='#'>
                                                            <button
                                                                className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600">Edit Basic Info &#128221;</button>
                                                        </Link>
                                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">{course.courseCode}</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
