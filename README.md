# GCP Terraform CI/CD Automation

This project automates the deployment and management of infrastructure and application testing on Google Cloud Platform (GCP) using GitHub Actions and Terraform. It leverages AI to enhance automation capabilities, particularly through Playwright for testing and OpenAI for generating dynamic documentation and test scripts.

## Purpose

The primary objective of this project is to enable continuous integration and deployment (CI/CD) of a simple web application running on Google Cloud Run. The setup ensures automated provisioning and management of infrastructure, dynamic test script creation for web applications, and automated documentation generation. Additionally, it integrates with Google Cloud Storage for state management and artifact persistence.

## Technologies Used

- **Terraform**: Infrastructure-as-Code (IaC) for GCP resource management.
- **GitHub Actions**: Automation platform for CI/CD workflows.
- **Playwright**: End-to-end testing with AI-generated scripts.
- **OpenAI**: AI-driven documentation and test generation.
- **Google Cloud Platform**: Cloud services including Storage and Cloud Run.
- **Node.js**: JavaScript runtime for automation scripts.
- **SendGrid**: Email service for result notifications.

## High-Level Workflow

1. **Trigger**: Automated workflow initiates on push events to the main branch.
   
2. **Setup and Authentication**: 
   - Dependencies are installed in a container.
   - Git and GCP authentication are configured using secret keys from GitHub secrets.

3. **Terraform Operations**:
   - Determines whether to apply or destroy infrastructure based on provided variables.
   - Initializes, plans, applies, or destroys infrastructure through Terraform commands.
   - Outputs relevant URLs and data for subsequent steps.

4. **AI-Driven Documentation**:
   - Node.js script generates or updates README and infrastructure documentation using OpenAI.

5. **Web Application Testing**:
   - Dynamically generates Playwright test scripts for the deployed web app using OpenAI.
   - Executes the generated tests and captures results, including screenshots.

6. **Artifact Handling**:
   - Saves logs and test artifacts like screenshots to Google Cloud Storage.
   - The test script is also uploaded and publicly accessible for review.

7. **Notifications**:
   - Sends an email notification with test results and links to artifacts using SendGrid.

This setup enhances automation in deploying, testing, and documenting cloud-native applications, with a robust feedback loop through CI/CD practices.