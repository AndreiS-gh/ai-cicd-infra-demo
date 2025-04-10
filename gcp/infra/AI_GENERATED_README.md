# Terraform GCP Infrastructure for Cloud Run Service

## Overview

This Terraform configuration is designed to deploy a simple application infrastructure on Google Cloud Platform (GCP), leveraging Cloud Run for serverless application hosting. The solution includes provisioning a Google Cloud Storage (GCS) bucket and deploying a Docker container to Cloud Run. Additionally, it configures public access to the Cloud Run service. The infrastructure is suitable for demo purposes and provides a ready-to-use environment for deploying simple web applications.

## Infrastructure Components

- **Google Cloud Storage (GCS) Bucket**
  - A GCS bucket is created to store files with the name specified in `bucket_name`.

- **Google Cloud Run Service**
  - A Cloud Run service is created to host a containerized application. The service pulls a Docker image from Google Container Registry (GCR), specified in the variable `project_id` and imaginery tagged as `simple-webapp`.

- **IAM Policy for Cloud Run**
  - Cloud Run service is configured to allow public access. All users are granted the `roles/run.invoker` role to allow unauthenticated invocations.

## Key Variables

- **`project_id`**: 
  - **Description**: GCP Project ID where the resources will be deployed.
  - **Type**: `string`

- **`region`**: 
  - **Description**: The GCP region where the resources will be deployed.
  - **Type**: `string`
  - **Default**: `us-central1`

- **`bucket_name`**: 
  - **Description**: The name of the Google Cloud Storage bucket to be created.
  - **Type**: `string`

- **`text_to_test`**: 
  - **Description**: A placeholder for demo purposes. This can be used for testing purposes, such as verifying content or operational workflows in a demo setting.
  - **Type**: `string`

## Outputs

- **`app_url`**: 
  - **Description**: The URL of the deployed Cloud Run service. This is the endpoint where the application can be accessed publicly.

- **`gcs_bucket_name`**: 
  - **Description**: The name of the Google Cloud Storage bucket created by the configuration.

- **`text_to_test`**: 
  - **Description**: The user-defined text intended for demonstration or testing purposes.

## Modules and Provisioners

- **Module: NA**
  - No external Terraform modules are used in this configuration. Resources are explicitly defined within the provided `.tf` files.

- **Provisioner: `null_resource`**
  - A `null_resource` is used to demonstrate provisioning with a local execution command, which will run `echo Demo resource created` upon the successful application of the Terraform configuration.

## Configuration and Usage

1. **Set up GCP credentials**: Ensure that the Google Cloud SDK is installed and configured on your machine with the appropriate credentials.

2. **Initialize Terraform**: Run `terraform init` to initialize the backend configuration (`gcs` for storing Terraform state files in a Google Cloud Storage bucket).

3. **Define Variables**: Create a `terraform.tfvars` file or specify variables directly within the command line for `project_id`, `bucket_name`, and any optional variables not covered by defaults.

4. **Apply Configuration**: Run `terraform apply` to create the resources defined in the configuration files. Review changes and confirm to provision the infrastructure.

5. **Access Outputs**: After the apply step, view the app's publicly accessible URL and other output values using `terraform output`.

This setup provides a straightforward demonstration infrastructure on GCP utilizing Terraform's robust scripting capabilities to provision and manage cloud resources.