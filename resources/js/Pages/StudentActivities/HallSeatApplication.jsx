import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NewModal from "@/Components/NewModal.jsx";

export default function HallSeatApplication() {
    const { user, guardian, address, cgpa, application, s_id } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        agreement: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    const submit = (e) => {
        e.preventDefault();

        if (!data.agreement) {
            setModalMessage('You must agree to the terms and conditions to apply.');
            setModalType('error');
            setModalOpen(true);
            return;
        }

        post(route('hall.seat.application'), {
            onSuccess: () => {
                setModalMessage('Application Sent Successfully!');
                setModalType('success');
                setModalOpen(true);
            },
            onError: () => {
                setModalMessage('Failed to apply. Please try again.');
                setModalType('error');
                setModalOpen(true);
            },
        });
    };

    return (
        <Layout
            user={user}
            s_id={s_id}
        >
            <Head title="Hall Seat Application" />
            <div className="py-12">
                {!application && (

                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Apply for Hall
                                    Seat</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-5">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-gray-800 font-bold text-lg">Hall Seat Application</h2>
                                <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                                <h2 className="mb-2 text-gray-800 font-semibold text-base">The following information
                                    will be
                                    used:</h2>

                                <p className="mb-2 text-gray-800 text-base">
                                <span
                                    className="font-semibold">CGPA: </span>{cgpa.cgpa}
                                </p>
                                <p className="mb-2 text-gray-800 text-base">
                                <span
                                    className="font-semibold">Guardian Occupation:</span> {guardian.guardian_occupation}
                                </p>
                                <p className="mb-2 text-gray-800 text-base">
                                <span
                                    className="font-semibold">Guardian's Income (Per Year):</span> {guardian.income_per_year}
                                </p>
                                <p className="mb-2 text-gray-800 text-base">
                                <span
                                    className="font-semibold">Permanent Address:</span> {address.permanent_area}, {address.permanent_upazilla}, {address.permanent_district}, {address.permanent_division}
                                </p>

                                <form onSubmit={submit}>
                                    <div className="mt-4">
                                        <h3 className="text-gray-800 font-semibold text-base">Terms and Conditions:</h3>
                                        <ul className="list-disc list-inside text-gray-700 mt-2 text-sm">
                                            <li>Applicants must be full-time students of the university.</li>
                                            <li>Priority will be given to students with higher CGPA and those in need of
                                                financial assistance.
                                            </li>
                                            <li>Applicants agree to abide by all rules and regulations of the hall.</li>
                                            <li>Providing false information will lead to disqualification and
                                                disciplinary
                                                actions.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mt-4 flex items-start">
                                        <input
                                            type="checkbox"
                                            id="agreement"
                                            name="agreement"
                                            className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                                            checked={data.agreement === 'yes'}
                                            onChange={(e) => setData('agreement', e.target.checked ? 'yes' : '')}
                                        />
                                        <label htmlFor="agreement" className="ml-2 text-gray-700 text-sm">
                                            I agree to the terms and conditions.
                                        </label>
                                    </div>
                                    <InputError message={errors.agreement} className="mt-2"/>

                                    <div className="mt-6 flex items-center justify-end">
                                        <PrimaryButton className="ms-4" disabled={processing || !data.agreement}>
                                            Submit Application
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {application && (

                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-blue-100 shadow-md sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="mb-2 text-gray-800 font-bold text-xl text-center">Your Application Status: {application.status}</h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <NewModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                message={modalMessage}
                type={modalType}
            />
        </Layout>
    );
}
