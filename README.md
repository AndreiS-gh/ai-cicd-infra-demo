# GCP Terraform Deployment Project

## Overview
This project automates the deployment of Google Cloud Platform (GCP) infrastructure using Terraform, integrated within a Continuous Integration/Continuous Deployment (CI/CD) pipeline via GitHub Actions. The key purpose is to manage and deploy cloud resources seamlessly while enabling automated documentation and testing.

## Technologies Used
- **GitHub Actions**: Orchestrates the Terraform deployment and automation tasks.
- **Terraform**: Manages and deploys GCP resources including Google Cloud Run services and Google Storage buckets.
- **Google Cloud Platform**: Hosts the infrastructure resources.
- **OpenAI**: Generates documentation and test scripts through AI-powered tools.
- **Playwright**: Conducts automated web tests on the deployed application.
- **JavaScript**: Scripts automation tasks, tests, and documentation generation.
- **SendGrid**: Sends notifications with test results and screenshots.

## High-Level Workflow
1. **Event Trigger**: The workflow triggers on pushing changes to the main branch.
2. **Environment Setup**: Installs necessary dependencies and tools (Terraform, gcloud CLI).
3. **Terraform Operations**:
   - Initializes and manages the Terraform state in a GCS bucket.
   - Deploys or destroys infrastructure based on user-defined actions (`apply` or `destroy`).
   - Outputs relevant information like app URL and storage bucket name.
4. **Documentation and Tests**:
   - Uses OpenAI to generate and update project README and Terraform documentation.
   - Creates AI-generated Playwright tests for verifying web application functionality.
   - Executes tests and captures screenshots regardless of the test outcome.
5. **Outputs Handling**:
   - Uploads scripts and screenshots to GCS.
   - Sends email notifications with test results and links to generated content.

By integrating these technologies and processes, the project ensures a robust and automated method for managing cloud infrastructure while facilitating automated testing and documentation, enabling efficient DevOps practices.