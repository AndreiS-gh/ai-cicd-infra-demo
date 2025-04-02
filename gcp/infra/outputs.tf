output "app_url" {
  value = google_cloud_run_service.default.status[0].url
}

output "gcs_bucket_name" {
  value = var.bucket_name
}

output "text_to_test" {
  value = var.text_to_test
}