# Project Overview

This project is a DevOps automation toolchain designed to streamline the deployment, management, and testing of infrastructure and applications on Google Cloud Platform (GCP). It leverages GitHub Actions to automate the deployment process using Terraform, perform AI-powered testing with Playwright, and manage documentation generation.

## Purpose

The primary goal of this project is to automate the deployment of a simple web application on GCP Cloud Run and manage related infrastructure components such as Google Cloud Storage (GCS) buckets. It also automates the generation of documentation and testing scripts using AI, enhancing workflow efficiency.

## Technologies Used

- **Terraform:** To define and provision infrastructure resources on GCP.
- **GitHub Actions:** To handle continuous integration and continuous deployment (CI/CD) workflows, including Terraform execution and end-to-end testing.
- **JavaScript with Node.js:** For running automation scripts and handling AI interactions.
- **OpenAI API:** To generate documentation and test scripts dynamically.
- **Playwright:** For AI-generated web tests of the deployed application.
- **GCP Services:** Including Cloud Run for application hosting, Google Cloud Storage for state management and artifact storage, and SendGrid for sending notifications.

## High-Level Workflow

1. **Triggered on Push:** The CI/CD pipeline is triggered by pushes to the main branch, initiating the deployment workflow.

2. **Environment Setup:** The pipeline configures necessary tools and authenticates with GCP using credentials stored in GitHub Secrets.

3. **Infrastructure Deployment:**
   - Terraform is used to initialize, plan, and apply infrastructure changes based on the Terraform configuration files, creating a GCS bucket and deploying a Cloud Run service hosting a simple web application.
   
4. **Documentation and Test Generation:**
   - AI is used to generate detailed documentation (README and Terraform docs) and a web test script for the deployed application.
   - The generated test script validates the application's homepage by checking for specific text and takes screenshots.

5. **Execution and Reporting:**
   - The web test is executed using Playwright, and results are logged.
   - Generated logs and screenshots are uploaded to GCS as artifacts.
   - Test outcomes are communicated via email using SendGrid, including links to the test script and application and attaching screenshots.

6. **Version Control and Updates:**
   - If documentation changes are detected post-generation, they're committed back to the repository, maintaining up-to-date records in the version control system.

This holistic approach ensures infrastructure is correctly deployed and tested, with comprehensive, up-to-date documentation generated automatically for users and developers.