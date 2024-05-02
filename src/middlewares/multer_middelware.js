import multer from 'multer';

const storage = multer.diskStorage({
    // Define a function called 'destination' that takes in three parameters:
    //  - 'req': the request object
    //  - 'file': the uploaded file
    //  - 'cb': a callback function
    // This function is responsible for determining where to store the uploaded file.
    // It does this by calling the callback function and passing in two parameters:
    //  - An error (null in this case, indicating no error)
    //  - A path to the directory where the uploaded file should be stored
    // In this case, the function is specifying that the uploaded file should be stored in a directory called 'temp',
    // which is located in the 'public' directory.
    // The path to this directory is provided as a string: './public/temp'.
    destination: function (req, file, cb) {
        // Call the callback function, passing in:
        //  - An error (null in this case)
        //  - The path to the directory where the uploaded file should be stored ('./public/temp')
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload = multer({
    storage,
});
