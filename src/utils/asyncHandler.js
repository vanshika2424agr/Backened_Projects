const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export { asyncHandler };

/*🔹 Core Need (in one line)

👉 It is needed to automatically catch async errors and pass them to Express error middleware.

🔹 Real-world importance
Prevents server crashes
Ensures proper error responses
Makes code professional & scalable
Used in almost every production-level backend*/


// An async function is a function that:
// 👉 works with asynchronous operations (things that take time)
// 👉 returns a Promise automatically