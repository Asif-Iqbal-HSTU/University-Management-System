<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Notice;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class NoticeController extends Controller
{
    public function gotoAddNotice():Response
    {
        return Inertia::render('HallActivities/AddNotice');
    }

    public function addNotice(Request $request): RedirectResponse
    {
//        dd($request);
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:start_date',
//            'role' => 'required|string',
//            'category' => 'required|string',
        ]);

        $user = Auth::user();
        $user_id = $user->id;
        $user_role = $user->role;


        $teacher = User::find($user_id)->teacher;
        $teacher_id = $teacher->id;
        $hall_super = Teacher::find($teacher_id)->hallSuper;
        $hall_id = $hall_super->hall_id;

        //dd($hall_id);

//        Notice::create([
//            'title' => $request->title,
//            'description' => $request->description,
//            'start_date' => $request->start_date,
//            'end_date' => $request->end_date,
//            'role' => $request->role,
//            'category' => $request->category,
//        ]);
//        return redirect()->back();
        try {
            $notice = Notice::create([
                'hall_id' => $hall_id,
                'title' => $request->title,
                'description' => $request->description,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
//                'role' => $request->role,
//                'category' => $request->category,
            ]);
            //dd($notice);
            return redirect()->back();

        } catch (\Exception $e) {
            //dd($e->getMessage());
            return redirect()->back();
        }
    }

    public function gotoStudentNoticeBoard():Response
    {
        $user = Auth::user();
        $user_id = $user->id;
        $student = User::find($user_id)->student;
        $s_id = $student->SID;
        $hall_id = $student->hall_id;
        $hallNotices = Notice::where('hall_id', $hall_id)->get();
        return Inertia::render('StudentActivities/NoticeBoard',[
                'hallNotices' => $hallNotices,
                's_id' => $s_id,
            ]
        );
    }
}
