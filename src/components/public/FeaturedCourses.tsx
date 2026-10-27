import React from 'react';
import {
  Clock,
  MapPin,
  User,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Course } from '../../types';
import { storageService } from '../../services/storage';

interface FeaturedCoursesProps {
  onSelectCourse: (courseId: string) => void;
  onOpenApply: (courseId?: string) => void;
  filterQuery?: string;
}

export const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({
  onSelectCourse,
  onOpenApply,
  filterQuery = '',
}) => {
  const allCourses = storageService.getCourses();
  const content = storageService.getSiteContent().courses;

  // Filter published courses
  const filtered = allCourses
    .filter((c) => c.published)
    .filter((c) => {
      if (!filterQuery) return c.featuredOnHome;
      const q = filterQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
      );
    });

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {filterQuery ? `Search Results for "${filterQuery}"` : content.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {content.description}
            </p>
          </div>

          <button
            onClick={() => onSelectCourse('')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All {allCourses.length} Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white">No courses match your query</h4>
            <p className="text-xs mt-1">Try searching for "RTL", "Verilog", "AXI", or "STA".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="group relative rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-cyan-950/40"
              >
                {/* Course Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                  {/* Mode & Category Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                      {course.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                      {course.mode}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                    <span className="flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {course.duration}
                    </span>
                    <span className="font-bold text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                      ₹{course.fee.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Course Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  {/* Trainer & Batch */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <User className="w-3.5 h-3.5 text-sky-400" />
                        {course.trainer}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400">
                        {course.modulesCount} Modules
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{course.batch}</span>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onSelectCourse(course.id)}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition"
                    >
                      Curriculum
                    </button>

                    <button
                      onClick={() => onOpenApply(course.id)}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-md shadow-cyan-500/20"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
