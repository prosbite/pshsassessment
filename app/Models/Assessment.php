<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = [
        'firstName',
        'lastName',
        'entryCode',
        'assessment',
    ];
    protected $casts = [
        'assessment' => 'array',
    ];

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class, 'enrollment_id');
    }
}
