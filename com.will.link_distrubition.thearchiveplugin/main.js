"use strict";


// Ask user to provide the title for the note
const targetTitle = app.prompt({
  title: "New Note with Timestamp",
  description: "Enter title:",
  placeholder: "Title",
  defaultValue: "",
});
if (targetTitle === null) { // user clicked cancel
    cancel("Creation cancelled");
}

// Generate the UUID
const now = new Date();
const timestampString = [
  now.getFullYear(),
  ('0' + (now.getMonth() + 1)).slice(-2),
  ('0' + now.getDate()).slice(-2),
  ('0' + now.getHours()).slice(-2),
  ('0' + now.getMinutes()).slice(-2),
].join('');

// Create the filename
const targetFilename = `${timestampString} ${targetTitle}`;


//Create Human Readable date
const humanReadableDate = [
  ('0' + now.getDate()).slice(-2),
  ('0' + (now.getMonth() + 1)).slice(-2),
  now.getFullYear(),
].join('-');

//Create Human Readable time
const hours24 = now.getHours();
const minutes = ('0' + now.getMinutes()).slice(-2);
  // Determine AM/PM
const ampm = hours24 >= 12 ? 'PM' : 'AM';
  // Convert to 12-hour format
const hours12 = hours24 % 12 || 12; // Convert '0' to '12'
  // Format hours to always have two digits
const formattedHours = ('0' + hours12).slice(-2);
  // Combine the formatted time
const formattedTime = `${formattedHours}:${minutes} ${ampm}`

// Get the total count of all notes
let totalNotesCount = input.notes.all.length;

// Function to count links in a string
function countLinks(text) {
  const linkRegex = /[ ,§]\[\[/g;
  const matches = text.match(linkRegex);
  return matches ? matches.length : 0;
}

// Function to group notes by the number of links
function groupNotesByLinkCount(notes) {
  let linkCountGroups = {};
  notes.forEach(note => {
    const linkCount = countLinks(note.content);
    if (!linkCountGroups[linkCount]) {
      linkCountGroups[linkCount] = 0;
    }
    linkCountGroups[linkCount]++;
  });
  return linkCountGroups;
}

// Function to get the top ten notes by link count
function getTopTenNotes(notes) {
  return notes
    .map(note => ({ filename: note.filename, linkCount: countLinks(note.content) }))
    .sort((a, b) => b.linkCount - a.linkCount)
    .slice(0, 10);
}

// Group notes by the number of links
let linkCountGroups = groupNotesByLinkCount(input.notes.all);

// Create a table for the link count groups
let linkCountTable = ' Links | Notes\n';
linkCountTable += '-------|-------\n';
Object.keys(linkCountGroups).sort((a, b) => a - b).forEach(linkCount => {
  linkCountTable += `${linkCount.toString().padStart(6, ' ')} | ${linkCountGroups[linkCount]}\n`;
});

// Get the top ten notes by link count
let topTenNotes = getTopTenNotes(input.notes.all);

// Create a listing of the top ten note filenames with link counts
let topTenNotesList = 'Top Ten Notes by Link Count:\n';
topTenNotesList += topTenNotes.map(note => `- ${note.filename} - with ${note.linkCount} links`).join('\n');

// Use template literals for better formatting
let body = `
---
UUID:     ›[[${timestampString}]]
cdate:    ${humanReadableDate} ${formattedTime} 
tags:     #statistics
---
# ${targetTitle}

Zettelkasten Link Stats
★★★★★★★★★★★★★★★★★★
Total Number of Notes in Zettelkasten: ${totalNotesCount}

Link Count Breakdown:
${topTenNotesList}
${linkCountTable}
`;

// Set the output with discribed filename and content
output.changeFile.filename = targetFilename;
output.changeFile.content = body;