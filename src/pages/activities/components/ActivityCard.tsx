interface ActivityCardProps {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  description: string;
  categoryColor: string;
  onOpenLightbox: (id: number) => void;
}

export default function ActivityCard({
  id,
  title,
  date,
  location,
  category,
  image,
  description,
  categoryColor,
  onOpenLightbox,
}: ActivityCardProps) {
  return (
    <div
      className="group rounded-xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white"
      onClick={() => onOpenLightbox(id)}
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#003082]/0 group-hover:bg-[#003082]/30 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/0 group-hover:bg-white/90 transition-all duration-300 scale-0 group-hover:scale-100">
            <i className="ri-zoom-in-line text-[#003082] text-xl" />
          </div>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColor}`}>
            {category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-[#1a2b4a] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#003082] transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <i className="ri-calendar-line text-[#003082]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="ri-map-pin-line text-[#c0392b]" />
            <span className="truncate max-w-[110px]">{location.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
