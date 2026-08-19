terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.34"
    }
  }
}

resource "digitalocean_ssh_key" "default" {
  name       = "${var.project_name}-${var.environment}-key"
  public_key = var.ssh_public_key
}

resource "digitalocean_droplet" "app" {
  image      = "docker-20-04"
  name       = "${var.project_name}-${var.environment}"
  region     = var.region
  size       = var.droplet_size
  ssh_keys   = [digitalocean_ssh_key.default.fingerprint]
  tags       = [var.project_name, var.environment]
  monitoring = true

  user_data = <<-EOT
    #cloud-config
    package_update: true
    packages:
      - ca-certificates
      - curl
    runcmd:
      - systemctl enable --now docker
  EOT
}

resource "digitalocean_firewall" "app" {
  name        = "${var.project_name}-${var.environment}-fw"
  droplet_ids = [digitalocean_droplet.app.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = var.ssh_allowed_cidrs
  }
  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }
  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }
  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

resource "digitalocean_volume" "data" {
  region                  = var.region
  name                    = "${var.project_name}-${var.environment}-data"
  size                    = var.volume_size_gb
  initial_filesystem_type = "ext4"
  tags                    = [var.project_name, var.environment]
}
