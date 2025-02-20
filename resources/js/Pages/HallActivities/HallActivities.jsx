import {Head, usePage} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React from "react";
import ActivityCard from "@/Components/ActivityCard.jsx";
export default function TeacherDashboard() {
    const user = usePage().props.auth.user;
    const { hall } = usePage().props;

    return (
        <Layout
            user={user}
        >
            <Head title="Teacher Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">{hall.name}</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-5">
                        <ActivityCard
                            link="get.rooms"
                            params={{ hall_id: hall.id }}
                            heading="Rooms"
                        >
                            See in which rooms which students are staying.
                        </ActivityCard>
                        <ActivityCard
                            link="get.hall.students"
                            params={{ hall_id: hall.id }}
                            heading="Students"
                        >
                            See all Students of this hall and their status from here.
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
