import { getAllProjects } from "@/lib/markdown";
import GalleryView from "./GalleryView";

export default async function Gallery() {
  const projects = getAllProjects();
  return <GalleryView projects={projects} />;
}
