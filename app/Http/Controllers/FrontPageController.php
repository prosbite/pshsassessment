<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Assessment;

class FrontPageController extends Controller
{
    public function index()
    {
        return Inertia::render('AssessmentFront');
    }

    public function checkUser(Request $request)
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
            return redirect()->route('questionaire')
                            ->with(['udata' => $assessment]);
        }
        $assessment = Assessment::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'entryCode' => $request->entryCode,
            'assessment' => $request->assessment,
        ]);
        return redirect()->route('questionaire')
                         ->with(['udata' => $assessment]);
    }
}
