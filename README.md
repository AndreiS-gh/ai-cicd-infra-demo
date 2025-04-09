# GCP Terraform Deployment Automation

This project automates the deployment of infrastructure and application resources on Google Cloud Platform (GCP) using Terraform, coupled with a Continuous Integration/Continuous Deployment (CI/CD) pipeline based on GitHub Actions. Additionally, it leverages AI for generating documentation and testing scripts.

## Purpose
The primary goal of this project is to streamline the deployment and testing of a simple web application hosted on Google Cloud Run. The project automates the setup of cloud resources and conducts AI-powered testing to ensure the reliability and accessibility of the application.

## Technologies Used
- **Terraform**: Manages GCP resources including a Cloud Run service and a Cloud Storage bucket.
- **GitHub Actions**: Facilitates the CI/CD workflow to deploy Terraform configurations upon code changes in the `main` branch.
- **Docker**: Utilizes a containerized environment for running GitHub Actions.
- **JavaScript and Node.js**: Automates documentation and testing processes using scripts.
- **Google Cloud Platform Services**: Implements infrastructure components such as Cloud Run and Cloud Storage.
- **OpenAI GPT-4**: Generates documentation and testing scripts with AI models.

## High-Level Workflow
1. **GitHub Actions Workflow**: Triggered on pushes to the `main` branch, it handles the authentication with GCP, sets up necessary tools (Terraform, Node.js), and proceeds with infrastructure initialization and application deployment.

2. **Terraform Infrastructure**: Defines a storage bucket and a serverless web application to deploy on GCP. Terraform manages the lifecycle of these resources, using a GCS bucket for state storage.

3. **AI-Powered Documentation and Testing**:
   - **Documentation**: An OpenAI model generates and updates project documentation based on the existing codebase.
   - **Test Generation**: AI creates Playwright tests that are executed to ensure the deployed web application displays the expected content.
   - **Logging and Reporting**: Test outcomes and logs are uploaded to GCS, with results communicated via automated emails through SendGrid.

4. **Post-Deployment Actions**:
   - **Logs and Test Artifacts**: Deploy logs and test artifacts (such as screenshots) are captured and stored for reference.
   - **Email Notifications**: SendGrid is used to send detailed test result reports, including test scripts and screenshots, to specified email recipients.

This cohesive integration of infrastructure as code, CI/CD practices, and AI-driven automation enhances deployment efficiency, documentation accuracy, and application reliability.