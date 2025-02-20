<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Faculty extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function departments(): HasMany
    {
        return $this->hasMany(Department::class);
    }

    public function degrees(): HasMany
    {
        return $this->hasMany(Degree::class);
    }

    public function teachers(): HasMany
    {
        return $this->hasMany(Teacher::class);
    }

    public function student(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public function dean(): HasOne
    {
        return $this->hasOne(Dean::class);
    }
}
