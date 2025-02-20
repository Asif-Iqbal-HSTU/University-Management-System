import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';

export default function Layout({ header, children, s_id="" }) {
    const user = usePage().props.auth.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //console.log(s_id);
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <header className="bg-blue-200 text-gray-800 py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <Link href={route('root')} className="hover:underline">{/* Logo and Name */}
                        <div className="flex items-center space-x-2">
                            <img
                                src="/image/HSTU_Logo.png"
                                alt="HSTU Logo"
                                className="h-12 w-10"
                            />
                            <h1 className="text-2xl font-bold hidden md:block">
                                University Management System
                            </h1>
                            <h1 className="text-xl font-bold md:hidden">HSTU - UMS</h1>
                        </div>
                    </Link>


                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <>
                                <nav className="hidden md:flex items-center">
                                    <Link href={route('login')} className="hover:underline">
                                        <FiLogIn className="text-2xl" title="Login" />
                                    </Link>
                                </nav>
                                <button
                                    className="md:hidden focus:outline-none"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <>
                                <nav className="hidden md:flex items-center space-x-4">
                                    {user.role === "teacher" ? (
                                        <>
                                            <Link href={route('teacherDashboard')} className="hover:underline">
                                                Dashboard
                                            </Link>
                                            <Link href={route('profile.teacher')} className="hover:underline">
                                                <FiUser className="text-2xl" title="Profile" />
                                            </Link>
                                        </>
                                    ):(
                                        <>
                                            {user.role === "admin" ? (
                                                <>
                                                    <Link href={route('adminDashboard')} className="hover:underline">
                                                        Dashboard
                                                    </Link>
                                                    <Link href={route('profile.admin')} className="hover:underline">
                                                        <FiUser className="text-2xl" title="Profile" />
                                                    </Link>
                                                </>
                                            ):(
                                                <>
                                                    {user.role === "student" ? (
                                                        <>
                                                            <Link href={route('studentDashboard')} className="hover:underline">
                                                                Dashboard
                                                            </Link>
                                                            <Link href={route('profile.student', s_id)} className="hover:underline">
                                                                <FiUser className="text-2xl" title="Profile" />
                                                            </Link>
                                                        </>
                                                    ):(
                                                        <>

                                                        </>
                                                    )}
                                                </>
                                            )}

                                        </>
                                    )}
                                    <Link href={route('logout')} method="post" className="hover:underline">
                                        <FiLogOut className="text-2xl" title="Logout" />
                                    </Link>
                                </nav>
                                <button
                                    className="md:hidden focus:outline-none"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden bg-blue-800">
                        <ul className="space-y-2 py-2 text-center">
                            {!user ? (
                                <li>
                                    <Link
                                        href={route('login')}
                                        className="block px-4 py-2 hover:underline"
                                    >
                                        <FiLogIn className="inline text-xl mr-2" /> Login
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    {user.role === "teacher" ? (
                                        <>
                                            <li>
                                                <Link
                                                    href={route('teacherDashboard')}
                                                    className="block px-4 py-2 hover:underline"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route('profile.teacher')}
                                                    className="block px-4 py-2 hover:underline"
                                                >
                                                    <FiUser className="inline text-xl mr-2"/> Profile
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}
                                    <li>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            className="block px-4 py-2 hover:underline"
                                        >
                                            <FiLogOut className="inline text-xl mr-2" /> Logout
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                )}
            </header>

            {header && <header className="bg-white shadow">{header}</header>}

            <main>{children}</main>

            {/* Footer */}
            {/*<footer className="bg-blue-900 text-white py-4">*/}
            {/*    <div className="container mx-auto text-center">*/}
            {/*        <p>&copy; 2025 Hajee Mohammad Danesh Science and Technology University</p>*/}
            {/*    </div>*/}
            {/*</footer>*/}
        </div>
    );
}
