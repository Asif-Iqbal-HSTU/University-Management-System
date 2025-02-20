import {Head, Link, usePage} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React from "react";
import ActivityCard from "@/Components/ActivityCard.jsx";
import { FiEdit } from "react-icons/fi";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
export default function StudentProfile() {
    const user2 = usePage().props.auth.user;
    const { user, student, cgpa, guardian, address, s_id, seatAllocation } = usePage().props;
    //console.log(user.role);
    return (
        <Layout
            user={user}
            s_id={s_id}
        >
            <Head title={student.SID} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">{student.user?.name}</h2>
                            <h2 className="mb-2 text-gray-800 font-bold text-lg text-center">Student
                                ID: {student.SID}</h2>
                            <h2 className="mb-2 text-gray-800 font-bold text-lg text-center">Degree: {student.degree?.name}</h2>
                        </div>
                    </div>

                    {user2.role === "student" &&
                        (
                            <Link
                                href={route('student.edit')}
                            >
                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4">
                                        <FiEdit size={15} /> &nbsp;Edit Profile
                                    </PrimaryButton>
                                </div>
                            </Link>
                        )
                    }

                    {/*Here add an icon that represents to go to edit profile*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-gray-800 font-bold text-base">Personal Information</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Name: </span>{student.user.name}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Gender: </span>{student.user.gender?.name}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Date of Birth: </span>{student.user.dob}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Blood Group: </span>{student.user.blood_group}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">National ID No.: </span>{student.user.nid_no}</h2>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Academic Information</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Student ID: </span>{student.SID}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Degree: </span>{student.degree?.name}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Faculty: </span>{student.faculty?.name}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Level: </span>{student.level}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Semester: </span>{student.semester}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">CGPA: </span>{cgpa.cgpa}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Attached Hall: </span>{student.hall?.name}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Residential Status: </span>{student.residential_status}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Room No: </span>{seatAllocation.room.room_number}</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Guardian Information</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Father's Name: </span>{guardian.father_name}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Mother's Name: </span>{guardian.mother_name}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Father Contact No. </span>{guardian.father_phone}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Mother Contact No. </span>{guardian.mother_phone}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Guardian Occupation: </span>{guardian.guardian_occupation}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Guardian's Income (Per Year): </span>{guardian.income_per_year}</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-gray-800 font-semibold text-base">Contact Information</h2>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Student Phone: </span>{student.user.phone}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Student Email: </span>{student.user.email}</h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Present Address: </span>{student.user.address.present_area}, {student.user.address.present_upazilla}, {student.user.address.present_district}, {student.user.address.present_division}, </h2>
                            <h2 className="mb-2 text-gray-800 text-base"><span
                                className="font-semibold">Permanent Address: </span>{student.user.address.permanent_area}, {student.user.address.permanent_upazilla}, {student.user.address.permanent_district}, {student.user.address.permanent_division}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
