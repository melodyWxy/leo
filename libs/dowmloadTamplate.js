var Git = require("nodegit");

Git.Clone("https://github.com/nodegit/nodegit", "nodegit").then(function(repository) {
  // Work with the repository object here.
});