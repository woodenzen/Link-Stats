// Add some comments here for contributors.
// For example, how to test the script.

// The filename is defined in the manifest file
const ownFilename = output.changeFile.filename;

let body = "Hello World\n";

// Add your code magic here

// Tell The Archive to save the content
output.changeFile.content = body;
