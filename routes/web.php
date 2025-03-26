<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DegreeController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\ChairmanController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\DeanController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\HallSeatApplicationController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DistributionController;
use App\Http\Controllers\CourseObjectiveController;
use App\Http\Controllers\SeatAllocationController;
use App\Http\Controllers\DatabaseStructureController;
use \App\Http\Middleware\TeacherMiddleware;
use \App\Http\Middleware\StudentMiddleware;
use \App\Http\Middleware\AdminMiddleware;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {

    $user = Auth::user();
    $s_id = "";
    if($user)
    {
        if($user->role === "student")
        {
            $user_id = $user->id;
            $st = User::find($user_id)->student;
            $s_id = $st->SID;
        }
    }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        's_id' => $s_id,
    ]);
})->name('root');

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/teacher', [DashboardController::class, 'gotoTeacherDashboard'])
    ->middleware(['auth', 'verified'])->name('teacherDashboard')->middleware(TeacherMiddleware::class);

Route::get('/dashboard/student', [DashboardController::class, 'gotoStudentDashboard'])
    ->middleware(['auth', 'verified'])->name('studentDashboard')->middleware(StudentMiddleware::class);

Route::get('/dashboard/admin', [DashboardController::class, 'gotoAdminDashboard'])
    ->middleware(['auth', 'verified'])->name('adminDashboard')->middleware(AdminMiddleware::class);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(AdminMiddleware::class)->group(function () {
        Route::get('/profile/admin', [ProfileController::class, 'adminProfile'])->name('profile.admin');
        Route::get('/faculty/add', [FacultyController::class, 'gotoAddFaculty'])->name('faculty.add');
        Route::post('/faculty/add', [FacultyController::class, 'addFaculty'])->name('faculty.add');
        Route::get('/department/add', [DepartmentController::class, 'gotoAddDepartment'])->name('department.add');
        Route::post('/department/add', [DepartmentController::class, 'addDepartment'])->name('department.add');
        Route::get('/degree/add', [DegreeController::class, 'gotoAddDegree'])->name('degree.add');
        Route::post('/degree/add', [DegreeController::class, 'addDegree'])->name('degree.add');
        Route::get('/hall/add', [HallController::class, 'gotoAddHall'])->name('hall.add');
        Route::post('/hall/add', [HallController::class, 'addHall'])->name('hall.add');
        Route::get('/building/add', [BuildingController::class, 'gotoAddBuilding'])->name('building.add');
        Route::post('/building/add', [BuildingController::class, 'addBuilding'])->name('building.add');
        Route::get('/hall/super/add', [HallController::class, 'gotoAddHallSuper'])->name('hall.super.add');
        Route::post('/hall/super/add', [HallController::class, 'addHallSuper'])->name('hall.super.add');
        Route::get('/designation/add', [DesignationController::class, 'gotoAddDesignation'])->name('designation.add');
        Route::post('/designation/add', [DesignationController::class, 'addDesignation'])->name('designation.add');
        Route::get('/teacher/add', [TeacherController::class, 'gotoAddTeacher'])->name('teacher.add');
        Route::post('/teacher/add', [TeacherController::class, 'addTeacher'])->name('teacher.add');
        Route::get('/chairman/add', [ChairmanController::class, 'gotoAddChairman'])->name('chairman.add');
        Route::post('/chairman/add', [ChairmanController::class, 'addChairman'])->name('chairman.add');
        Route::get('/dean/add', [DeanController::class, 'gotoAddDean'])->name('dean.add');
        Route::post('/dean/add', [DeanController::class, 'addDean'])->name('dean.add');
        Route::get('/course/add', [CourseController::class, 'gotoAddCourse'])->name('course.add');
        Route::post('/course/add', [CourseController::class, 'addCourse'])->name('course.add');
        Route::get('/course/assign', [DistributionController::class, 'gotoAssignCourse'])->name('course.assign');
        Route::post('/course/assign', [DistributionController::class, 'assignCourseToTeacher'])->name('course.assign');

        Route::get('/view/hall/seat/application', [HallSeatApplicationController::class, 'getSeatApplications'])->name('view.hall.seat.application');
    });

    Route::middleware(TeacherMiddleware::class)->group(function () {
        Route::get('/notice/add', [NoticeController::class, 'gotoAddNotice'])->name('notice.add');
        Route::post('/notice/add', [NoticeController::class, 'addNotice'])->name('notice.add');
        Route::get('/hall/activities', [HallSeatApplicationController::class, 'gotoHallActivities'])->name('hall.activities');
        Route::get('/view/hall/seat/application', [HallSeatApplicationController::class, 'getSeatApplications'])->name('view.hall.seat.application');
        Route::get('/available-rooms/{hall_id}', [SeatAllocationController::class, 'getAvailableRooms'])->name('rooms.available');
        Route::get('/get-rooms/{hall_id}', [SeatAllocationController::class, 'getRooms'])->name('get.rooms');
        Route::get('/get-hall-students/{hall_id}', [SeatAllocationController::class, 'getStudents'])->name('get.hall.students');
        Route::post('/allocate-student/{applicationID}', [SeatAllocationController::class, 'allocateStudent'])->name('student.allocate');
        Route::get('/reject-student/{applicationID}', [SeatAllocationController::class, 'rejectStudent'])->name('student.reject');

        Route::get('/profile/teacher', [ProfileController::class, 'teacherProfile'])->name('profile.teacher');
        Route::get('/teacher/courses/{id}', [DistributionController::class, 'getTeacherCourses'])->name('teacher.courses');

        Route::get('/OBE_Items/{id}', [CourseController::class, 'gotoOBE_Items'])->name('OBE_Items');
        //CO
        Route::get('/set-syllabus/{courseCode}', [CourseObjectiveController::class, 'setSyllabus'])->name('courseObjectiveView');
        Route::post('/set-syllabus/co/{courseCode}', [CourseObjectiveController::class, 'storeCourseObjective'])->name('set-syllabus-route.co');

        Route::get('/edit/co/{co}', [CourseObjectiveController::class, 'EditCourseObjectiveView'])->name('EditCourseObjective');
        Route::post('/update/co/{co}', [CourseObjectiveController::class, 'UpdateCourseObjective'])->name('UpdateCourseObjective');
        Route::delete('/delete/co/{co}', [CourseObjectiveController::class, 'deleteCourseObjective'])->name('deleteCourseObjective');

    });

    Route::middleware(StudentMiddleware::class)->group(function () {
        Route::get('/profile/edit/student', [ProfileController::class, 'gotoStudentProfileEdit'])->name('student.edit');
        Route::post('/profile/edit/student', [ProfileController::class, 'studentProfileEdit'])->name('student.edit');
        Route::get('/notice/student', [NoticeController::class, 'gotoStudentNoticeBoard'])->name('student.noticeboard');
        Route::get('/hall/seat/application', [HallSeatApplicationController::class, 'gotoSeatApplication'])->name('hall.seat.application');
        Route::post('/hall/seat/application', [HallSeatApplicationController::class, 'seatApplication'])->name('hall.seat.application');
    });

});

Route::get('/student/register', [StudentController::class, 'gotoAddStudent'])->name('student.add');
Route::post('/student/register', [StudentController::class, 'addStudent'])->name('student.add');


Route::get('/profile/student/{s_id}', [ProfileController::class, 'studentProfile'])->name('profile.student');
Route::get('/download-table-structures', [DatabaseStructureController::class, 'generateTableStructure']);
require __DIR__.'/auth.php';
