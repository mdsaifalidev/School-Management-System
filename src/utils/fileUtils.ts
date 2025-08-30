import cloudinary, { CloudinaryUploadResult } from "@/utils/cloudinary"

export async function uploadToCloudinary(file: File): Promise<string> {
  try {
    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64String = `data:${file.type};base64,${buffer.toString("base64")}`

    // Upload to Cloudinary
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader.upload(
          base64String,
          {
            folder: "school-management/schools", // Organize uploads in folders
            resource_type: "auto",
            transformation: [
              { width: 800, height: 600, crop: "limit" }, // Resize large images
              { quality: "auto" }, // Optimize quality automatically
              { fetch_format: "auto" }, // Use best format for browser
            ],
          },
          (error, result) => {
            if (error) {
              reject(error)
            } else if (result) {
              resolve(result as CloudinaryUploadResult)
            } else {
              reject(new Error("Upload failed"))
            }
          }
        )
      }
    )

    return result.secure_url
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw new Error("Failed to upload image to Cloudinary")
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error("Cloudinary delete error:", error)
    throw new Error("Failed to delete image from Cloudinary")
  }
}

export function extractPublicIdFromUrl(url: string): string | null {
  try {
    // Extract public_id from Cloudinary URL
    const matches = url.match(/\/v\d+\/(.+)\./)
    return matches ? matches[1] : null
  } catch {
    return null
  }
}

export function validateFileType(file: File): boolean {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  return allowedTypes.includes(file.type)
}

export function validateFileSize(
  file: File,
  maxSize: number = 10 * 1024 * 1024
): boolean {
  // Increased to 10MB since Cloudinary will optimize
  return file.size <= maxSize
}
