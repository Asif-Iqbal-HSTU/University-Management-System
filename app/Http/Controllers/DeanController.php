<?php

namespace App\Http\Controllers;

use App\Models\Chairman;
use App\Models\Dean;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DeanController extends Controller
{
    public function gotoAddDean():Response
    {
        $faculties = Faculty::all();
        $teachers = Teacher::with('user')->get();
        $deans = Dean::with('teacher.user','faculty')->get();
        return Inertia::render('AdminActivities/AddDean', [
            'faculties' => $faculties,
            'teachers' => $teachers,
            'deans' => $deans,
        ]);
    }

    public function addDean(Request $request): RedirectResponse
    {
        $request->validate([
            'faculty_id' => 'required|integer|max:255',
            'teacher_id' => 'required|integer|max:255',
            'dean_message' => 'string',
        ]);

        try {
            Dean::create([
                'faculty_id' => $request->faculty_id,
                'teacher_id' => $request->teacher_id,
                'dean_message' => $request->dean_message,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }
}
