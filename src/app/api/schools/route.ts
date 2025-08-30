import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/index"
import { schools } from "@/db/schema"
import {
  uploadToCloudinary,
  validateFileType,
  validateFileSize,
} from "@/utils/fileUtils"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const contact = formData.get("contact") as string
    const email_id = formData.get("email_id") as string
    const image = formData.get("image") as File

    // Validate required fields
    if (
      !name ||
      !address ||
      !city ||
      !state ||
      !contact ||
      !email_id ||
      !image
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate file
    if (!validateFileType(image)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only JPEG, JPG, PNG, and WebP are allowed.",
        },
        { status: 400 }
      )
    }

    if (!validateFileSize(image)) {
      return NextResponse.json(
        { error: "File size too large. Maximum size is 10MB." },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate contact number
    const contactRegex = /^[0-9]{10}$/
    if (!contactRegex.test(contact)) {
      return NextResponse.json(
        { error: "Contact number must be exactly 10 digits" },
        { status: 400 }
      )
    }

    // Upload image to Cloudinary
    let imageUrl: string
    try {
      imageUrl = await uploadToCloudinary(image)
    } catch (error) {
      console.error("Cloudinary upload error:", error)
      return NextResponse.json(
        { error: "Failed to upload image. Please try again." },
        { status: 500 }
      )
    }

    // Insert into database
    const [result] = await db.insert(schools).values({
      name,
      address,
      city,
      state,
      contact,
      email_id,
      image: imageUrl,
    })

    return NextResponse.json(
      {
        message: "School added successfully!",
        id: result.insertId,
        imageUrl,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error adding school:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const allSchools = await db.select().from(schools)

    return NextResponse.json({
      schools: allSchools,
    })
  } catch (error) {
    console.error("Error fetching schools:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
