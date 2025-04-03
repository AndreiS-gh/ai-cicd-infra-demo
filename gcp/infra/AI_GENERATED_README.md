# Infrastructure as Code with Terraform

This repository manages the deployment of a simple infrastructure on Google Cloud Platform (GCP) using Terraform. It includes a Google Cloud Run service and a Google Cloud Storage (GCS) bucket. The configuration files here allow you to easily spin up and manage both the storage for your application’s state as well as the infrastructure itself.

## Infrastructure Overview

The infrastructure consists of:

- **Google Cloud Run Service**: Hosts a Docker container image for a simple web app. The service is publicly accessible.
- **Google Cloud Storage Bucket**: Utilized for general storage purposes, with the option to destroy content when the terraform infrastructure is destroyed.

## Key Components

### Terraform Configuration (`main.tf`)

- **GCS Backend**: `tfstate-cicd-bucket` used for storing Terraform's state file.
- **Provider**: Configured to use Google Cloud with required project and region variables.
- **Resources**:
  - **Google Storage Bucket**: Configured with `force_destroy` to allow immediate deletion.
  - **Google Cloud Run Service**: Deploys a Docker container from `gcr.io/${var.project_id}/simple-webapp`. The service serves 100% of traffic to the latest revision.
  - **IAM Policy for Cloud Run**: Grants public access to the service by assigning `roles/run.invoker` to `allUsers`.

### Variables (`variables.tf`)

- **project_id**: Your Google Cloud project ID. This is required for resource provisioning.
  
- **region**: The region where resources are deployed. Defaults to `us-central1`, but can be adjusted as needed.

- **bucket_name**: Name for the Google Cloud Storage bucket.

- **text_to_test**: Arbitrary text that can be used for testing purposes in the web app.

### Outputs (`outputs.tf`)

- **app_url**: The URL of the deployed Google Cloud Run service.
  
- **gcs_bucket_name**: The name of the provisioned Google Cloud Storage bucket.
  
- **text_to_test**: Outputs the provided test text.

## Usage

1. **Set Environment Variables**: Ensure you have set your Google Cloud SDK credentials or authenticated with a service account using the appropriate method.

2. **Initialize**: Run `terraform init` to initialize the configuration and install required providers and backend configuration.

3. **Plan**: Use `terraform plan` to see what changes will be made for the infrastructure setup.

4. **Apply**: Deploy the infrastructure using `terraform apply`. Approve the execution plan to create resources.

5. **Access the Application**: Once deployment is complete, the URL for the Google Cloud Run service is available in the output `app_url`.

## Notes

- Ensure your GCP credentials are correctly configured, and `gcloud` SDK is authenticated and set to the correct project.
- The chosen region and project must support the deployment of both Cloud Run services and Storage Buckets.
- Adjust the `bucket_name` variable to ensure a unique name in GCS, as GCS bucket names must be globally unique.

By utilizing this infrastructure setup, your application can be rapidly deployed to a scalable, serverless environment with Google Cloud Run, alongside storage support from Google Cloud Storage.