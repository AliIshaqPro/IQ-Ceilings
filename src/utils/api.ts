import { PricingResponse } from "@/types/pricing";
import { Project } from "@/types/project";

const API_BASE_URL = "https://iqfalseceilings.site/wp-json/custom/v1";

export const fetchPricingPlans = async (): Promise<PricingResponse> => {
  const response = await fetch(`${API_BASE_URL}/pricings`);
  if (!response.ok) {
    throw new Error("Failed to fetch pricing plans");
  }
  return response.json();
};

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

export const fetchProjectBySlug = async (slug: string): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects/slug/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }
  return response.json();
};

export const fetchProjectById = async (id: number): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }
  return response.json();
};
