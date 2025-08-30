import Link from 'next/link';
import { School, Users, Plus } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <School className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            School Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage school information efficiently with our comprehensive platform. 
            Add new schools and browse existing ones with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/addSchool">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-6 group-hover:bg-green-200 transition-colors">
                  <Plus className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Add New School
                </h2>
                <p className="text-gray-600 mb-6">
                  Register a new school with all necessary information including 
                  contact details, address, and school image.
                </p>
                <div className="text-green-600 font-medium group-hover:text-green-700">
                  Start Adding →
                </div>
              </div>
            </div>
          </Link>

          <Link href="/showSchools">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  View All Schools
                </h2>
                <p className="text-gray-600 mb-6">
                  Browse through all registered schools with a clean, 
                  responsive interface similar to e-commerce platforms.
                </p>
                <div className="text-blue-600 font-medium group-hover:text-blue-700">
                  Browse Schools →
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <School className="w-4 h-4" />
            <span>Built with Next.js, Drizzle ORM & MySQL</span>
          </div>
        </div>
      </div>
    </div>
  );
}