variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "Region where resources will be deployed"
  type        = string
  default     = "us-central1"
}

variable "bucket_name" {
  description = "Name of the GCS bucket"
  type        = string
}


variable "text_to_test" {
  description = "Text to test the site for"
  type        = string
}
