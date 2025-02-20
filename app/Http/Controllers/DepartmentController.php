<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function gotoAddDepartment():Response
    {
        $faculties = Faculty::all();
        $departments = Department::all();
        return Inertia::render('AdminActivities/AddDepartment', [
            'faculties' => $faculties,
            'departments' => $departments,
        ]);
    }

    public function addDepartment(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'dept_code' => 'required|string|max:255',
            'faculty_id' => 'required|integer|max:255',
        ]);

        try {
            Department::create([
                'name' => $request->name,
                'dept_code' => $request->dept_code,
                'faculty_id' => $request->faculty_id,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }
}
