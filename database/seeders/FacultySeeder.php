<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        $faculties = [
            'Faculty of Agriculture',
            'Faculty of Computer Science and Engineering',
            'Faculty of Business Studies',
            'Faculty of Fisheries',
            'Faculty of Veterinary and Animal Science',
            'Faculty of Engineering',
            'Faculty of Science',
            'Faculty of Social Science and Humanities',
        ];

        foreach ($faculties as $faculty) {
            Faculty::create([
                'name' => $faculty,
                'short_name' => strtoupper(preg_replace('/[^A-Z]/', '', $faculty)), // Creates short names like FOA, FBSH etc.
            ]);
        }
    }
}
