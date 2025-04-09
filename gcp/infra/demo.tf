resource "null_resource" "demo" {
  provisioner "local-exec" {
    command = "echo Demo resource created"
  }
}
