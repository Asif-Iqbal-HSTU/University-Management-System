<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departmentData = [
            'Faculty of Agriculture' => [
                ['Dept. of Agronomy', 'AGRO'],
                ['Dept. of Horticulture', 'HORT'],
                ['Dept. of Soil Science', 'SOIL'],
                ['Dept. of Entomology', 'ENTO'],
                ['Dept. of Plant Pathology', 'PLPA'],
                ['Dept. of Genetics & Plant Breeding', 'GPB'],
                ['Dept. of Crop Physiology & Ecology', 'CPE'],
                ['Dept. of Agricultural Extension', 'AGEX'],
                ['Dept. of Agricultural Chemistry', 'AGCH'],
                ['Dept. of Agroforestry And Environment', 'AFE'],
                ['Dept. of Biochemistry & Molecular Biology', 'BMB'],
            ],
            'Faculty of Computer Science and Engineering' => [
                ['Dept. of Computer Science and Engineering', 'CSE'],
                ['Dept. of Electrical and Electronic Engineering', 'EEE'],
                ['Dept. of Electronics and Communication Engineering', 'ECE'],
            ],
            'Faculty of Business Studies' => [
                ['Dept. of Accounting', 'ACC'],
                ['Dept. of Finance and Banking', 'FIN'],
                ['Dept. of Management', 'MGT'],
                ['Dept. of Marketing', 'MKT'],
            ],
            'Faculty of Fisheries' => [
                ['Dept. of Fisheries Biology & Genetics', 'FBG'],
                ['Dept. of Fisheries Management', 'FMG'],
                ['Dept. of Fisheries Technology', 'FT'],
                ['Dept. of Aquaculture', 'AQUA'],
            ],
            'Faculty of Veterinary and Animal Science' => [
                ['Dept. of Microbiology', 'MICRO'],
                ['Dept. of Pathology & Parasitology', 'PATH'],
                ['Dept. of Dairy & Poultry Science', 'DPS'],
                ['Dept. of Anatomy & Histology', 'ANAT'],
                ['Dept. of Animal Science & Nutrition', 'ASN'],
                ['Dept. of Genetics & Animal Breeding', 'GAB'],
                ['Dept. of Medicine, Surgery and Obstetrics', 'MSO'],
                ['Dept. of Physiology & Pharmacology', 'PP'],
            ],
            'Faculty of Engineering' => [
                ['Dept. of Agricultural & Industrial Engineering', 'AIE'],
                ['Dept. of Food Processing & Preservation', 'FPP'],
                ['Dept. of Food Engineering & Technology', 'FET'],
                ['Dept. of Food Science & Nutrition', 'FSN'],
                ['Dept. of Architecture', 'ARCH'],
                ['Dept. of Civil Engineering', 'CE'],
                ['Dept. of Mechanical Engineering', 'ME'],
            ],
            'Faculty of Science' => [
                ['Dept. of Chemistry', 'CHEM'],
                ['Dept. of Physics', 'PHY'],
                ['Dept. of Mathematics', 'MATH'],
                ['Dept. of Statistics', 'STAT'],
            ],
            'Faculty of Social Science and Humanities' => [
                ['Dept. of English', 'ENG'],
                ['Dept. of Economics', 'ECO'],
                ['Dept. of Sociology', 'SOC'],
                ['Dept. of Development Studies', 'DS'],
            ],
        ];

        foreach ($departmentData as $facultyName => $departments) {
            $faculty = Faculty::where('name', $facultyName)->first();

            foreach ($departments as [$deptName, $deptCode]) {
                Department::create([
                    'name' => $deptName,
                    'dept_code' => $deptCode,
                    'faculty_id' => $faculty->id,
                ]);
            }
        }
    }
}
