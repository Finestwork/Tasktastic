<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Checklist extends Model
{
    protected $fillable = ['todo_id', 'name'];

    /*
     * ================
     * Relations
     * ================
     */

    public function todo(): BelongsTo
    {
        return $this->belongsTo(Todo::class, 'todo_id');
    }
}
