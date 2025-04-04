<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notice extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];
    //VVI
    //This notices only for hall purposes

    public function hall(): BelongsTo
    {
        return $this->belongsTo(Hall::class);
    }
}
