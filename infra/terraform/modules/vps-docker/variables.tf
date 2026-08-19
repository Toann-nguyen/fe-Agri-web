variable "project_name" { type = string }
variable "environment" { type = string }
variable "region" { type = string }
variable "droplet_size" { type = string }
variable "ssh_public_key" {
  type      = string
  sensitive = true
}
variable "ssh_allowed_cidrs" {
  type    = list(string)
  default = ["0.0.0.0/0"]
}
variable "volume_size_gb" {
  type    = number
  default = 10
}
