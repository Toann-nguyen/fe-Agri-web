terraform {
  required_version = ">= 1.5.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.34"
    }
  }
}

provider "digitalocean" {
  # Token from DIGITALOCEAN_TOKEN env or TF_VAR_do_token. Never hardcode.
}
