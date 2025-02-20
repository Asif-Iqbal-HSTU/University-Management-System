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

    public function getSeatApplications(): Response
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

            $applications = HallSeatApplication::with([
                'student', // Load the student relationship
                'student.user.address', // Load user and address of the student
                'student.hall', // Load the hall of the student
                'student.hall.building', // Load the hall of the student
                'student.cgpa', // Load the CGPA of the student
                'student.guardian', // Load the guardian of the student
                'student.degree', // Load the degree of the student
            ])->whereHas('student', function ($query) use ($hall_id) {
                $query->where('hall_id', $hall_id);
            })->where('status', "pending")->get();
        }
        elseif($user_role == 'hallStaff')
        {
            $hallStaff = User::find($user_id)->hallStaff;
            $hall_id = $hallStaff->hall_id;

            $applications = HallSeatApplication::with([
                'student', // Load the student relationship
                'student.user.address', // Load user and address of the student
                'student.hall', // Load the hall of the student
                'student.hall.building', // Load the hall of the student
                'student.cgpa', // Load the CGPA of the student
                'student.guardian', // Load the guardian of the student
                'student.degree', // Load the degree of the student
            ])->whereHas('student', function ($query) use ($hall_id) {
                $query->where('hall_id', $hall_id);
            })->where('status', "pending")->get();
        }
        else{
            $applications = [];
        }

        return Inertia::render('AdminActivities/ViewSeatApplications', [
            'applications' => $applications,
        ]);
    }


}
