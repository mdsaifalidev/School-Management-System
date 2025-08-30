"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, School, MapPin, Loader2, AlertCircle } from "lucide-react"
import type { School as SchoolType } from "@/db/schema"

export default function ShowSchools() {
  const [schools, setSchools] = useState<SchoolType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/schools")

      if (!response.ok) {
        throw new Error("Failed to fetch schools")
      }

      const data = await response.json()
      setSchools(data.schools || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading schools...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              Error Loading Schools
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchSchools}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <School className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  All Schools
                </h1>
                <p className="text-gray-600">
                  {schools.length} school{schools.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            <Link
              href="/addSchool"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add New School
            </Link>
          </div>
        </div>

        {/* Schools Grid */}
        {schools.length === 0 ? (
          <div className="text-center py-16">
            <School className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No Schools Found
            </h2>
            <p className="text-gray-500 mb-6">
              There are no schools registered in the system yet.
            </p>
            <Link
              href="/addSchool"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block"
            >
              Add First School
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  {school.image ? (
                    <Image
                      src={school.image}
                      alt={school.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <School className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {school.name}
                  </h3>

                  <div className="flex items-start text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="line-clamp-2">{school.address}</div>
                      <div className="font-medium mt-1">
                        {school.city}, {school.state}
                      </div>
                    </div>
                  </div>

                  {/* Hidden details for larger screens */}
                  <div className="hidden lg:block mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500 space-y-1">
                      <div>📞 {school.contact}</div>
                      <div className="truncate">✉️ {school.email_id}</div>
                    </div>
                  </div>
                </div>

                {/* Hover overlay with contact info for mobile */}
                <div className="lg:hidden px-6 pb-6">
                  <div className="text-sm text-gray-500 space-y-1 pt-2 border-t border-gray-100">
                    <div>📞 {school.contact}</div>
                    <div className="truncate">✉️ {school.email_id}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add floating action button for mobile */}
        <div className="fixed bottom-6 right-6 sm:hidden">
          <Link
            href="/addSchool"
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <School className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}
