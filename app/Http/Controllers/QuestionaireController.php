<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Assessment;

class QuestionaireController extends Controller
{
    public function index()
    {
        return Inertia::render('AssessmentQuestionaire');
    }

    public function store(Request $request)
    {
        $request->validate([
            'lastName' => 'required',
            'firstName' => 'required',
            'entryCode' => 'required',
        ]);
        $assessment = Assessment::where('firstName', $request->firstName)
                ->where('lastName', $request->lastName)
                ->first();
    if ($assessment) {
        // Update existing
        $assessment->assessment = $request->assessment;
        $assessment->save();
    } else {
        // Create new
        $assessment = Assessment::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'entryCode' => $request->entryCode,
            'assessment' => $request->assessment,
        ]);
    }

    return redirect()->route('questionaire')
                         ->with(['udata' => $assessment]);
    }

    public function complete()
    {
        return Inertia::render('AssessmentComplete');
    }

    public function results()
    {
        $assessment = Assessment::with(['enrollment.learner', 'enrollment.section.gradeLevel'])
            ->orderBy('lastName')
            ->where('entryCode', 'diagnostic-2025')
            ->get();
        return Inertia::render('AssessmentResults')->with(['assessment' => $assessment]);
    }

    public function assessmentLog()
    {
        $assessment = Assessment::whereDate('created_at', date('Y-m-d'))->orderBy('lastName')->paginate(25);
        return Inertia::render('StudentLog')->with(['students' => $assessment]);
    }
}
