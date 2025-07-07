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

    return redirect()->route('assessment-complete')
                         ->with(['udata' => $assessment]);
    }

    public function complete()
    {
        return Inertia::render('AssessmentComplete');
    }
}
