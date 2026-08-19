module "vps" {
  source = "./modules/vps-docker"

  project_name   = var.project_name
  environment    = var.environment
  region         = var.region
  droplet_size   = var.droplet_size
  ssh_public_key = var.ssh_public_key
  volume_size_gb = var.volume_size_gb
}

# Point the apex + www A records at the new droplet.
# Comment out if DNS is managed outside DigitalOcean.
resource "digitalocean_record" "app" {
  domain = var.domain
  type   = "A"
  name   = "@"
  value  = module.vps.droplet_ipv4
  ttl    = 300
}

resource "digitalocean_record" "app_www" {
  domain = var.domain
  type   = "A"
  name   = "www"
  value  = module.vps.droplet_ipv4
  ttl    = 300
}
