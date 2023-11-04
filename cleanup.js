#!/usr/bin/env node
const fs = require("fs"); // Import the 'fs' (File System) module
const path = require("path"); // Import the 'path' module

function deleteNodeModules(dir) {
  // Define a function named 'deleteNodeModules' that takes a directory path as an argument
  fs.readdir(dir, (err, files) => {
    // Read the contents of the specified directory
    if (err) throw err; // If there's an error reading the directory, throw the error

    for (const file of files) {
      // Loop through each file/directory in the specified directory
      const filePath = path.join(dir, file); // Construct the full path of the file/directory

      fs.stat(filePath, (err, stats) => {
        // Get the file status to determine whether it's a file or directory
        if (err) throw err; // If there's an error getting the file status, throw the error

        if (stats.isDirectory()) {
          // Check if the current item is a directory
          if (file === "node_modules") {
            // Check if the directory is named 'node_modules'
            fs.rm(filePath, { recursive: true, force: true }, (err) => {
              // Delete the 'node_modules' directory recursively
              if (err) throw err; // If there's an error deleting the directory, throw the error
              console.log(`Deleted node_modules at: ${filePath}`); // Log the deletion to the console
            });
          } else {
            deleteNodeModules(filePath); // If it's a different directory, recursively call 'deleteNodeModules' on it
          }
        }
      });
    }
  });
}

const dir = process.argv[2]; // Get the directory address from the command line arguments

if (dir) {
  // Check if a directory address was provided
  deleteNodeModules(dir); // If so, call 'deleteNodeModules' with the provided directory address
} else {
  console.error("Please provide a directory address."); // If not, log an error message to the console
}
