<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Designation;
use App\Models\Faculty;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\Course;
use Inertia\Inertia;
use Inertia\Response;

class DistributionController extends Controller
{
    public function gotoAssignCourse():Response
    {
        $teachers = Teacher::with('faculty','department','user','designation')->get();
        $courses = Course::all();
        return Inertia::render('AdminActivities/AssignTeacherToCourse', [
            'courses' => $courses,
            'teachers' => $teachers,
        ]);
    }
    public function assignCourseToTeacher(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'course_id' => 'required|exists:courses,id',
            'section' => 'nullable|string',
            'lessons' => 'nullable|string',
        ]);

        $teacher = Teacher::find($request->teacher_id);
        $teacher->courses()->attach($request->course_id, [
            'section' => $request->section,
            'lessons' => $request->lessons,
        ]);

        return response()->json(['message' => 'Course assigned to teacher successfully.']);
    }

    public function getTeacherCourses($id): Response
    {
        $teacher = User::find($id)->teacher;
        $teacher_id = $teacher->id;
        //dd($teacher);
        $courses = Teacher::find($teacher_id)->courses()->orderBy('courseTitle')->get();
        return Inertia::render('TeacherActivities/CourseForOBE', [
            'teacher' => $teacher,
            'courses' => $courses,
        ]);
    }


}
