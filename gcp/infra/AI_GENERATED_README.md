# Terraform GCP Infrastructure for Demo Application

This repository contains Terraform configuration files that define infrastructure on Google Cloud Platform (GCP). The primary purpose of this infrastructure is to deploy a simple web application on Google Cloud Run and create a Google Cloud Storage (GCS) bucket.

## Prerequisites

- A GCP account with the necessary permissions to create and manage Cloud Run services and GCS buckets.
- Terraform installed on your local machine.
- Access to a Google Cloud project.

## Infrastructure Components

The configuration includes the following main parts:

- **Google Cloud Run Service**: Deploys a simple web application using an image hosted in Google's Container Registry. The application is publicly accessible.

- **Google Cloud Storage Bucket**: Creates a GCS bucket useful for storing various artifacts needed by the application. The bucket is configured to be deleted along with its contents when no longer needed (`force_destroy = true`).

- **IAM Policy for Cloud Run**: Assigns the `roles/run.invoker` to `allUsers` for the Cloud Run service, enabling it to be publicly accessible.

- **Null Resource**: Demonstrates the execution of a local command as part of the resource creation.

## Key Variables

The configuration uses input variables defined in `variables.tf` to customize the infrastructure. Here's a summary:

- `project_id`: (String) The Google Cloud Project ID where resources will be deployed.
  
- `region`: (String, Default: `us-central1`) The region within GCP where the resources are created.
  
- `bucket_name`: (String) The name for the GCS bucket to be created.

- `text_to_test`: (String) A variable intended for testing the deployed application.

## Outputs

The configuration defines outputs in `outputs.tf` to provide useful information after the deployment:

- `app_url`: The URL of the deployed web application on Google Cloud Run.

- `gcs_bucket_name`: The name of the GCS bucket created by the configuration.

- `text_to_test`: Outputs the value provided for testing purposes.

## Usage

1. **Initialize Terraform**:
   ```shell
   terraform init
   ```

2. **Validate the Configuration**:
   ```shell
   terraform validate
   ```

3. **Apply the Configuration**:
   ```shell
   terraform apply
   ```
   Confirm the apply operation when prompted.

4. **Access the Outputs**:
   After applying, Terraform provides the output values including the URL for the deployed application.

## Backend Configuration

The Terraform state is stored remotely using GCS. The backend configuration in `main.tf` points to a specific bucket and path (`prefix`) where the state file is saved.

## Considerations

- **Security**: Be cautious with publicly accessible services and opening roles to `allUsers`. Make sure the Cloud Run service does not expose sensitive data.

- **Cleanup**: To avoid incurring unnecessary charges, remember to destroy the resources using:
  ```shell
  terraform destroy
  ```

## Conclusion

This setup provides a streamlined way to deploy a simple web application on Google Cloud using Terraform. Modify the variables as needed to fit your specific use case and ensure the configurations align with your security and compliance requirements.