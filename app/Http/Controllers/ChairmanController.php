<?php

namespace App\Http\Controllers;

use App\Models\Degree;
use App\Models\Department;
use App\Models\User;
use App\Models\Chairman;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChairmanController extends Controller
{
    public function gotoAddChairman():Response
    {
        $departments = Department::all();
//        $teachers = User::where('role', "teacher")->get();
        $teachers = Teacher::with('user')->get();
        $chairmen = Chairman::with('teacher.user','department')->get();
//        $degrees = Degree::with('faculty')->get();
        return Inertia::render('AdminActivities/AddChairman', [
            'departments' => $departments,
            'teachers' => $teachers,
            'chairmen' => $chairmen,
        ]);
    }

    public function addChairman(Request $request): RedirectResponse
    {
        $request->validate([
            'department_id' => 'required|integer|max:255',
            'teacher_id' => 'required|integer|max:255',
            'chairman_message' => 'string',
        ]);

        try {
            Chairman::create([
                'department_id' => $request->department_id,
                'teacher_id' => $request->teacher_id,
                'chairman_message' => $request->chairman_message,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }
}
