# Project README

## Project Summary

This internal project leverages GitHub Actions to facilitate a continuous integration and deployment (CI/CD) pipeline for infrastructure management and automated testing using Terraform and Node.js scripts. The pipeline includes automated GPT-based code reviews, Terraform-based GCP deployment, and AI-generated web tests. This setup enhances both the automation and intelligence of the CI/CD process, accommodating dynamically generated documentation and testing scripts using OpenAI's capabilities.

## Tools and Technologies Used

- **GitHub Actions**: For configuring and executing CI/CD workflows.
- **Terraform**: To define and deploy infrastructure as code on Google Cloud Platform (GCP).
- **Node.js**: For running automation scripts and enabling dynamic code execution.
- **OpenAI GPT**: For generating documentation and analyzing code changes.
- **Google Cloud Platform (GCP)**: Serving as the infrastructure provider for the deployment.
- **SendGrid**: For email notifications post-deployment.
- **Playwright**: To perform AI-generated web tests.

## Workflows Description

1. **GPT Review of Pull Request**: This workflow is triggered on pull requests to review code changes using GPT. It filters relevant files, generates a diff, and executes the review process, posting results back to the PR.

2. **Demo Workflow**: This basic workflow is triggered when changes are pushed to the `automation/js` directory and simply echoes a message to demonstrate functionality.

3. **GCP Terraform Deployment**: This workflow runs upon pushes to the `main` branch. It handles the deployment of infrastructure on GCP using Terraform, generates documentation, executes AI-powered web tests, uploads results to Google Cloud Storage (GCS), and sends notifications via email.

## Pipeline Explanation

The pipeline runs various workflows, each targeting a specific aspect of development and deployment processes:

- On pull requests, the **GPT Review of Pull Request** automates code review by analyzing changes in relevant files and leveraging OpenAI GPT to provide feedback, ensuring consistent and quality code integration.

- Pushes to the primary infrastructure definitions trigger the **GCP Terraform Deployment**. This workflow authenticates with GCP, sets up Terraform, and executes either `apply` or `destroy` actions based on specified configurations. It deploys or tears down infrastructure components like Google Cloud Run services and storage buckets.

- The workflow integrates with OpenAI to generate Terraform documentation and dynamically creates README content. AI-generated Playwright tests validate deployments, with results and artifacts (like screenshots) being uploaded to GCS for further inspection.

## Usage Instructions

### Triggering the Pipeline

- **Pull Request**: Create or update a pull request to trigger the GPT-based code review. Ensure that file changes include those with extensions like `.js`, `.yml`, `.yaml`, `.tf`, or `.tfvars.json`.

- **Push to Main**: Push commits to the `main` branch to initiate Terraform workflows and deployments on GCP.

### Required Secrets

- `OPENAI_API_KEY`: API key for authentication with OpenAI.
- `GITHUB_TOKEN`: Token for accessing GitHub API functionalities during workflows.
- `GCP_CREDENTIALS`: JSON credentials for GCP account access.
- `SENDGRID_API_KEY`: API key to send emails via SendGrid.
- `EMAIL_TO`: Recipient email address for notifications.
- `EMAIL_FROM`: Sender email address for email notifications.

### Pull Request Workflow

Upon a pull request, the workflow:
- Reviews code changes using OpenAI GPT.
- Posts feedback as a comment on the PR.

### Push to Main Workflow

On a push to the main branch:
- Authenticate with GCP and set up Terraform.
- Read actions from `terraform.tfvars.json` to decide between `apply` or `destroy`.
- Deploy infrastructure using Terraform, followed by doc generation and Playwright web tests.
- Upload test results to GCS and send summary emails using SendGrid.

### Important Notes

- Ensure all necessary secrets are configured correctly in the GitHub repository's settings for seamless execution of workflows.
- The DevOps team should frequently review and update the workflow configurations to adapt to new requirements and improve efficiency.