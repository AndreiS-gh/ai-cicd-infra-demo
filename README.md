# Project Overview

This project is an automated CI/CD pipeline that leverages GitHub Actions and Terraform to manage Google Cloud Platform (GCP) infrastructure and perform AI-driven code reviews and tests. The primary components include infrastructure deployment via Terraform, AI-powered document generation, and automated testing and notification systems based on cloud functions and services.

## Tools and Technologies Used

- **GitHub Actions**: Automate workflows for code reviews, testing, and deployment.
- **Terraform**: Infrastructure as Code (IaC) tool for provisioning GCP resources.
- **Node.js**: JavaScript runtime used for custom automation scripts.
- **Google Cloud Platform**: Hosts application infrastructure and resources.
- **OpenAI API**: Powers AI-driven code reviews and document/content generation.
- **SendGrid**: Sends notifications via email.
- **Google Cloud Storage**: Stores test artifacts and assets.

## Workflows and Their Functions

### 1. **GPT Review of Pull Request**

Triggered by opening, synchronizing, or reopening a pull request. This workflow:

- Fetches the latest code.
- Generates a filtered diff of relevant files (JavaScript, YAML, Terraform).
- Uses OpenAI to perform an AI-driven code review.
- Utilizes secrets `OPENAI_API_KEY` and `GITHUB_TOKEN`.

### 2. **Demo Workflow**

Runs on pushes to the `automation/js` path and includes a demo placeholder step:

- Simply outputs a hello message as a demonstration.

### 3. **GCP Terraform Deployment**

Triggered on pushes to the `main` branch. The workflow:

- Authenticates with GCP using the `GCP_CREDENTIALS` secret.
- Deploys and manages GCP infrastructure using Terraform.
- Generates and commits AI-powered documentation.
- Builds and runs an AI-generated web test using Playwright.
- Uploads test results and screenshots to Google Cloud Storage.
- Sends a notification email with the test results using SendGrid.

## High-Level Pipeline Explanation

Upon modifications or new feature implementations in the code (e.g., a new pull request or a push to main), GitHub Actions workflows are automatically triggered:

1. **Code Review (PR)**: An AI-driven review checks for issues in code changes targeting the main branch.
2. **Demo Placeholder**: Provides a simple demonstration step confirming the workflow execution.
3. **Infrastructure Management**:
   - On a code push to `main`, Terraform is used to apply or destroy infrastructure changes on GCP.
   - AI-generated documentation is committed back to the repository if changes are detected.
4. **Testing and Notifications**:
   - Post-deployment, an AI-generated Playwright test validates the application's web UI.
   - Test results and related assets are stored and shared via email notifications.

## Usage Instructions

### Triggering the Pipeline

- **Pull Requests**: Open, sync, or reopen a PR to trigger code review workflows.
- **Push to Main**: Automated infrastructure handling and testing occur on a push to the `main` branch.
- **Demo Steps**: Pushing changes to the `automation/js` directory triggers the demo workflow.

### Required Secrets

- `OPENAI_API_KEY`: Authenticate with OpenAI for AI-driven tasks.
- `GITHUB_TOKEN`: Required for repository and workflow authentication and operations.
- `GCP_CREDENTIALS`: JSON key for Google Cloud Platform authentication.
- `SENDGRID_API_KEY`: To send email notifications using SendGrid.
- `EMAIL_TO`, `EMAIL_FROM`: Email addresses for sending and receiving notifications.

### What Happens on Pull Requests?

- Automatically analyzes code changes related to `.js`, `.yml`, and `.tf` files.
- The results are posted back to the pull request as comments or checks.

### Secrets Management

Ensure all required secrets are properly configured in the GitHub repository settings to enable seamless operation of the workflows.

This pipeline setup streamlines operations for efficient development, deployment, and maintenance of GCP-hosted applications with integrated AI capabilities for enhanced code review and documentation.