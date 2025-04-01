terraform {
  backend "gcs" {
    bucket  = "tfstate-cicd-bucket"
    prefix  = "terraform/ai-cicd-infra-demo/state"
  }
}

provider "google" {
  project     = var.project_id
  region      = var.region
}

resource "google_storage_bucket" "demo_bucket" {
  name          = var.bucket_name
  location      = var.region
  force_destroy = true
}
