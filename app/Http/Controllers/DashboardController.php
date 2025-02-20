<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Teacher;
use App\Models\Notice;
use Carbon\Carbon;

class DashboardController extends Controller
{
    //
    public function gotoTeacherDashboard():Response
    {
        $user = Auth::User();
        $user_id = $user->id;
        $teacher = User::find($user_id)->teacher;
        $teacher_id = $teacher->id;
        //dd($teacher);
        $courses = Teacher::find($teacher_id)->courses()->orderBy('courseTitle')->get();
        $hall_super = Teacher::find($teacher_id)->hallSuper;
        $hall_id = $hall_super->hall_id;

        return Inertia::render('Dashboards/Teacher', [
            'teacher' => $teacher,
            'courses' => $courses,
            'hall_super' => $hall_super,
        ]);
    }

    public function gotoAdminDashboard():Response
    {
        $user = Auth::User();
        $user_id = $user->id;
        return Inertia::render('Dashboards/Admin', [
            'user_id' => $user_id,
        ]);
    }
    public function gotoStudentDashboard():Response
    {
        $user = Auth::user();
        $user_id = $user->id;
        $st = User::find($user_id)->student;
        $s_id = $st->SID;
        //dd($s_id);
        // Get current date
//        use Carbon\Carbon;
        $currentDate = Carbon::now();

        // Fetch notices where end_date is later than the current date
        $notices = Notice::where('end_date', '>', $currentDate)->get();

        return Inertia::render('Dashboards/Student', [
            'user_id' => $user_id,
            'notices' => $notices,
            's_id' => $s_id,
        ]);
    }
}
