<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\HallSeatApplication;
use App\Models\Hallsuper;
use App\Models\Room;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class HallSeatApplicationController extends Controller
{
    public function gotoSeatApplication():Response
    {
        $user = Auth::user();
        $user_id = $user->id;
        $st = User::find($user_id)->student;
        $s_id = $st->SID;
        $student = Student::where('id', $st->id)->with('faculty', 'degree', 'hall')->first();
        $user = User::with('gender')->find(auth()->id());
        $cgpa = Student::find($st->id)->cgpa;
//        $guardian = Guardian::where('student_id', $st->id)->first();
        $guardian = Student::find($st->id)->guardian;
        $address = User::find($user_id)->address;
        $application = HallSeatApplication::where('student_id', $st->id)->first();
        //dd($guardian);
        return Inertia::render('StudentActivities/HallSeatApplication', [
            'student' => $student,
            'user' => $user,
            'cgpa' => $cgpa,
            'guardian' => $guardian,
            'address' => $address,
            'application' => $application,
            's_id' => $s_id,
        ]);
    }


    public function seatApplication(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $user_id = $user->id;
        $st = User::find($user_id)->student;
        $student_id = $st->id;
        $currentDate = Carbon::now();

        try {
            HallSeatApplication::create([
                'student_id' => $student_id,
                'application_date' => $currentDate,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }

    public function gotoHallActivities():Response
    {
        $user = Auth::user();
        $user_id = $user->id;
        $user_role = $user->role;

        if($user_role == 'teacher')
        {
            $teacher = User::find($user_id)->teacher;
            $teacher_id = $teacher->id;
            $hall_super = Teacher::find($teacher_id)->hallSuper;
            $hall_id = $hall_super->hall_id;
        }
        $hall = Hall::where('id', $hall_id)->first();
        return Inertia::render('HallActivities/HallActivities', [
            'hall' => $hall,
        ]);
    }

//    public function getSeatApplications(): Response
//    {
//        $user = Auth::user();
//        $user_role = $user->role;
//        $hall_id = null;
//
//        if ($user_role == 'teacher' && $user->teacher?->hallSuper) {
//            $hall_id = $user->teacher->hallSuper->hall_id;
//        } elseif ($user_role == 'hallStaff' && $user->hallStaff) {
//            $hall_id = $user->hallStaff->hall_id;
//        }
//
//        // If no hall ID is found, return an empty response.
//        if (!$hall_id) {
//            return Inertia::render('HallActivities/ViewSeatApplications', [
//                'applications' => [],
//            ]);
//        }
//
//        // Fetch seat applications for the respective hall
//        $applications = HallSeatApplication::with([
//            'student',
//            'student.user.address',
//            'student.hall',
//            'student.hall.building',
//            'student.cgpa',
//            'student.guardian',
//            'student.degree',
//        ])->whereHas('student', function ($query) use ($hall_id) {
//            $query->where('hall_id', $hall_id);
//        })->where('status', "pending")->get();
//
//        // Format applications with profile image
//        $applications = $applications->map(function ($application) {
//            $application->student->profile_image = $application->student->image
//                ? asset('storage/public/' . $application->student->image)
//                : null;
//            return $application;
//        });
//
////        dd($applications);
//
//        return Inertia::render('HallActivities/ViewSeatApplications', [
//            'applications' => $applications,
//        ]);
//    }

//    public function getSeatApplications(): Response
//    {
//        $user = Auth::user();
//        $user_role = $user->role;
//        $hall_id = null;
//
//        if ($user_role == 'teacher' && $user->teacher?->hallSuper) {
//            $hall_id = $user->teacher->hallSuper->hall_id;
//        } elseif ($user_role == 'hallStaff' && $user->hallStaff) {
//            $hall_id = $user->hallStaff->hall_id;
//        }
//
//        if (!$hall_id) {
//            return Inertia::render('HallActivities/ViewSeatApplications', [
//                'applications' => [],
//                'sessions' => [], // Send empty sessions if no hall is found
//            ]);
//        }
//
//        // Fetch distinct session years dynamically
//        $sessions = Student::where('hall_id', $hall_id)
//            ->select('session_year')
//            ->distinct()
//            ->orderBy('session_year', 'desc')
//            ->pluck('session_year');
//
//        $applications = HallSeatApplication::with([
//            'student',
//            'student.user.address',
//            'student.hall',
//            'student.hall.building',
//            'student.cgpa',
//            'student.guardian',
//            'student.degree',
//        ])->whereHas('student', function ($query) use ($hall_id) {
//            $query->where('hall_id', $hall_id);
//        })->where('status', "pending")->get();
//
//        // Format applications with profile image
//        $applications = $applications->map(function ($application) {
//            $application->student->profile_image = $application->student->image
//                ? asset('storage/public/' . $application->student->image)
//                : null;
//            return $application;
//        });
//
//        return Inertia::render('HallActivities/ViewSeatApplications', [
//            'applications' => $applications,
//            'sessions' => $sessions, // Send session data
//        ]);
//    }

//    public function getSeatApplications(): Response
//    {
//        $user = Auth::user();
//        $user_role = $user->role;
//        $hall_id = null;
//
//        if ($user_role == 'teacher' && $user->teacher?->hallSuper) {
//            $hall_id = $user->teacher->hallSuper->hall_id;
//        } elseif ($user_role == 'hallStaff' && $user->hallStaff) {
//            $hall_id = $user->hallStaff->hall_id;
//        }
//
//        if (!$hall_id) {
//            return Inertia::render('HallActivities/ViewSeatApplications', [
//                'applications' => [],
//                'sessionYears' => [],
//            ]);
//        }
//
//        // Fetch seat applications for the respective hall
//        $applications = HallSeatApplication::with([
//            'student',
//            'student.user.address',
//            'student.hall',
//            'student.hall.building',
//            'student.cgpa',
//            'student.guardian',
//            'student.degree',
//        ])->whereHas('student', function ($query) use ($hall_id) {
//            $query->where('hall_id', $hall_id);
//        })->where('status', "pending")->get();
//
//        // Format applications with profile image
//        $applications = $applications->map(function ($application) {
//            $application->student->profile_image = $application->student->image
//                ? asset('storage/public/' . $application->student->image)
//                : null;
//            return $application;
//        });
//
//        // Get distinct session years from students table
//        $sessionYears = Student::distinct()->pluck('session_year')->sortDesc()->values();
//
//        return Inertia::render('HallActivities/ViewSeatApplications', [
//            'applications' => $applications,
//            'sessionYears' => $sessionYears,
//        ]);
//    }

    public function getSeatApplications(): Response
    {
        $user = Auth::user();
        $user_role = $user->role;
        $hall_id = null;

        if ($user_role == 'teacher' && $user->teacher?->hallSuper) {
            $hall_id = $user->teacher->hallSuper->hall_id;
        } elseif ($user_role == 'hallStaff' && $user->hallStaff) {
            $hall_id = $user->hallStaff->hall_id;
        }

        if (!$hall_id) {
            return Inertia::render('HallActivities/ViewSeatApplications', [
                'applications' => [],
                'sessions' => []
            ]);
        }

        // Fetch seat applications for the respective hall
        $applications = HallSeatApplication::with([
            'student',
            'student.user.address',
            'student.hall',
            'student.hall.building',
            'student.cgpa',
            'student.guardian',
            'student.degree',
        ])->whereHas('student', function ($query) use ($hall_id) {
            $query->where('hall_id', $hall_id);
        })->where('status', "pending")->get();

        // Format applications with profile image
        $applications = $applications->map(function ($application) {
            $application->student->profile_image = $application->student->image
                ? asset('storage/public/' . $application->student->image)
                : null;
            return $application;
        });

        // Fetch unique sessions from applications
//        $sessions = HallSeatApplication::with('student')
//            ->whereHas('student', function ($query) use ($hall_id) {
//                $query->where('hall_id', $hall_id);
//            })
//            ->where('status', "pending")
//            ->pluck('student.session_year')
//            ->unique()
//            ->values();

        $sessions = Student::where('hall_id', $hall_id)
            ->select('session_year')
            ->distinct()
            ->orderBy('session_year', 'desc')
            ->pluck('session_year');


        return Inertia::render('HallActivities/ViewSeatApplications', [
            'applications' => $applications,
            'sessions' => $sessions, // Pass sessions to frontend
        ]);
    }



}
