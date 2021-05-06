variable "gcp_credentials"{
    default = "../key.json"
}

variable "gcp_project_id"{
    default = "exec-tut-cicd-kubernetes-react"
}

variable "gcp_region" {
    default = "europe-west2"
}

variable "gcp_gke_cluster_name" {
    default = "gke-react-with-cicd"
}

variable "gcp_gke_zones"{
    default = ["europe-west2-a","europe-west2-b", "europe-west2-c"]
}

variable "node_pool_name" {
    default = "here-rests-my-little-pods"
  
}

variable "gcp_service_account" {
    default = "gcp-464@exec-tut-cicd-kubernetes-react.iam.gserviceaccount.com"
  
}