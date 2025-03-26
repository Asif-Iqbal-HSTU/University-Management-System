import {Head, usePage} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React from "react";
import NoticeCard from "@/Components/NoticeCard.jsx";
import ActivityCard from "@/Components/ActivityCard.jsx";
export default function NoticeBoard() {
    const user = usePage().props.auth.user;
    const { hallNotices, s_id, student } = usePage().props;

    return (
        <Layout
            user={user}
            s_id={s_id}
        >
            <Head title="Notice Board" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Notice Board</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                        {hallNotices.map((hallNotice, index) => (
                            <NoticeCard
                                link = 'studentDashboard'
                                heading={hallNotice.title}
                                key = {index}
                            >
                                {hallNotice.description}
                                <p>
                                    Deadline: {hallNotice.end_date}
                                </p>

                            </NoticeCard>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
