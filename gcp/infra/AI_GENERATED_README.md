# Terraform GCP Infrastructure for AI CI/CD Demo

This repository contains Terraform configuration files to set up a simple infrastructure on Google Cloud Platform (GCP), specifically tailored for a continuous integration and delivery (CI/CD) demo of an AI project. The infrastructure includes a Cloud Storage bucket and a Cloud Run service to host a web application.

## Infrastructure Overview

1. **Google Cloud Storage Bucket**: 
   - A GCS bucket is created to potentially store artifacts or application data needed for the web application.

2. **Google Cloud Run Service**:
   - This service deploys a containerized web application (`simple-webapp`) using Cloud Run, which is a fully managed serverless platform. The app can be accessed by anyone on the internet due to the IAM policy allowing `allUsers` to invoke the service.

## Key Configuration Files

### `main.tf`
- **Provider Configuration**: Sets the Google Cloud provider with the specified project ID and region.
  
- **Resources**:
  - `google_storage_bucket`: Creates a GCS bucket with a given name and location.
  - `google_cloud_run_service`: Deploys a containerized application, pointing to an image hosted in Google Container Registry.
  - `google_cloud_run_service_iam_policy`: Grants public access to the Cloud Run service, allowing anyone to invoke it without authentication.

### `variables.tf`
Defines the input variables used to configure the infrastructure:

- `project_id`: The GCP Project ID where resources will be created.
- `region`: Specifies the region for deploying resources. Default is `us-central1`.
- `bucket_name`: The name of the Google Cloud Storage bucket to be created.
- `text_to_test`: Arbitrary text intended for testing purposes, perhaps for testing the deployed application.

### `outputs.tf`
Defines outputs after the infrastructure is provisioned:

- `app_url`: URL of the deployed Cloud Run application.
- `gcs_bucket_name`: Returns the name of the created GCS bucket.
- `text_to_test`: Outputs the text provided for testing.

## Backend Configuration

The Terraform state backend is configured to use Google Cloud Storage, enabling persistent storage of Terraform state files:

- **Bucket**: `tfstate-cicd-bucket`
- **Prefix**: `terraform/ai-cicd-infra-demo/state`

## Usage

1. **Pre-requisites**: Ensure Terraform is installed and you have authenticated to Google Cloud.

2. **Initialize Terraform**:
   ```bash
   terraform init
   ```

3. **Plan the Deployment**:
   ```bash
   terraform plan -var="project_id=your-gcp-project-id" -var="bucket_name=your-gcs-bucket-name"
   ```
   Replace placeholders with appropriate values, especially `your-gcp-project-id` and `your-gcs-bucket-name`.

4. **Apply the Configuration**:
   ```bash
   terraform apply -var="project_id=your-gcp-project-id" -var="bucket_name=your-gcs-bucket-name"
   ```

5. **Access the Outputs**:
   Once deployed, access the outputs (like the `app_url`) to interact with your deployed services.

This setup provides a straightforward and scalable method to deploy a serverless containerized application along with essential storage resources, aimed at supporting AI-driven continuous integration/delivery workflows on GCP.