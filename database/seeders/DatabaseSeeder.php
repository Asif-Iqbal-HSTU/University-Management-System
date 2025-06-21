<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'phone' => '12341234',
            'username' => 'admin',
            'password' => Hash::make('12341234'),
            'role' => 'admin',
            'dob' => null,
            'nationality' => null,
            'nid_no' => null,
            'blood_group' => null,
        ]);

        $this->call([
            FacultySeeder::class,
            DepartmentSeeder::class,
            DegreeSeeder::class,
            DesignationSeeder::class,
            TeacherSeeder::class,
        ]);
    }
}
