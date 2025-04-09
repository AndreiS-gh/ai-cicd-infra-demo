# AI-CICD Infrastructure Demo

This Terraform configuration sets up a demo infrastructure on Google Cloud Platform (GCP) to support a simple AI-driven Continuous Integration and Continuous Deployment (CI/CD) process. It includes a Google Cloud Storage (GCS) bucket and a Google Cloud Run service to host a web application.

## Infrastructure Components

### 1. Google Cloud Storage Bucket

- **Resource**: `google_storage_bucket.demo_bucket`
- **Purpose**: This GCS bucket serves as a storage solution and can be utilized to store states or assets for the CI/CD process.
- **Key Configuration:**
  - **Name**: Configured via the `bucket_name` variable.
  - **Location**: Set through `region` variable; defaults to `us-central1`.
  - **Force Destroy**: Enabled to allow deletion of non-empty buckets during resource destruction.

### 2. Google Cloud Run Service

- **Resource**: `google_cloud_run_service.default`
- **Purpose**: Deploys a containerized web application to Google Cloud Run, scaling automatically as needed.
- **Key Configuration:**
  - **Image**: Runs a Docker image from Google Container Registry (GCR) identified by `gcr.io/${var.project_id}/simple-webapp`.
  - **Traffic**: All traffic routed to the latest revision, indicated by `latest_revision = true`.

### 3. IAM Policy for Cloud Run

- **Resource**: `google_cloud_run_service_iam_policy.noauth`
- **Purpose**: Configures the Cloud Run service to allow unauthenticated access.
- **Key Configuration**:
  - Grants `roles/run.invoker` role to `allUsers`, making the web app publicly accessible.

### 4. Null Resource

- **Resource**: `null_resource.demo`
- **Purpose**: Serves as a basic demonstration of local execution through Terraform's `local-exec` provisioner, primarily for testing.
- **Execution**: Outputs a simple message indicating successful creation.

## Configuration Files Overview

- **`main.tf`**: Contains the core configuration for the GCP resources.
- **`variables.tf`**: Defines input variables such as `project_id`, `region`, `bucket_name`, and `text_to_test` that allow user-specified configuration.
- **`outputs.tf`**: Specifies the outputs provided after Terraform execution, including the application URL and bucket name.

## Key Variables

- **project_id**: (string) GCP project ID where resources will be created.
- **region**: (string) Region for resource deployment. Default is `us-central1`.
- **bucket_name**: (string) Name of the Google Cloud Storage bucket.
- **text_to_test**: (string) A customizable string used for testing purposes.

## Outputs

- **app_url**: URL endpoint where the web application is accessible post-deployment.
- **gcs_bucket_name**: Name of the created storage bucket, echoing the input variable.
- **text_to_test**: Reflects the `text_to_test` variable used for test verification.

## Usage

1. **Initialize**: Run `terraform init` to prepare your working directory.
2. **Plan**: Execute `terraform plan` to preview the resource creation.
3. **Apply**: Use `terraform apply` to build the specified infrastructure.
4. **Destroy**: Clean up resources with `terraform destroy` when no longer needed.

This setup is ideal for individuals looking to demonstrate simple GCP deployments or integrate basic cloud-native components into AI-driven CI/CD workflows.