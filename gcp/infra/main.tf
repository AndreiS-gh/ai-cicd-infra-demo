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

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.default.location
  project  = google_cloud_run_service.default.project
  service  = google_cloud_run_service.default.name

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