import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Globe } from "lucide-react";
import { toast } from "sonner";

import waterAccessMap from "@/assets/water-access-map.jpg";
import urbanPlanningDashboard from "@/assets/urban-planning-dashboard.jpg";
import albertineGrabenMap from "@/assets/albertine-graben-map.jpg";

const portfolioProjects = [
  {
    title: "Albertine Graben Oil and Gas Discoveries",
    sector: "Extractives",
    description:
      "Comprehensive mapping of oil and gas discoveries in the Albertine Graben region of Uganda, featuring detailed cartographic analysis and spatial visualization.",
    image: albertineGrabenMap,
    impact: "Enhanced resource exploration planning",
  },
  {
    title: "Water Access Mapping in Northern Uganda",
    sector: "Public Health",
    description:
      "Interactive dashboard helping NGOs optimize resource deployment and measure accessibility gaps across districts.",
    image: waterAccessMap,
    impact: "15% increase in served communities",
  },
  {
    title: "Urban Planning Dashboard",
    sector: "Government",
    description:
      "Story map combining demographic data with infrastructure for evidence-based development in growing urban centers.",
    image: urbanPlanningDashboard,
    impact: "Streamlined city development decisions",
  },
];

const Portfolio = () => {
  const handleConsultationRequest = () => {
    toast.info("We’d love to discuss a project with you!");
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Maps That Tell Powerful Stories & Drive Impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      {project.sector}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {project.description}
                    </CardDescription>
                    <div className="flex items-center text-sm text-primary font-medium">
                      <Star className="h-4 w-4 mr-1" />
                      Impact: {project.impact}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{project.title}</DialogTitle>
                  <DialogDescription>
                    {project.sector} • {project.impact}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <p className="text-base">{project.description}</p>
                  <div className="flex gap-4">
                    <Button onClick={handleConsultationRequest}>
                      Request Similar Project
                    </Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
