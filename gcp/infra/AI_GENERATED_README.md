<<<<<<< Updated upstream
# Infrastructure as Code for Cloud Run and Cloud Storage on GCP

This Terraform configuration sets up a simple Google Cloud Platform (GCP) infrastructure consisting of a Cloud Run service and a Google Cloud Storage (GCS) bucket. The goal is to demonstrate a basic Continuous Integration and Continuous Deployment (CI/CD) pipeline using Terraform to manage cloud resources. It includes configurations for deploying a Docker-based web application to Cloud Run, setting IAM policies, and managing state with Google Cloud Storage.
=======
# AI CI/CD Infra Demo with Terraform

This Terraform configuration sets up a simple continuous integration and delivery (CI/CD) infrastructure on Google Cloud Platform (GCP) for a web application. It provisions a Cloud Run service to host the application and a Google Cloud Storage bucket to store artifacts or other necessary files.
>>>>>>> Stashed changes

## Prerequisites

<<<<<<< Updated upstream
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
=======
The setup includes the following components:

- **Google Cloud Storage Bucket**: A bucket is created to store essential files with an option to forcibly destroy the bucket when the infrastructure is torn down.
- **Google Cloud Run**: A serverless platform to run a Docker containerized web application (`simple-webapp`) provisioned in the specified region.
- **IAM Policy for Cloud Run**: Sets the IAM policy to allow public access, enabling anyone to invoke the application.

## Terraform Configuration

### `main.tf`

- **Backend Configuration**: 
  - Uses a Google Cloud Storage bucket (`tfstate-cicd-bucket`) to store Terraform state files.

- **Provider Configuration**: 
  - Specifies `google` as the provider, with `project_id` and `region` sourced from input variables for flexibility across environments.

- **Resource Block for Google Storage Bucket**:
  ```hcl
  resource "google_storage_bucket" "demo_bucket" {
    name          = var.bucket_name
    location      = var.region 
    force_destroy = true
  }
  ```
  Defines the storage bucket that can be easily managed and destroyed with the `force_destroy` option set to true.

- **Cloud Run Service Resource**:
  ```hcl
  resource "google_cloud_run_service" "default" {
    name     = "simple-webapp"
    location = var.region
    ...
  }
  ```
  Deploys a containerized web application, `simple-webapp`, on Google Cloud Run, handling traffic using the latest service revision.

- **IAM Policy for Cloud Run**:
  - Grants the role of `roles/run.invoker` to `allUsers` to make the service publicly accessible.

### `outputs.tf`

- **app_url**: Outputs the URL of the deployed Cloud Run service, providing an endpoint to test and access the web application.
- **gcs_bucket_name**: Outputs the name of the storage bucket, which might be used for any documentation or debugging purposes.
- **text_to_test**: Outputs the testing text which might be used to verify the landing page or any content served by the web app.

### `variables.tf`

Contains input variables for configuring the deployment environment:
- `project_id`: Specifies the Google Cloud project ID.
- `region`: Defaults to `us-central1` but can be overridden for deploying in other regions.
- `bucket_name`: The unique name for the storage bucket.
- `text_to_test`: Any specific text content you want to verify with the web application.

## Usage

To use this infrastructure setup, ensure you have Terraform installed and authenticated with Google Cloud SDK. Update the `variables.tf` file with your desired configurations or pass values directly when running the Terraform commands.

Initialize and apply the Terraform configuration with:
```bash
terraform init
terraform apply
```

After deployment, you can expect the application to be accessible at the URL provided by the `app_url` output. This infrastructure provides a basic framework that can be further expanded to include build and deploy stages in a CI/CD pipeline.

## Prerequisites

- Google Cloud Account
- Enabled Cloud Run API
- Configured GCloud CLI with appropriate permissions

This setup provides a foundational demonstration of deploying a web application using Terraform on GCP. Further enhancements and customizations can be made as per project needs.
>>>>>>> Stashed changes
