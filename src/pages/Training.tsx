import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Code,
  Database,
  Layers,
  Monitor,
} from "lucide-react";
import { toast } from "sonner";

const trainingPrograms = [
  {
    title: "GIS Essentials for Data Storytelling",
    description: "Master the fundamentals using ArcMap, ArcGIS Pro, and QGIS.",
    icon: <Layers className="h-6 w-6" />,
    level: "Beginner",
  },
  {
    title: "Python for Geo-Data Analysis",
    description: "Dive into automation with Google Colab, GeoPandas, and Folium.",
    icon: <Code className="h-6 w-6" />,
    level: "Intermediate",
  },
  {
    title: "Crafting Compelling Story Maps",
    description: "Master interactive narrative using the ESRI StoryMaps platform.",
    icon: <Monitor className="h-6 w-6" />,
    level: "Intermediate",
  },
  {
    title: "Remote Sensing for Extractives",
    description: "Apply satellite imagery for land use and environmental analysis.",
    icon: <Database className="h-6 w-6" />,
    level: "Advanced",
  },
];

const Training = () => {
  const handleCourseDetails = (courseName: string) => {
    toast.info(`${courseName} – contact us to enroll or learn more.`);
  };

  const handleViewAllTraining = () => {
    toast.info("Complete training catalog coming soon. Contact us for custom programs.");
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Learn. Map. Lead.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master Geospatial Skills with Borderless Maps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainingPrograms.map((program, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {program.icon}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {program.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {program.description}
                </CardDescription>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                  onClick={() => handleCourseDetails(program.title)}
                >
                  View Course Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white px-8"
            onClick={handleViewAllTraining}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Explore All Training Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Training;
