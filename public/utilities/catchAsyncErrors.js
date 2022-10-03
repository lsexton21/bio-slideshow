/*Instead of the try/catch approach to error handeling for each route
you can create a function that will handle each*/

module.exports = catchAsyncErrorsFunc => {
    return (req, res, next) => {
        catchAsyncErrorsFunc(req, res, next).catch(next)
    }
}