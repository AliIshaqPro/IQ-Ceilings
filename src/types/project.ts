export interface ProjectImage {
  url: string;
  name: string;
}

export interface ProjectACF {
  description: string;
  category: string;
  location: string;
  year_completed: string;
  project_images: ProjectImage[];
  project_videos: string[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  status: string;
  featured_image: string | null;
  acf: ProjectACF;
}

export interface ProjectsResponse {
  data?: Project[];
}
