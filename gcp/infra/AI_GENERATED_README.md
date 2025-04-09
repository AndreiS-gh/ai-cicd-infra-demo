# Terraform Google Cloud Infrastructure

This README provides an overview of the Terraform configuration for deploying a simple Google Cloud Platform (GCP) infrastructure, leveraging Cloud Run and Cloud Storage.

## Purpose

This infrastructure setup:

- **Google Cloud Run**: Deploys a simple web application as a service.
- **Google Cloud Storage (GCS) Bucket**: Creates a bucket for storage purposes, such as state files.
- **IAM Policies**: Configures permissions to allow unauthenticated users to invoke the Cloud Run service.

## Components

### Terraform Backend

- **Google Cloud Storage (GCS)**: Used to store the Terraform state files. The config is set to use a specific GCS bucket and object prefix for the state files.

### Provider Definition

- **Google Provider**: Configured with a project ID and region to manage resources within a specified GCP project.

### Resources

- **`null_resource` "demo"**: Dummy resource used to output a demonstration message.
  
- **`google_storage_bucket` "demo_bucket"**: A Cloud Storage bucket that can be utilized for storing various objects such as logs or artifacts.

- **`google_cloud_run_service` "default"**: Deploys the `simple-webapp` container image onto Cloud Run, fully managed and assigned 100% traffic.

- **`google_cloud_run_service_iam_policy` "noauth"**: Grants public invoker permissions to the Cloud Run service.

## Variables

Variables are defined to enable reusable and configurable infrastructure:

- **`project_id`**: (String) The ID of the Google Cloud project where resources will be deployed. *(Mandatory)*

- **`region`**: (String) The region for deploying the resources with a default value of `us-central1`.

- **`bucket_name`**: (String) The name for the GCS bucket.

- **`text_to_test`**: (String) Placeholder for text used for testing the site.

## Outputs

Outputs provide easy access to key information about the deployed resources:

- **`app_url`**: The URL of the deployed Cloud Run service, allowing direct access.

- **`gcs_bucket_name`**: The name of the created GCS bucket.

- **`text_to_test`**: The text value provided for testing or demonstration purposes.

## Usage

To deploy this infrastructure, follow these steps:

1. **Initialize Terraform**:
   ```sh
   terraform init
   ```

2. **Plan the Deployment**:
   ```sh
   terraform plan
   ```

3. **Apply the Configuration**:
   ```sh
   terraform apply
   ```

Ensure you have the necessary permissions and Google Cloud SDK (with appropriate authentication) before applying the configuration. Adjust the `variables.tf` as needed to match your specific project requirements.