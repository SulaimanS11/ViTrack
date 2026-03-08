import { ExternalLink, BookOpen, HeartPulse, Building2 } from "lucide-react";
import { Resource } from "@/types";

export default function ResourcePin({ resource }: { resource: Resource }) {
  const getIcon = () => {
    switch (resource.type) {
      case "Article": return <BookOpen className="w-4 h-4 text-blue-600" />;
      case "Provider": return <HeartPulse className="w-4 h-4 text-emerald-600" />;
      case "Nonprofit": return <Building2 className="w-4 h-4 text-orange-600" />;
      default: return <ExternalLink className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <a 
      href={resource.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex flex-col p-3 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center space-x-2 mb-1">
        {getIcon()}
        <span className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {resource.resource_title}
        </span>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2 pl-6">
        {resource.description}
      </p>
    </a>
  );
}
