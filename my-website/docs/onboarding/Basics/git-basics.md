---
sidebar_position: 5
---

# Git Basics

Git is a version control system that helps teams collaborate on code. It tracks changes, manages different versions, and allows multiple people to work on the same project without conflicts.

## What is Git?

Think of Git as a time machine for your code. It allows you to:
- Save snapshots (commits) of your work
- Go back to previous versions
- Work on new features without breaking existing code
- Collaborate with teammates
- Track who changed what and when

## Essential Git Concepts

### Repository (Repo)
A folder that Git is tracking. Contains your code and all its history.

### Commit
A snapshot of your code at a specific point in time. Like a save point in a video game.

### Branch
A parallel version of your code. Allows you to work on features without affecting the main code.

### Remote
The version of your repository hosted on GitHub/GitLab (in the cloud).

## Basic Git Workflow

```bash
# 1. Clone a repository
git clone https://github.com/username/repository.git
cd repository

# 2. Check status
git status

# 3. Make changes to files...

# 4. Stage changes
git add filename.js
# or add all changes
git add .

# 5. Commit changes
git commit -m "Description of what you changed"

# 6. Push to remote
git push
```

## Essential Git Commands

### Check Status
```bash
git status
# Shows which files are modified, staged, or untracked
```

### Add Files
```bash
git add filename.js          # Stage a specific file
git add src/                 # Stage a directory
git add .                    # Stage all changes
```

### Commit Changes
```bash
git commit -m "Add user login feature"
# -m is for message. Make it descriptive!
```

### View History
```bash
git log                      # See commit history
git log --oneline            # Compact view
git log --graph --oneline    # Visual tree
```

### Push and Pull
```bash
git push                     # Send your commits to remote
git pull                     # Get latest changes from remote
```

### Branches
```bash
git branch                   # List all branches
git branch feature-name      # Create new branch
git checkout feature-name    # Switch to branch
git checkout -b feature-name # Create and switch in one command

# Modern syntax
git switch feature-name      # Switch to branch
git switch -c feature-name   # Create and switch
```

### Check Differences
```bash
git diff                     # Show unstaged changes
git diff --staged            # Show staged changes
git diff branch-name         # Compare with another branch
```

## Branching Strategy

Our team uses a specific branching convention:

### Branch Naming
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Urgent production fixes

Examples:
```bash
git checkout -b feature/user-authentication
git checkout -b bugfix/fix-login-error
git checkout -b feature/add-dark-mode
```

### Typical Workflow
```bash
# 1. Start from main branch
git checkout main
git pull

# 2. Create feature branch
git checkout -b feature/my-new-feature

# 3. Make changes and commit
git add .
git commit -m "Add new feature"

# 4. Push branch to remote
git push -u origin feature/my-new-feature

# 5. Create Pull Request on GitHub
# (Done through GitHub UI)

# 6. After PR is merged, update main
git checkout main
git pull

# 7. Delete old branch (optional)
git branch -d feature/my-new-feature
```

## Writing Good Commit Messages

### Good Examples
```bash
git commit -m "Add user authentication with JWT"
git commit -m "Fix memory leak in dashboard component"
git commit -m "Update API endpoint to v2"
git commit -m "Refactor user service for better testability"
```

### Bad Examples
```bash
git commit -m "fix"           # Too vague
git commit -m "changes"       # Doesn't say what changed
git commit -m "asdfasdf"      # Not descriptive
git commit -m "final final v3 for real this time"  # Unprofessional
```

### Format
```
<type>: <short description>

[optional longer description]
```

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, missing semicolons
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Common Scenarios

### Undo Uncommitted Changes
```bash
git checkout -- filename.js   # Undo changes to one file
git restore filename.js       # Modern syntax
git restore .                 # Undo all changes
```

### Undo Last Commit (Keep Changes)
```bash
git reset HEAD~1
# Your changes are still there, just uncommitted
```

### Update Your Branch with Latest Main
```bash
git checkout main
git pull
git checkout feature/my-branch
git merge main
# or
git rebase main
```

### Resolve Merge Conflicts
When Git can't automatically merge:

1. Open the conflicted file
2. Look for conflict markers:
```
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
```
3. Edit the file to resolve conflicts
4. Remove conflict markers
5. Stage and commit:
```bash
git add .
git commit -m "Resolve merge conflicts"
```

## Best Practices

1. **Commit often** - Small, frequent commits are better than large ones
2. **Pull before you push** - Get latest changes before pushing yours
3. **Write descriptive messages** - Your future self will thank you
4. **Don't commit secrets** - Never commit API keys, passwords, etc.
5. **Use .gitignore** - Exclude node_modules, .env files, etc.
6. **Review before committing** - Use `git diff` to check your changes
7. **Test before pushing** - Make sure your code works

## Common Mistakes to Avoid

1. Committing directly to `main` - Always use feature branches
2. Pushing broken code - Test before you push
3. Large commits - Break work into smaller, logical commits
4. Forgetting to pull - Always pull before starting work
5. Force pushing (`git push -f`) - Only in extreme cases and with caution

## Git with GitHub

### Cloning a Repository
```bash
git clone https://github.com/username/repo.git
cd repo
```

### Creating a Pull Request
1. Push your branch to GitHub
2. Go to the repository on GitHub
3. Click "Pull Requests" → "New Pull Request"
4. Select your branch
5. Add description of changes
6. Request reviewers
7. Submit!

### Keeping Your Fork Updated
```bash
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git checkout main
git merge upstream/main
git push
```

## Visual Git Tools

If you prefer a GUI:
- **VS Code** - Built-in Git support
- **GitHub Desktop** - Simple and beginner-friendly
- **GitKraken** - Visual and powerful
- **SourceTree** - Free and feature-rich

## Practice Exercise

Try this workflow:
1. Create a new branch called `feature/practice`
2. Create or edit a file
3. Stage and commit your changes
4. Push the branch to GitHub
5. Create a Pull Request
6. Merge it (if you have permissions)
7. Pull the updated main branch

## Learn More

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [Oh My Git!](https://ohmygit.org/) - Learn Git through a game
- [Learn Git Branching](https://learngitbranching.js.org/) - Interactive tutorial

## Next Up

Great! Now you know version control. Let's learn React - the framework we use to build user interfaces!
