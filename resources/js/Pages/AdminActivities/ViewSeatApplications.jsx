import {Head, Link, usePage} from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoomAllocationModal from "@/Components/RoomAllocationModal.jsx";
import {FiUser} from "react-icons/fi";
import { router } from "@inertiajs/react";

export default function ViewSeatApplications() {
    const user = usePage().props.auth.user;
    const { applications, rooms } = usePage().props;
    // State to manage sorting
    const [sortBySalary, setSortBySalary] = useState(false);
    const [sortByDistance, setSortByDistance] = useState(false);

    // Sorting function
    const sortedApplications = React.useMemo(() => {
        let sorted = [...applications].sort((a, b) => (b.student?.cgpa?.cgpa || 0) - (a.student?.cgpa?.cgpa || 0)); // Default sort by CGPA

        if (sortBySalary) {
            sorted = sorted.sort((a, b) => (a.student?.guardian?.income_per_year || 0) - (b.student?.guardian?.income_per_year || 0));
        }
        if (sortByDistance) {
            sorted = sorted.sort((a, b) => (b.student?.user?.address?.permanent_district_distance || 0) - (a.student?.user?.address?.permanent_district_distance || 0));
        }
        return sorted;
    }, [applications, sortBySalary, sortByDistance]);

    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const openModal = (student, application) => {
        // console.log(student);
        setSelectedStudent(student);
        setSelectedApplication(application);
        setShowModal(true);
    };

    return (
        <Layout user={user}>
            <Head title="Hall Seat Applications" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">
                                Hall Seat Applications
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols- gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg text-sm shadow">
                            <h2 className="text-gray-800 font-semibold text-base">
                                Current Applications
                            </h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                            <div className="mb-4">

                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="checkbox"
                                        checked={sortBySalary}
                                        onChange={() => setSortBySalary(!sortBySalary)}
                                        className="mr-2"
                                    />
                                    Father's Salary
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={sortByDistance}
                                        onChange={() => setSortByDistance(!sortByDistance)}
                                        className="mr-2"
                                    />
                                    Distance from Home District
                                </label>
                            </div>

                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        SL No.
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        Applicant ID
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        Applicant Name
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        CGPA
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        Degree
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                        Action
                                    </th>
                                    {/*<th className="px-4 py-2 text-left text-gray-600 font-semibold">*/}
                                    {/*    Guardian Income*/}
                                    {/*</th>*/}
                                    {/*<th className="px-4 py-2 text-left text-gray-600 font-semibold">*/}
                                    {/*    Permanent District Distance*/}
                                    {/*</th>*/}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {sortedApplications.map((application, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 text-gray-800">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 text-gray-800">
                                            <Link href={route('profile.student', application.student?.SID)} className="hover:underline">
                                                {application.student?.SID || "N/A"}
                                            </Link>

                                        </td>
                                        <td className="px-4 py-2 text-gray-800">
                                            {application.student?.user?.name || "N/A"}
                                        </td>
                                        <td className="px-4 py-2 text-gray-800">
                                            {application.student?.cgpa?.cgpa || "N/A"}
                                        </td>
                                        <td className="px-4 py-2 text-gray-800">
                                            {application.student?.degree?.name || "N/A"}
                                        </td>
                                        <td className="px-4 py-2 text-gray-800 flex space-x-2">
                                            {/* Accept Button */}
                                            <button className="text-green-500 hover:text-green-700" onClick={() => openModal(application.student, application.id)}>
                                                <FontAwesomeIcon icon={faCheckCircle} size="lg"/>
                                            </button>

                                            {showModal && (
                                                <RoomAllocationModal
                                                    student={selectedStudent}
                                                    applicationID={selectedApplication}
                                                    hallId={application.student?.hall_id}
                                                    onClose={
                                                        () => {
                                                            setShowModal(false);
                                                            router.reload();
                                                        }
                                                    }
                                                />
                                            )}

                                            {/* Reject Button */}
                                            <Link href={route('student.reject', application.id)}
                                                  className="hover:underline">
                                                <button className="text-red-500 hover:text-red-700">
                                                    <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                                                </button>
                                            </Link>

                                        </td>
                                        {/*<td className="px-4 py-2 text-gray-800">*/}
                                        {/*    {application.student?.hall?.name || "N/A"}*/}
                                        {/*</td>*/}
                                        {/*<td className="px-4 py-2 text-gray-800">*/}
                                        {/*    {application.student?.guardian?.income_per_year || "N/A"}*/}
                                        {/*</td>*/}
                                        {/*<td className="px-4 py-2 text-gray-800">*/}
                                        {/*    {application.student?.user?.address?.permanent_district_distance || "N/A"}*/}
                                        {/*</td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
