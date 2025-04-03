# GCP Terraform Deployment with AI-Powered Automation

This project automates end-to-end deployment and testing of infrastructure on Google Cloud Platform (GCP) using Terraform and GitHub Actions. It leverages AI for generating documentation and test scripts, ensuring a seamless CI/CD pipeline.

## Purpose

The primary goal of this project is to deploy a simple web application and a storage bucket on GCP using Terraform, automate infrastructure changes through a CI/CD pipeline, execute AI-generated automated tests on the deployed application, and manage deployment documentation.

## Technologies Used

- **GitHub Actions**: Automates the CI/CD workflow for deploying infrastructure and running tests.
- **Terraform**: Manages and provisions the GCP infrastructure including Cloud Run services and Google Cloud Storage (GCS) buckets.
- **Google Cloud Platform**: Hosts the application and storage resources.
- **JavaScript (Node.js)**: Contains scripts for generating documentation and automating web page tests.
- **OpenAI's API**: Generates documentation and test scripts leveraging GPT models.
- **SendGrid API**: Sends email notifications with test results and attachments.

## High-Level Workflow

1. **Trigger**: The workflow is activated on a push to the main branch in GitHub.
2. **Environment Setup**: Installs necessary dependencies and authenticates with GCP using configured secrets.
3. **Terraform Execution**: Determines the action ('apply' or 'destroy') from configuration variables:
   - Initializes Terraform and applies or destroys the infrastructure resources as defined.
   - Outputs essential information such as application URL and GCS bucket name.
4. **AI-Powered Automation**:
   - Generates and commits Terraform documentation to the repository.
   - Utilizes OpenAI to produce an end-to-end README and Playwright test scripts.
   - Executes the AI-generated tests against the deployed application, capturing screenshots of results.
5. **Results and Notifications**:
   - Uploads relevant logs and test outputs to GCS.
   - Sends an email notification with the test result and screenshots, providing access to the generated test scripts.

This project provides a fully automated and AI-enhanced approach to deploying and testing cloud infrastructure, increasing efficiency and reducing human intervention in the DevOps lifecycle.