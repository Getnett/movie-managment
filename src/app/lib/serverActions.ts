"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import pool from "../data/data";
import MoviesRepo from "../repos/movie";

export type State = {
  errors?: {
    title?: string[];
    year?: string[];
    rating?: string[];
    description?: string[];
  };
  message?: string | null;
};

// name: z.string().min(1, { message: "Name is required" }),
const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title cannot be empty",
  }),
  year: z.string().min(1, {
    message: "Year cannot be empty",
  }),
  //   imageUrl: z.string(),
  description: z.string().min(1, {
    message: "Description cannot be empty",
  }),
  rating: z.string().min(1, {
    message: "Rating cannot be empty",
  }),
});

const UpdateMoveSchema = FormSchema;

export async function updateMovie(
  id: string,
  _prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateMoveSchema.safeParse({
    title: formData.get("title"),
    year: formData.get("year"),
    description: formData.get("description"),
    rating: formData.get("rating"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  try {
    const formDataObject = {
      ...validatedFields.data,
      year: parseInt(validatedFields.data.year),
      rating: parseInt(validatedFields.data.rating),
      imageUrl:
        "https://www.catster.com/wp-content/uploads/2017/08/Pixiebob-cat.jpg",
    };
    await pool.connect({
      connectionString: process.env.DATABASE_URL,
    });

    await MoviesRepo.update(id, formDataObject);
  } catch (error) {
    return {
      errors: null,
      message: "Database Error: Failed to Update Invoice.",
    };
  } finally {
    pool.close();
  }

  revalidatePath("/");
  redirect("/");
}

export async function creatMovie(_prevState: State, formData: FormData) {
  // change  UpdateMoveSchema
  const validatedFields = UpdateMoveSchema.safeParse({
    title: formData.get("title"),
    year: formData.get("year"),
    description: formData.get("description"),
    rating: formData.get("rating"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  try {
    const formDataObject = {
      ...validatedFields.data,
      year: parseInt(validatedFields.data.year),
      rating: parseInt(validatedFields.data.rating),
      imageUrl:
        "https://www.catster.com/wp-content/uploads/2017/08/Pixiebob-cat.jpg",
    };
    await pool.connect({
      connectionString: process.env.DATABASE_URL,
    });

    await MoviesRepo.create(formDataObject);
  } catch (error) {
    return {
      errors: null,
      message: "Database Error: Failed to create movie",
    };
  } finally {
    pool.close();
  }

  revalidatePath("/");
  redirect("/");
}
