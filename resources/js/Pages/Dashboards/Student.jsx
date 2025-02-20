import {Head, usePage} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React from "react";
import ActivityCard from "@/Components/ActivityCard.jsx";
export default function StudentDashboard() {
    const user = usePage().props.auth.user;
    const { notices, s_id } = usePage().props;
    console.log(s_id);
    const hallSeatNotice = notices?.find(notice => notice.category === "Hall Seat");
    const hallClearanceNotice = notices?.find(notice => notice.category === "Hall Clearance");

    return (
        <Layout
            user={user}
            s_id={s_id}
        >
            <Head title="Student Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Student Dashboard</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-5">
                        <ActivityCard
                            link = 'faculty.add'
                            heading="Add Faculty"
                        >
                            Add new faculty from here.
                        </ActivityCard>

                        {hallSeatNotice && (
                            <ActivityCard
                                link='hall.seat.application'
                                heading="Hall Seat Application"
                            >
                                Apply for hall seats from here.
                            </ActivityCard>
                        )}

                        {hallClearanceNotice && (
                            <ActivityCard
                                link='faculty.add'
                                heading="Hall Seat Application"
                            >
                                Apply for hall seats from here.
                            </ActivityCard>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
