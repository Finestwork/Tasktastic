<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Todo extends Model
{

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'progress_id'
    ];

    /*
     * ==================
     * Relations
     * ==================
     */

    public function checklists(): HasMany
    {
        return $this->hasMany(Checklist::class, 'todo_id');
    }

    public function progress(): BelongsTo
    {
        return $this->belongsTo(Progress::class, 'progress_id');
    }
}
