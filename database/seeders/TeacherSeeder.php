<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Faculty;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Teacher;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        $faculty = Faculty::where('name', 'Faculty of Computer Science and Engineering')->first();
        $department = Department::where('name', 'Dept. of Computer Science and Engineering')->first();
        $designation = Designation::where('name', 'Professor')->first();

        $teachers = [
            [
                'name' => 'Dr. Md. Abdulla Al Mamun',
                'email' => 'mamun@hstu.ac.bd',
                'phone' => '+8801886890345',
                'username' => 'mamun',
            ],
            [
                'name' => 'Adiba Mahjabin Nitu',
                'email' => 'nitu.hstu@gmail.com',
                'phone' => '+8801716407820',
                'username' => 'nitu',
            ],
            [
                'name' => 'Dr. Md. Delowar Hossain',
                'email' => 'delowar.cit@gmail.com',
                'phone' => '+8801712262634',
                'username' => 'delowar',
            ],
        ];

        foreach ($teachers as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'username' => $data['username'],
                'password' => Hash::make('12341234'),
                'role' => 'teacher',
                'dob' => null,
                'nationality' => null,
                'nid_no' => null,
                'blood_group' => null,
            ]);

            Teacher::create([
                'user_id' => $user->id,
                'faculty_id' => $faculty->id,
                'department_id' => $department->id,
                'designation_id' => $designation->id,
                'career_obj' => null,
            ]);
        }
    }
}
