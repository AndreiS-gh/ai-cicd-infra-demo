# AI CI/CD Infrastructure Demo

This Terraform project sets up a demonstration infrastructure on Google Cloud Platform (GCP) tailored for a simple AI CI/CD pipeline. The infrastructure includes key components such as a Google Cloud Storage bucket and a Cloud Run service for hosting a web application. The configuration is designed to streamline the deployment process and ensure scalability and quick updates in your CI/CD workflow.

## Purpose

The primary aim of this project is to automate the deployment of a basic web application using Google Cloud services. This infrastructure is ideal for testing and learning purposes, providing a straightforward entry point for developers looking to integrate CI/CD practices with cloud technologies.

## Infrastructure Overview

### Resources

1. **Google Cloud Storage Bucket (`google_storage_bucket`)**:
   - A Cloud Storage bucket is created to store objects that can be utilized in your CI/CD processes, such as artifacts.
   - **Key Settings**:
     - `force_destroy` is set to `true`, meaning the bucket and all its contents will be deleted if the resource is destroyed through Terraform.

2. **Google Cloud Run Service (`google_cloud_run_service`)**:
   - A serverless managed Cloud Run service for deploying a `simple-webapp` Docker container.
   - **Key Features**:
     - **Traffic Management**: Set to route 100% of the traffic to the latest revision of the service, facilitating continuous delivery.
     - **Container Image**: Retrieved from Google Container Registry based on the project ID.

3. **IAM Policy on Cloud Run Service (`google_cloud_run_service_iam_policy`)**:
   - Configured to allow unauthenticated access by adding `allUsers` with the `roles/run.invoker` role. This is suitable for public applications or API services that need to be readily accessible.

### Terraform Backend

- **Google Cloud Storage (GCS) Backend**: 
  - Utilized to maintain Terraform state files in a GCS bucket (`tfstate-cicd-bucket`) under the specified prefix. This ensures state consistency and collaboration among team members.

## Variables

Define and customize input variables through the `variables.tf` file:

- **`project_id`** (string): Your GCP Project ID. This is mandatory.
- **`region`** (string): GCP region where resources will be deployed. Defaults to `us-central1`.
- **`bucket_name`** (string): The name of the GCS bucket to be created.
- **`text_to_test`** (string): Custom text variable designed for testing purposes within the application.

## Outputs

After successful deployment, the following output information will be available:

- **`app_url`**: The URL of the deployed Cloud Run service, enabling quick access to your web application.
- **`gcs_bucket_name`**: Displays the name of the created GCS bucket for reference and management purposes.
- **`text_to_test`**: Outputs the value of the `text_to_test` variable for application testing validation.

## Getting Started

To set up this infrastructure, ensure Terraform is installed and configure GCP credentials. Tailor the `variables.tf` file to your environment specifications, then execute the typical Terraform workflow:

1. **Initialize Terraform**:
   ```bash
   terraform init
   ```

2. **Plan the Deployment**:
   ```bash
   terraform plan
   ```

3. **Apply the Configuration**:
   ```bash
   terraform apply
   ```

This setup is perfect for kickstarting your AI CI/CD pipeline on Google Cloud, offering a simple deployment environment with scalable serverless technologies.