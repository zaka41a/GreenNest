# Contributing to GreenNest 🌿

First off, thank you for considering contributing to GreenNest! It's people like you that make GreenNest such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript/React styleguides
* Include screenshots in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐛 `:bug:` when fixing a bug
    * ✨ `:sparkles:` when adding a new feature
    * 📝 `:memo:` when writing docs
    * 🚀 `:rocket:` when improving performance
    * ✅ `:white_check_mark:` when adding tests

### JavaScript Styleguide

* Use 2 spaces for indentation
* Prefer `const` over `let`. Never use `var`
* Use semicolons
* Use template literals instead of string concatenation
* Use arrow functions when possible
* Use async/await instead of callbacks or promise chains

### React Styleguide

* One component per file
* Use functional components with hooks
* Use JSX for component rendering
* Use PropTypes or TypeScript for type checking
* Keep components small and focused
* Extract reusable logic into custom hooks

### CSS Styleguide

* Use meaningful class names
* Follow BEM naming convention when appropriate
* Avoid inline styles when possible
* Use CSS variables for colors and common values
* Mobile-first responsive design

## Development Process

1. Fork the repo
2. Create a new branch from `main`
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass
6. Update documentation as needed
7. Submit a pull request

## Setting Up Development Environment

```bash
# Clone your fork
git clone https://github.com/your-username/GreenNest.git

# Navigate to the directory
cd GreenNest

# Install dependencies
npm install
cd backend && npm install && cd ..

# Create .env file
cp backend/.env.example backend/.env

# Start development servers
# Terminal 1
cd backend && npm start

# Terminal 2
npm run dev
```

## Questions?

Feel free to contact the project maintainer at zaksab89@gmail.com

Thank you for contributing! 🌱
