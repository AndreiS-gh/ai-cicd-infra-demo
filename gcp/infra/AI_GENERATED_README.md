# Terraform Google Cloud Platform Infrastructure

This repository contains Terraform configuration files to deploy a simple demonstration infrastructure on Google Cloud Platform (GCP). The setup includes a Cloud Run service running a simple web application, and a Google Cloud Storage (GCS) bucket. This infrastructure can be useful for experimenting with Google Cloud services or testing CI/CD pipelines.

## Infrastructure Components

The infrastructure consists of the following components:

1. **Google Cloud Storage Bucket**:
   - A GCS bucket is provisioned with a name specified by the user.
   - It is configured to allow for destruction when running `terraform destroy`.

2. **Google Cloud Run Service**:
   - A simple web application is deployed as a Cloud Run service.
   - The container image is sourced from the Google Container Registry (GCR).
   - The service is publicly accessible to all users with no authentication required.

3. **IAM Policy for Cloud Run**:
   - IAM policy is applied to allow all users to invoke the Cloud Run service, making it public.

4. **Null Resource for Demo Purposes**:
   - A `null_resource` is included as an example resource that simply echoes a message to demonstrate resource creation.

## Key Variables

- **project_id**: *(Required)* The ID of the GCP project where resources will be deployed.
- **region**: The region where resources will be deployed. Defaults to `us-central1`.
- **bucket_name**: *(Required)* The name of the GCS bucket to be created.
- **text_to_test**: Arbitrary text intended for testing the deployed web application.

## Outputs

- **app_url**: The URL where the deployed Cloud Run application is accessible.
- **gcs_bucket_name**: The name of the created GCS bucket.
- **text_to_test**: The test text specified in the variables, confirming the setup.

## Usage

1. **Pre-requisites**:
   - Ensure you have Terraform installed.
   - Have GCP credentials configured, and your project ID is available.

2. **Deploying the Infrastructure**:
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

3. **Accessing the Application**:
   - Once deployed, check the output (`app_url`) for the URL to access the Cloud Run service.

4. **Destroying the Infrastructure**:
   ```bash
   terraform destroy
   ```

## Backend Configuration

This configuration uses Google Cloud Storage (GCS) for storing Terraform state files. Ensure that the specified GCS bucket (`tfstate-cicd-bucket`) exists or adjust accordingly in the `main.tf`.

## Additional Notes

- Remember to create the necessary IAM roles and permissions in GCP for Terraform to deploy the resources successfully.
- `local-exec` provisioner in `null_resource` is meant for demonstration and can be removed or adjusted based on real-world needs.
- The infrastructure is suitable for development and testing purposes and should be considered for production usage with necessary modifications and security assessments.