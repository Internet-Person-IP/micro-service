module "gke" {
  source                     = "terraform-google-modules/kubernetes-engine/google"
  project_id                 = var.gcp_project_id
  name                       = var.gcp_gke_cluster_name
  region                     = var.gcp_region
  regional                   = true
  ip_range_pods              = ""
  ip_range_services          = ""
  zones                      = var.gcp_gke_zones
  network                    = "default"
  subnetwork                 = "default"
  http_load_balancing        = true
  horizontal_pod_autoscaling = true
  network_policy             = false

  node_pools = [
    {
      name               = var.node_pool_name
      machine_type       = "e2-medium"
      min_count          = 1
      max_count          = 2
      local_ssd_count    = 0
      disk_size_gb       = 10
      disk_type          = "pd-standard"
      image_type         = "COS"
      auto_repair        = true
      auto_upgrade       = true
      service_account    = var.gcp_service_account
      preemptible        = true
      initial_node_count = 1
    },
  ]

  node_pools_oauth_scopes = {
    all = []

    default-node-pool = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  node_pools_labels = {
    all = {}

    default-node-pool = {
      default-node-pool = true
    }
  }

  node_pools_metadata = {
    all = {}

    default-node-pool = {
      node-pool-metadata-custom-value = "my-node-pool"
    }
  }

  node_pools_taints = {
    all = []

    default-node-pool = [
      {
        key    = "default-node-pool"
        value  = true
        effect = "PREFER_NO_SCHEDULE"
      },
    ]
  }

  node_pools_tags = {
    all = []

    default-node-pool = [
      "default-node-pool",
    ]
  }
}


resource "google_cloudbuild_trigger" "filename-trigger" {
  github {
    owner = "Internet-Person-IP"
    name   = "GKE-CI-CD-Tutorial"
    push {
      branch = "master"
    }
  }
  filename = "cloudbuild.yaml"
}