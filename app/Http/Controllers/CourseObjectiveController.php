<?php

namespace App\Http\Controllers;


use App\Models\Degree;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Course;
use App\Models\Teacher;
use App\Models\CourseObjective;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

use Barryvdh\DomPDF\Facade\Pdf;

class CourseObjectiveController extends Controller
{
    public function setSyllabus($courseCode): Response
    {
        $courseObjectives = \App\Models\CourseObjective::where('id', $courseCode)->get();
        return Inertia::render('Course/CourseObjective',[
            'courseCode' => $courseCode,
            'courseObjectives' => $courseObjectives,
        ]);
    }

    public function storeCourseObjective(Request $request, $courseCode)
    {
        $courseObjective = CourseObjective::create([
            'course_id' => $courseCode,
            'CO_ID' => $request->CO_ID,
            'CO_Description' => $request->CO_Description,
        ]);
        $courseObjectives = \App\Models\CourseObjective::where('course_id', $courseCode)->get();

        /*return Inertia::render('Course/CourseObjective',[
            'courseCode' => $courseCode,
            'courseObjectives' => $courseObjectives,
        ]);*/
        //return redirect()->back()->with('courseObjectives', $courseObjectives);
        return Redirect::route('courseObjectiveView',[
            'courseCode' => $courseCode,
            'courseObjectives' => $courseObjectives,
        ]);
    }

    public function EditCourseObjectiveView($co): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        $courseObjective = \App\Models\CourseObjective::where('id', $co)->first();
        return Inertia::render('Course/CourseObjectiveEdit',[
            'courseObjective' => $courseObjective,
        ]);
    }

    public function UpdateCourseObjective(Request $request, $co): RedirectResponse {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($request->input('CO_ID'));
        $courseObjective = \App\Models\CourseObjective::where('id', $co)->first();
        $courseObjective->CO_ID = $request->CO_ID;
        $courseObjective->CO_Description = $request->CO_Description;
        $courseObjective->save();
        return back();
    }

    public function deleteCourseObjective(Request $request, $co): RedirectResponse{
        $courseObjective = \App\Models\CourseObjective::findOrFail($co);
        $cc = $courseObjective->CourseCode;
        $courseObjective->delete();


        $courseObjectives = \App\Models\CourseObjective::where('CourseCode', $cc)->get();
        /*return Inertia::render('Course/CourseObjective',[
            'courseCode' => $cc,
            'courseObjectives' => $courseObjectives,
        ]);*/
        /*return Redirect::route('courseObjectiveView',[
            'courseCode' => $cc,
            'courseObjectives' => $courseObjectives,
        ]);*/
        return back()->with('success', 'deleted');
    }
}
