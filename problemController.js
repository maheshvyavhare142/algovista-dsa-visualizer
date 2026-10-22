import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import {
  getProblems as getProblemsByDifficulty,
  getRandomProblem as getRandomByDifficulty,
  problemsByDifficulty,
} from "../data/problems.js";

export const listProblems = catchAsyncError(async (req, res) => {
  const { difficulty } = req.query;
  const problems = getProblemsByDifficulty(difficulty);
  res.status(200).json({
    success: true,
    count: problems.length,
    difficulty: difficulty ? difficulty.toLowerCase() : "all",
    problems,
  });
});

export const getRandomProblem = catchAsyncError(async (req, res, next) => {
  const { difficulty } = req.query;
  if (!difficulty) {
    return next(new ErrorHandler("Difficulty query parameter is required", 400));
  }
  const problem = getRandomByDifficulty(difficulty);
  if (!problem) {
    return next(
      new ErrorHandler(
        `No problems found for difficulty: ${difficulty}`,
        404,
      ),
    );
  }
  res.status(200).json({
    success: true,
    problem,
    difficulty: problem.difficulty,
    availableCounts: Object.fromEntries(
      Object.entries(problemsByDifficulty).map(([key, list]) => [key, list.length]),
    ),
  });
});


