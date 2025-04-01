provider "google" {
  credentials = file("gcp-key.json")  # This will be set up in CI/CD
  project     = var.project_id
  region      = var.region
}

resource "google_storage_bucket" "demo_bucket" {
  name          = var.bucket_name
  location      = var.region
  force_destroy = true
}
