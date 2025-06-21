<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;
use App\Models\Degree;

class DegreeSeeder extends Seeder
{
    public function run(): void
    {
        $degreeData = [
            'Faculty of Agriculture' => [
                ['B. Sc in Agriculture (Hons.)', 183],
            ],
            'Faculty of Computer Science and Engineering' => [
                ['B. Sc. (Engineering) in Computer Science and Engineering', 155.5],
                ['B. Sc. (Engineering) in Electrical and Electronic Engineering', 159.5],
                ['B. Sc. (Engineering) in Electronics and Communication Engineering', 155.75],
            ],
            'Faculty of Fisheries' => [
                ['B. Sc in Fisheries (Hons.)', 163.00],
            ],
            'Faculty of Veterinary and Animal Science' => [
                ['Doctor of Veterinary Medicine', 197.00],
            ],
            'Faculty of Business Studies' => [
                ['BBA in Accounting and Information System', null],
                ['BBA in Management', null],
                ['BBA in Marketing', null],
                ['BBA in Finance', null],
            ],
            'Faculty of Engineering' => [
                ['B.Sc. in Food and Process Engineering', 157.00],
                ['B. Sc. in Agricultural Engineering', null],
                ['Bachelor of Architecture', null],
                ['B. Sc. in Civil Engineering', null],
                ['B. Sc. in Mechanical Engineering', null],
            ],
            'Faculty of Science' => [
                ['B.Sc. (Hons) in Chemistry', null],
                ['B. Sc. (Hons) in Physics', null],
                ['B. Sc. (Hons) in Mathematics', null],
                ['B. Sc. (Hons) in Statistics', null],
            ],
            'Faculty of Social Science and Humanities' => [
                ['B.S.S. (Hons) in Sociology', null],
                ['B.A. (Hons) in English', 150.00],
                ['B.S.S. (Hons) in Economics', null],
                ['B.S.S. (Hons) in Development Studies', null],
            ],
        ];

        foreach ($degreeData as $facultyName => $degrees) {
            $faculty = Faculty::where('name', $facultyName)->first();

            if ($faculty) {
                foreach ($degrees as [$degreeName, $creditHours]) {
                    Degree::create([
                        'name' => $degreeName,
                        'faculty_id' => $faculty->id,
                        'credit_hours' => $creditHours,
                    ]);
                }
            }
        }
    }
}
