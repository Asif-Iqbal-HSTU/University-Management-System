import {Head, usePage} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React from "react";
import ActivityCard from "@/Components/ActivityCard.jsx";
export default function TeacherDashboard() {
    const user = usePage().props.auth.user;
    console.log(user.id);
    const { teacher, courses, hall_super } = usePage().props;
    console.log(teacher.id);
    console.log(courses);

    return (
        <Layout
            user={user}
        >
            <Head title="Teacher Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Teacher Dashboard</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-5">
                        <ActivityCard
                            link="teacher.courses"
                            params={{ id: user.id }} // Assuming the user object contains the teacher's ID
                            heading="Your Courses (For OBE)"
                        >
                            See courses to update OBE from here.
                        </ActivityCard>

                        {/*{hall_super &&*/}
                        {/*    <ActivityCard*/}
                        {/*        link = 'view.hall.seat.application'*/}
                        {/*        heading="Hall Seat applications"*/}
                        {/*    >*/}
                        {/*        View Hall Seat applications from here.*/}
                        {/*    </ActivityCard>*/}
                        {/*}*/}

                        {hall_super &&
                            <ActivityCard
                                link = 'hall.activities'
                                heading="Hall Activities"
                            >
                                Perform all Hall Related work from here.
                            </ActivityCard>
                        }


                    </div>
                </div>
            </div>
        </Layout>
    );
}
