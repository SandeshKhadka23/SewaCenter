import { Link } from 'react-router-dom';
import {
    Droplets, Zap, Sparkles, BookOpen, Settings, Hammer,
    PaintBucket, Car, ChevronRight, Users
} from 'lucide-react';
import { categories } from '../../data/dummy';

const iconMap = {
    Droplets, Zap, Sparkles, BookOpen, Settings, Hammer, PaintBucket, Car,
};

export default function CategoriesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">All Service Categories</h1>
                <p className="text-slate-500 text-lg max-w-xl mx-auto">
                    Browse from {categories.length} categories to find the right professional for your needs.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((cat) => {
                    const Icon = iconMap[cat.icon] || Settings;
                    return (
                        <Link
                            key={cat.id}
                            to={`/categories/${cat.id}`}
                            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                        >
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute top-4 left-4">
                                    <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-sm">
                                        <Icon className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-lg leading-tight">{cat.name}</h3>
                                </div>
                            </div>

                            <div className="p-4">
                                <p className="text-sm text-slate-500 leading-relaxed mb-4">{cat.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-sm text-slate-600">
                                        <Users className="w-4 h-4 text-blue-500" />
                                        <span className="font-semibold text-slate-800">{cat.providerCount}</span> providers
                                    </span>
                                    <span className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                                        Browse <ChevronRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 text-white">
                <h2 className="text-2xl font-bold mb-3">Can't find your service?</h2>
                <p className="text-blue-100 mb-6">Tell us what you need and we'll connect you with the right provider.</p>
                <Link
                    to="/search"
                    className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                    Search All Services <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
