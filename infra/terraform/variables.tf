variable "do_token" {
  type      = string
  sensitive = true
  default   = null
}

variable "region" {
  type    = string
  default = "sgp1"
}

variable "droplet_size" {
  type    = string
  default = "s-1vcpu-1gb"
}

variable "environment" {
  type    = string
  default = "production"
}

variable "domain" {
  type    = string
  default = "toanrobert.online"
}

variable "project_name" {
  type    = string
  default = "fe-agri"
}

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
