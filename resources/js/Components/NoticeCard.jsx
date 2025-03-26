import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';

export default function NoticeCard({ link, params = {}, heading, children }) {
    const user = usePage().props.auth.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Link href={route(link, params)}>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="text-lg font-semibold mb-4">{heading}</h4>
                    <p className="text-sm text-gray-700">
                        {children}
                    </p>
                </div>
            </Link>


        </>
    );
}
