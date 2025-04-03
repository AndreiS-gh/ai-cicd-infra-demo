# Infrastructure as Code for Cloud Run and Cloud Storage on GCP

This Terraform configuration sets up a simple Google Cloud Platform (GCP) infrastructure consisting of a Cloud Run service and a Google Cloud Storage (GCS) bucket. The goal is to demonstrate a basic Continuous Integration and Continuous Deployment (CI/CD) pipeline using Terraform to manage cloud resources. It includes configurations for deploying a Docker-based web application to Cloud Run, setting IAM policies, and managing state with Google Cloud Storage.

## Prerequisites

1. **Terraform**: Ensure you have Terraform installed on your system. Follow the installation guide from [Terraform's official site](https://www.terraform.io/downloads).
2. **Google Cloud SDK**: Make sure you have the gcloud command-line tool set up for deploying resources.
3. **Google Cloud Account**: You should have access to a Google Cloud account with permissions to create resources.

## Components

### Terraform Backend Configuration

```hcl
terraform {
  backend "gcs" {
    bucket  = "tfstate-cicd-bucket"
    prefix  = "terraform/ai-cicd-infra-demo/state"
  }
}
```

This snippet configures Terraform to use Google Cloud Storage to store its state files. Ensure the GCS bucket (`tfstate-cicd-bucket`) exists or adjust this configuration accordingly.

### Providers

```hcl
provider "google" {
  project     = var.project_id
  region      = var.region
}
```

The Google provider is configured to allow Terraform to manage GCP services. It requires specifying your GCP project ID and the desired region to deploy resources.

### Resources

#### Google Cloud Storage Bucket

```hcl
resource "google_storage_bucket" "demo_bucket" {
  name          = var.bucket_name
  location      = var.region
  force_destroy = true
}
```

This resource sets up a GCS bucket with a specified name and region. The `force_destroy` option ensures the bucket is deleted along with all its contents when the infrastructure is destroyed.

#### Google Cloud Run Service

```hcl
resource "google_cloud_run_service" "default" {
  name     = "simple-webapp"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/simple-webapp"
      }
    }
  }

  traffic {
    latest_revision = true
    percent         = 100
  }
}
```

The Cloud Run service deploys a containerized web application stored in the Google Container Registry (GCR). It routes all traffic to the latest revision of the app.

#### Cloud Run IAM Policy

```hcl
resource "google_cloud_run_service_iam_policy" "noauth" {
  ...
  policy_data = <<POLICY
  {
    "bindings": [
      {
        "members": [
          "allUsers"
        ],
        "role": "roles/run.invoker"
      }
    ]
  }
  POLICY
}
```

This section grants public (unauthenticated) access to your Cloud Run service, making the app accessible to everyone on the internet. Adjust permissions based on your security requirements.

## Key Variables

### project_id

- **Description**: GCP Project ID where resources will be deployed.
- **Type**: `string`

### region

- **Description**: Geographical region for resource deployment.
- **Type**: `string`
- **Default**: `us-central1`

### bucket_name

- **Description**: Name of the GCS bucket to be created.
- **Type**: `string`

### text_to_test

- **Description**: This variable holds a string to test the web application.
- **Type**: `string`

## Outputs

### app_url

- **Description**: The URL of the deployed Cloud Run service.
- **Value**: `google_cloud_run_service.default.status[0].url`

### gcs_bucket_name

- **Description**: The name of the created GCS bucket.
- **Value**: `var.bucket_name`

### text_to_test

- **Description**: Echoes the textual input provided.
- **Value**: `var.text_to_test`

## Deployment Instructions

1. **Initialize Terraform**: Run `terraform init` to initialize the working directory and download necessary plugins.
2. **Plan Infrastructure**: Use `terraform plan` to see what changes will occur in your infrastructure.
3. **Apply Configuration**: Deploy resources with `terraform apply`. Confirm the changes when prompted.

Ensure you carefully review and update variables in `variables.tf` before deploying the infrastructure to suit your specific needs. Adjust access controls and settings based on your requirements for security and compliance.