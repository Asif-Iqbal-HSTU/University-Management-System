<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProgramLearningOutcome extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function courseLearningOutcomes(): BelongsToMany
    {
        return $this->belongsToMany(CourseLearningOutcome::class,
            'course_learning_outcome_program_learning_outcome'
        );
    }
}
