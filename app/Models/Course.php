<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function degree(): BelongsTo
    {
        return $this->belongsTo(Degree::class);
    }

    public function courseObjectives(): HasMany
    {
        return $this->hasMany(CourseObjective::class);
    }

    public function courseLearningOutcomes(): HasMany
    {
        return $this->hasMany(CourseLearningOutcome::class);
    }

    public function courseContents(): HasMany
    {
        return $this->hasMany(CourseContent::class);
    }

    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(Teacher::class,
            'teacher_course'
        );
    }

    public function referenceBooks(): BelongsToMany
    {
        return $this->belongsToMany(ReferenceBooks::class);
    }
}
