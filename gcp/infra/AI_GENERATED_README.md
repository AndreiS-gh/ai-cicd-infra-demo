# Terraform Infrastructure for GCP Cloud Run and Storage

This Terraform configuration sets up a simple demonstration environment on Google Cloud Platform (GCP). It provisions a Cloud Run service for a containerized web application and a Google Cloud Storage (GCS) bucket. This setup is particularly useful for deploying lightweight web applications and storing associated data.

## Purpose of the Infrastructure

- **Google Cloud Run Service**: Hosts a containerized web application (`simple-webapp`) in a serverless environment, making it accessible over the web.
- **Google Cloud Storage Bucket**: Provides storage for any data or artifacts required by your application.
- **IAM Policy for Cloud Run**: Ensures the Cloud Run service is publicly accessible by setting the `roles/run.invoker` role for all users.

## Key Components

### Terraform Backend

- **Google Cloud Storage Backend**: Stores Terraform state files in a specified GCS bucket (`tfstate-cicd-bucket`), ensuring reliable state management and collaboration.

### Providers
- **Google Provider**: Manages resources on GCP. Requires:
  - `project_id`: The GCP Project ID.
  - `region`: The GCP region for resource deployment (default is `us-central1`).

### Resources

- **`google_storage_bucket` "demo_bucket"**: Creates a GCS bucket with the following attributes:
  - `name`: Dynamic bucket name specified via input variable.
  - `location`: Deployment region.
  - `force_destroy`: Automatically delete all objects in the bucket when the bucket itself is destroyed.

- **`google_cloud_run_service` "default"**: Deploys a containerized application with:
  - `name`: Fixed as `simple-webapp`.
  - `image`: Docker image specified from Google Container Registry using the project ID.
  - `traffic`: Redirects all traffic to the latest revision of the service.

- **`google_cloud_run_service_iam_policy` "noauth"**: Sets IAM policy to allow public access to the Cloud Run service.

- **`null_resource` "demo"**: A demo resource to showcase local execution provisioning. It includes a local script execution (`echo Demo resource created`).

## Variables

- **`project_id`**: **(Required)** GCP Project ID where resources are created.
- **`region`**: GCP region to deploy resources (default: `us-central1`).
- **`bucket_name`**: **(Required)** Name for the GCS bucket.
- **`text_to_test`**: Arbitrary text variable for testing, representing a sample site testing parameter.

## Outputs

- **`app_url`**: The URL where the Cloud Run service is accessible.
- **`gcs_bucket_name`**: The name of the created GCS bucket.
- **`text_to_test`**: Outputs the input text used for site testing purposes.

## Usage

1. **Initialize Terraform**: 
   ```bash
   terraform init
   ```
2. **Plan the Infrastructure**: 
   ```bash
   terraform plan
   ```
3. **Apply the Configuration**: 
   ```bash
   terraform apply
   ```
4. **Access Output Information**: View URLs and other useful data with:
   ```bash
   terraform output
   ```

This setup facilitates deployment of a simple web application on GCP, demonstrating Terraform's ability to automate and manage cloud infrastructure efficiently. Adjust the variables in `variables.tf` to match your specific project needs.