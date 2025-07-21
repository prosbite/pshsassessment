<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FrontPageController;
use App\Http\Controllers\QuestionaireController;

Route::get('/', [FrontPageController::class, 'index'])->name('front');

Route::get('/assessment', [QuestionaireController::class, 'index'])->name('questionaire');
Route::post('/assessment', [QuestionaireController::class, 'store'])->name('questionaire.store');
Route::get('/assessment/complete', [QuestionaireController::class, 'complete'])->name('assessment-complete');
Route::post('/user-check', [FrontPageController::class, 'checkUser'])->name('user-check');

Route::get('/tabular-ui', function () {
    return Inertia::render('TabularUi');
});

Route::get('/dashboard', function () {
    return redirect()->route('assessment-results');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/assessment/results', [QuestionaireController::class, 'results'])->name('assessment-results');
    Route::get('/assessment/log', [QuestionaireController::class, 'assessmentLog'])->name('assessment-log');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
