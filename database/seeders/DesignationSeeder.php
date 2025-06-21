<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Designation;

class DesignationSeeder extends Seeder
{
    public function run(): void
    {
        $designations = [
            'Lecturer',
            'Assistant Professor',
            'Associate Professor',
            'Professor',
        ];

        foreach ($designations as $designation) {
            Designation::create([
                'name' => $designation,
            ]);
        }
    }
}
