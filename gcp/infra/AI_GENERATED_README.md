# AI CI/CD Infrastructure Demo

This Terraform configuration sets up a basic cloud infrastructure on Google Cloud Platform to support a simple web application deployed on Cloud Run, along with a Google Cloud Storage bucket. This setup is part of an AI-based Continuous Integration and Continuous Deployment (CI/CD) demonstration.

## Infrastructure Overview

The Terraform configuration accomplishes the following:

- **Google Cloud Storage (GCS) Bucket**: Creates a GCS bucket, which is useful for storing artifacts or any additional data needed during the application lifecycle.
  
- **Google Cloud Run Service**: Deploys a simple web application via Cloud Run, ensuring scalability and managed serverless architecture. The service is publicly accessible, as defined by its IAM policy.

- **IAM Policy for Cloud Run**: Assigns the `roles/run.invoker` role to all users (`allUsers`), allowing public access to the deployed application.

## Key Terraform Components

### Backend Configuration

The Terraform backend is configured to use a Google Cloud Storage bucket to store the Terraform state files.

```hcl
backend "gcs" {
  bucket  = "tfstate-cicd-bucket"
  prefix  = "terraform/ai-cicd-infra-demo/state"
}
```

### Providers

A Google Cloud provider is specified to manage the provisioning of resources with appropriate credentials tied to a specific GCP project and region.

```hcl
provider "google" {
  project = var.project_id
  region  = var.region
}
```

### Resources

1. **Google Storage Bucket**
   - Managed by the `google_storage_bucket` resource.
   - Deletes all objects upon destroy with `force_destroy = true`.

2. **Cloud Run Service**
   - Managed by the `google_cloud_run_service` resource.
   - Deploys a Docker container from Google Container Registry to Cloud Run.

3. **Cloud Run IAM Policy**
   - Managed by the `google_cloud_run_service_iam_policy` resource.
   - Configures public access by allowing all users to invoke the service.

## Variables

The configuration utilizes several variables defined in `variables.tf`:

- **`project_id`**: The GCP Project ID where resources will be deployed.
- **`region`** (default: `us-central1`): The GCP region for resource deployment.
- **`bucket_name`**: The name of the GCS bucket to be created.
- **`text_to_test`**: Arbitrary text variable for test purposes.

## Outputs

After application deployment, key information is exposed via outputs:

- **`app_url`**: The URL of the deployed Cloud Run application.
- **`gcs_bucket_name`**: The name of the created GCS bucket.
- **`text_to_test`**: Test text, useful for validating configurations or scripts that require external input.

### Example Command

To deploy this infrastructure, use the following Terraform commands:

```bash
terraform init
terraform apply -var="project_id=<your-gcp-project-id>" -var="bucket_name=<your-bucket-name>" -var="text_to_test=<your-test-text>"
```

Replace `<your-gcp-project-id>`, `<your-bucket-name>`, and `<your-test-text>` with appropriate values.

## Conclusion

This Terraform setup provides a simple yet effective way to manage the lifecycle of an AI-based CI/CD infrastructure on Google Cloud. It highlights the use of Cloud Run for simplified serverless application deployment and GCS for data storage, alongside public access configuration using IAM policies.