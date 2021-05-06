output "kubernetes_endpoint" {
  sensitive = true
  value     = module.gke.endpoint
}

output "http_load_balancing_enabled" {
    value   = module.gke.http_load_balancing_enabled
  
}
