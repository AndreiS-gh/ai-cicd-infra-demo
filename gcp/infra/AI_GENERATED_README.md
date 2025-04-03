# Terraform Configuration for AI-CICD Infrastructure Demo

This Terraform configuration sets up a basic infrastructure on Google Cloud Platform (GCP) to demonstrate continuous integration and continuous deployment (CI/CD) capabilities for an AI-based web application. Key components include a Google Cloud Storage bucket and a serverless web application deployed on Google Cloud Run. The setup allows for auto-scaling and easy deployments without server management.

## Table of Contents

- [Overview](#overview)
- [Infrastructure Components](#infrastructure-components)
- [Configuration Variables](#configuration-variables)
- [Outputs](#outputs)
- [Usage](#usage)

## Overview

This configuration files contain definitions for deploying:

- A Google Cloud Storage (GCS) bucket for storing state files and other resources.
- A Google Cloud Run service that hosts a simple web application.
- IAM policy for the Cloud Run service to allow public access.

## Infrastructure Components

### Google Cloud Storage Bucket

- **Purpose:** Used primarily as a backend to store Terraform state files and can be leveraged to store other resources or outputs related to CI/CD pipeline processes.
- **Key Property:**
  - `force_destroy = true`: Ensures that the bucket and its contents are removed when destroying the infrastructure.

### Google Cloud Run Service

- **Purpose:** Deploys a containerized version of a simple web application. Provides an auto-scaling mechanism to handle web traffic efficiently.
- **Key Properties:**
  - `image`: Docker image location for the web application stored in Google Container Registry. Substitute `${var.project_id}` with your GCP Project ID.
  - `traffic`: Directs 100% of user requests to the latest revision automatically.

### IAM Policy for Cloud Run

- **Purpose:** Grants permission for all users to invoke the Cloud Run service.
- **Policy Details:** 
  - Assigns `roles/run.invoker` role to `allUsers`, making the service accessible over the public internet.

## Configuration Variables

Defined in `variables.tf`, these are parameters that can be customized per deployment:

- **`project_id`**: (string) Your GCP Project ID. This is a mandatory field.
- **`region`**: (string) The geographical region for deploying resources. Default is `us-central1`.
- **`bucket_name`**: (string) The name for the GCS bucket used in the deployment.
- **`text_to_test`**: (string) An arbitrary variable you can use to test the site or customize configurations.

## Outputs

Defined in `outputs.tf`, these outputs provide useful information post-deployment:

- **`app_url`**: The URL of the deployed Cloud Run service. This is the endpoint for the web application.
- **`gcs_bucket_name`**: The name of the GCS bucket used, useful for verification and reference.
- **`text_to_test`**: Reflects back your input for `text_to_test` for confirmation or validation purposes.

## Usage

To deploy this infrastructure configuration, follow these steps:

1. **Initialize Terraform**:
   ```bash
   terraform init
   ```
   This initializes the working directory with respective plugins corresponding to GCP.

2. **Plan the Deployment**:
   ```bash
   terraform plan
   ```
   This will show a preview of the infrastructure changes Terraform will make.

3. **Apply the Deployment**:
   ```bash
   terraform apply
   ```
   This will create or manage the infrastructure as per the configurations.

4. After deployment, access your web application using the URL provided in the `app_url` output.

Remember to ensure proper IAM permissions and billing enabled in your GCP account for resource creation. This Terraform setup is optimized for demonstration and educational purposes, and might need additional configurations for production-grade implementations.