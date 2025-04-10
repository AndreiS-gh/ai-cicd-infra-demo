# Terraform Infrastructure Documentation

## Overview
This Terraform configuration is designed to set up a simple CI/CD infrastructure on Google Cloud Platform (GCP), featuring a Cloud Run service and a Google Cloud Storage (GCS) bucket. The purpose of this infrastructure is to provide a working, scalable environment for deploying and running containerized applications.

## Key Components
The main components created and configured by this Terraform script include:

1. **Google Cloud Storage Bucket**: Used for storing persistent data and Terraform state files.
2. **Google Cloud Run Service**: Hosts a simple web application that is containerized and can scale according to traffic.
3. **IAM Policy**: Configured to allow public access to the Cloud Run service by granting the `roles/run.invoker` role to all users.

## Configurations

### Terraform Backend
- **Backend Storage**: The state files are stored in a Google Cloud Storage bucket (`tfstate-cicd-bucket`) with a prefix for namespace management. This backend setup is crucial for managing the state of deployed resources in a collaborative environment.

### Providers
- **Google Provider**: Configured to interact with GCP resources. It requires specifying the GCP project and region for resource deployments.

### Resources
- **`null_resource` "demo"**: A provisioner that simply echoes a message on resource creation, more for demonstration purposes than functionality.
  
- **`google_storage_bucket` "demo_bucket"**: Automatically creates a GCS bucket with force destroy enabled for easy cleanup.
  
- **`google_cloud_run_service` "default"**: Deploys a containerized web service from an image located in Google Container Registry (GCR). Configured to route all traffic to the latest revision, ensuring all live requests hit the most up-to-date version.
  
- **`google_cloud_run_service_iam_policy` "noauth"**: Grants unauthenticated access to the Cloud Run service, allowing any user to access it.

## Variables
This configuration uses Terraform variables to parameterize deployments, enhancing reusability and adaptability. Key variables include:

- **`project_id`**: (String) The GCP Project ID where the resources will be created.
  
- **`region`**: (String) The region where resources are deployed. It defaults to `us-central1`.
  
- **`bucket_name`**: (String) Specifies the name of the GCS bucket.
  
- **`text_to_test`**: (String) An arbitrary string variable meant potentially for testing purposes within the web application.

## Outputs
Outputs provide important information about deployed resources; they can be used by other modules or teams:

- **`app_url`**: The external URL of the deployed Cloud Run service, allowing teams to access the web application.
  
- **`gcs_bucket_name`**: The name of the created GCS bucket, which might be useful for scripts or applications using this storage.
  
- **`text_to_test`**: The same string defined in `text_to_test` variable, outputted for verification or testing purposes.

## Conclusion
This Terraform configuration provides a streamlined, automated way to deploy a simple yet scalable web application on GCP using Cloud Run and a supporting GCS bucket for storage. Developers can easily adjust configurations through provided variables and access key deployment details via outputs, ensuring an efficient CI/CD process.