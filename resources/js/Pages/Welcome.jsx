import React from 'react';
import Layout from '@/Layouts/Layout.jsx'
import {Head, usePage} from "@inertiajs/react";

const LandingPage = () => {

    const user = usePage().props.auth.user;
    const { s_id } = usePage().props;
    return (
        <Layout
            user={user}
            s_id={s_id}
            header={
                <section className="flex-grow bg-gray-100 py-20 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-6 text-blue-900">Welcome to Smart Campus</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Automating academic workflows for a smarter, more efficient campus.
                        </p>
                        <a
                            href="#features"
                            className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            Learn More
                        </a>
                    </div>
                </section>
            }
        >
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col">
                {/* Features Section */}
                <section id="features" className="py-20 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-3xl font-bold text-blue-900 mb-8">Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-gray-100 p-6 rounded-lg shadow">
                                <h4 className="text-xl font-semibold mb-4">Course Management</h4>
                                <p className="text-gray-700">
                                    Organize courses, schedules, and enrollments seamlessly.
                                </p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow">
                                <h4 className="text-xl font-semibold mb-4">Student Records</h4>
                                <p className="text-gray-700">
                                    Manage student data with ease and efficiency.
                                </p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow">
                                <h4 className="text-xl font-semibold mb-4">Faculty Dashboard</h4>
                                <p className="text-gray-700">
                                    Provide tools for faculty to manage their responsibilities.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 bg-gray-100">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-3xl font-bold text-blue-900 mb-8">About Us</h3>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            At Hajee Mohammad Danesh Science and Technology University, we aim to
                            revolutionize academic workflows through innovative solutions that
                            enhance efficiency and improve the educational experience for
                            everyone.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-3xl font-bold text-blue-900 mb-8">Contact Us</h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Have questions? Reach out to us at
                            <a href="mailto:info@hstu.ac.bd" className="text-blue-900 underline ml-1">
                                info@hstu.ac.bd
                            </a>
                        </p>
                    </div>
                </section>


            </div>
            {/* Footer */}
            <footer className="bg-blue-900 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 Hajee Mohammad Danesh Science and Technology University</p>
                </div>
            </footer>
        </Layout>
    );
};

export default LandingPage;
