<?php

namespace App\Http\Controllers;

use App\Models\Degree;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Course;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function gotoAddCourse():Response
    {
        $departments = Department::all();
        $degrees = Degree::all();
        $courses = Course::with('degree','department')->get();
        return Inertia::render('AdminActivities/AddCourse', [
            'degrees' => $degrees,
            'departments' => $departments,
            'courses' => $courses,
        ]);
    }

    public function addCourse(Request $request): RedirectResponse
    {
        //dd($request);
        $request->validate([
            'courseCode' => 'required|string',
            'courseTitle' => 'required|string',
            'department_id' => 'required|integer',
            'degree_id' => 'required|integer',
            'credit' => 'required|numeric|min:0|max:500',
            'contactHourPerWeek' => 'required|numeric|min:0|max:500',
            'level' => 'required|string',
            'semester' => 'required|string',
            'academicSession' => 'required|string',
            'type' => 'required|string',
            'type_T_S' => 'required|string',
            'prerequisites' => 'string',
            'summary' => 'string',
        ]);

        Course::create([
            'courseCode' => $request->courseCode,
            'courseTitle' => $request->courseTitle,
            'department_id' => $request->department_id,
            'degree_id' => $request->degree_id,
            'credit' => $request->credit,
            'contactHourPerWeek' => $request->contactHourPerWeek,
            'level' => $request->level,
            'semester' => $request->semester,
            'academicSession' => $request->academicSession,
            'type' => $request->type,
            'type_T_S' => $request->type_T_S,
            'totalMarks' => 50.0 * ($request->credit),
            'instructor' => $request->instructor,
            'prerequisites' => $request->prerequisites,
            'summary' => $request->summary,
        ]);
        return redirect()->back();
//        try {
//            Course::create([
//                'courseCode' => $request->courseCode,
//                'courseTitle' => $request->courseTitle,
//                'department_id' => $request->department_id,
//                'degree_id' => $request->degree_id,
//                'credit' => $request->credit,
//                'contactHourPerWeek' => $request->contactHourPerWeek,
//                'level' => $request->level,
//                'semester' => $request->semester,
//                'academicSession' => $request->academicSession,
//                'type' => $request->type,
//                'type_T_S' => $request->type_T_S,
//                'totalMarks' => $request->totalMarks,
//                'instructor' => $request->instructor,
//                'prerequisites' => $request->prerequisites,
//                'summary' => $request->summary,
//            ]);
//            return redirect()->back();
//        } catch (\Exception $e) {
//            return redirect()->back();
//        }
    }


    public function gotoOBE_Items($id): Response
    {
        $course = Course::where('id', $id)->first();
        return Inertia::render('Course/OBE_Items', [
            'course' => $course,
        ]);
    }

}
