<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssessmentTeacher extends Model
{
    protected $fillable = [
        'section_id',
        'user_id',
        'school_year_id',
    ];
    public function section()
    {
        return $this->belongsTo(Section::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }
}
