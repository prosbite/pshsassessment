<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Assessment;
use App\Models\Section;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

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
        $sections = Section::whereHas('enrollments.assessments')
            ->with('enrollments.learner')
            ->join('grade_levels', 'sections.grade_level_id', 'grade_levels.id')
            ->select('sections.id', 'sections.section_name', 'sections.grade_level_id')
            ->distinct()
            ->orderBy('sections.id')
            ->get();

        $assessment = Assessment::with(['enrollment.learner', 'enrollment.section.gradeLevel'])
            ->orderBy('lastName')
            ->where('entryCode', 'diagnostic-2025')
            ->get();
        return Inertia::render('AssessmentResults')->with(['assessment' => $assessment, 'sections' => $sections]);
    }

    public function assessmentLog()
    {
        $assessment = Assessment::where('entryCode', 'diagnostic-2025')->where('enrollment_id', null)->orderBy('lastName')->paginate(25);
        return Inertia::render('StudentLog')->with(['students' => $assessment]);
    }

    public function export(Request $request)
    {
        $request->validate([
            'category' => 'required|string',
            'grades' => 'required|string',
        ]);

        $grades = explode('-', $request->grades);

        $assessments = Assessment::with(['enrollment.learner', 'enrollment.section.gradeLevel'])
            ->where('entryCode', 'diagnostic-2025')
            ->whereHas('enrollment.section.gradeLevel', function ($q) use ($grades) {
                $q->whereIn('grade_level', $grades);
            })
            ->orderBy('lastName')
            ->orderBy('firstName')
            ->get();

        $categoryKey = strtolower($request->category);

        $questions = [];
        $rows = [];
        foreach ($assessments as $assessment) {
            $categoryData = collect($assessment->assessment)
                ->firstWhere(fn ($item) => strtolower($item['category']) === $categoryKey);

            if (!$categoryData || empty($categoryData['questions'])) continue;

            if (empty($questions)) {
                $questions = $categoryData['questions'];
            }

            $name = $assessment->lastName . ', ' . $assessment->firstName;
            $section = $assessment->enrollment?->section?->section_name ?? '';
            $gradeLevel = $assessment->enrollment?->section?->gradeLevel?->grade_level ?? '';

            $row = [$name, $section, $gradeLevel];
            foreach ($categoryData['questions'] as $q) {
                $row[] = $q['answer'] ?? '';
            }
            $rows[] = $row;
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $header = ['Student Name', 'Section', 'Grade Level'];
        foreach ($questions as $q) {
            $header[] = $q['question'];
        }
        $sheet->fromArray($header, null, 'A1');

        $sheet->fromArray($rows, null, 'A2');

        for ($col = 1; $col <= count($header); $col++) {
            $colLetter = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($col);
            $sheet->getColumnDimension($colLetter)->setAutoSize(true);
        }

        $filename = $request->category . '_results_' . $request->grades . '.xlsx';

        $response = new StreamedResponse(function () use ($spreadsheet) {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
        });

        $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition', 'attachment; filename="' . $filename . '"');

        return $response;
    }
}
