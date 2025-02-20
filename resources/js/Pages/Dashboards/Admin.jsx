import {Head, usePage} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React from "react";
import ActivityCard from "@/Components/ActivityCard.jsx";
export default function AdminDashboard() {
    const user = usePage().props.auth.user;
    const { papers } = usePage().props;
    return (
        <Layout
            user={user}
        >
            <Head title="Admin Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Admin Dashboard</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-5">
                        <ActivityCard
                            link = 'faculty.add'
                            heading="Add Faculty"
                        >
                            Add new faculty from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'department.add'
                            heading="Add Department"
                        >
                            Add new department from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'degree.add'
                            heading="Add Degree"
                        >
                            Add new degree from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'designation.add'
                            heading="Add Designation"
                        >
                            Add new designation from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'teacher.add'
                            heading="Add Teacher"
                        >
                            Add new teacher from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'chairman.add'
                            heading="Add Chairman"
                        >
                            Add new chairman from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'dean.add'
                            heading="Add Dean"
                        >
                            Add new dean from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'building.add'
                            heading="Add Building"
                        >
                            Add new building from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'hall.add'
                            heading="Add Hall"
                        >
                            Add new hall from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'hall.super.add'
                            heading="Add Hall Super"
                        >
                            Add new hall super from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'notice.add'
                            heading="Add Notice"
                        >
                            Add new notice from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'course.add'
                            heading="Add Course"
                        >
                            Add new course from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'course.assign'
                            heading="Assign Course"
                        >
                            Assign course from here.
                        </ActivityCard>
                        <ActivityCard
                            link = 'view.hall.seat.application'
                            heading="Hall Seat applications"
                        >
                            View Hall Seat applications from here.
                        </ActivityCard>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
