# GitHub Workflow

## Branch Strategy

We use a simple feature-branch workflow:

```
main (production)
  ↑
  └─ feature/my-feature (your working branch)
```

## Making Changes

### 1. Create a feature branch
```bash
git checkout -b feature/my-feature-name
```

Use descriptive names:
- `feature/add-login`
- `feature/fix-opkomst-list`
- `fix/typo-in-header`

### 2. Make changes locally
```bash
npm run dev  # Keep server running
# ... edit files ...
```

### 3. Commit your work
```bash
git add .
git commit -m "feat: add login screen"
```

**Commit message format:**
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting changes
- `refactor:` for code reorganization

### 4. Push to GitHub
```bash
git push origin feature/my-feature-name
```

### 5. Create a Pull Request
1. Go to [github.com](https://github.com)
2. You'll see a prompt to create a PR
3. Add a description of your changes
4. Click "Create Pull Request"
5. Wait for review/feedback
6. Once approved, click "Merge Pull Request"

### 6. Delete your branch
```bash
git branch -d feature/my-feature-name
git push origin --delete feature/my-feature-name
```

---

## Pulling Updates

If someone else pushed changes:
```bash
git pull origin main
```

---

## Troubleshooting

**"fatal: Permission denied"**
- Use a GitHub Personal Access Token instead of password
- Settings → Developer settings → Personal access tokens → Generate new token
- Use as password in git commands

**Merge conflicts**
- Git will tell you which files conflict
- Edit them manually, resolve the `<<<< ==== >>>>` markers
- `git add .` and `git commit`

**Accidentally committed to main?**
```bash
git reset --soft HEAD~1  # Undo last commit, keep changes
git checkout -b feature/fix
git commit -m "fix: my changes"
git push origin feature/fix
```

---

**Questions?** Ask in the project or check [github.com/git-tips](https://github.com/git-tips/tips)
