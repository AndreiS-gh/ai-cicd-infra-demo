# AI CI/CD Infrastructure Demo

This Terraform configuration sets up a simple CI/CD infrastructure on Google Cloud Platform (GCP) intended for deploying a containerized web application. The setup includes a Cloud Storage bucket and a Cloud Run service with public access enabled.

## Components

### Infrastructure Overview

- **Google Cloud Storage Bucket:** A storage bucket is created to potentially store artifacts or logs.
- **Google Cloud Run Service:** A serverless platform to deploy a simple web application. The service is publicly accessible.

### Key Features

- **State Management:** Utilizes Google Cloud Storage for Terraform state storage, ensuring state consistency and collaboration.
- **Public API Accessibility:** Configures Cloud Run with no authentication, allowing public access to the deployed service.
- **Configurable Regions and Project:** Allows dynamic specification of the GCP project and region for resource deployment.

## Prerequisites

- Active GCP account with billing enabled.
- Permissions to manage Cloud Storage, Cloud Run, and IAM policies.
- Installed and configured `gcloud` SDK and `terraform` CLI.

## Configuration

### Variables

- **`project_id`**: The Google Cloud Platform project ID where resources will be created.
- **`region`**: Region to deploy the resources. Default is `us-central1`.
- **`bucket_name`**: Name of the Google Cloud Storage bucket to be created.
- **`text_to_test`**: Text value used for testing the deployed application, possibly in automated tests.

### Outputs

- **`app_url`**: URL endpoint of the deployed Cloud Run service.
- **`gcs_bucket_name`**: Outputs the name of the created GCS bucket.
- **`text_to_test`**: Reflects the input test text, useful for verification and testing purposes.

## Getting Started

1. **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
   
2. **Initialize Terraform:**
   ```bash
   terraform init
   ```

3. **Set the Required Variables:**
   Define the necessary variables in a `terraform.tfvars` file or export them as environment variables.
   ```hcl
   project_id = "your-gcp-project-id"
   bucket_name = "your-desired-bucket-name"
   ```

4. **Apply the Configuration:**
   Execute the apply command to create the infrastructure:
   ```bash
   terraform apply
   ```

5. **Access the Application:**
   Upon successful deployment, the `app_url` output will provide the endpoint to access your web application.

## Modules and Configurations

- **Provider Block**: Configures the Google Cloud provider with the specified project and region.
- **Terraform Backend**: GCS bucket is used to store the Terraform state. Ensure the bucket `tfstate-cicd-bucket` exists and is accessible.
- **IAM Policy**: Configures the service to be publicly accessible by assigning the `roles/run.invoker` role to all users.

## Important Notes

- **Security:** The Cloud Run service is deployed with public access (`allUsers`), which means anyone with the URL can access the application. Consider adding authentication for production environments.
- **Resource Cleaning:** Set up a CI process or manually destroy resources when no longer needed to avoid unexpected costs.

This setup provides a scalable and easy-to-manage solution for quickly deploying containerized applications using GCP Cloud Run, ideal for developers focused on microservices and automation.