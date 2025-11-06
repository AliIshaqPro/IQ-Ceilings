export interface GalleryImage {
  url: string;
  name: string;
}

export interface PricingPlan {
  id: number;
  title: string;
  gallery: GalleryImage[];
}

export interface PricingResponse {
  data: PricingPlan[];
  page: number;
  total_pages: number;
  total: number;
}
