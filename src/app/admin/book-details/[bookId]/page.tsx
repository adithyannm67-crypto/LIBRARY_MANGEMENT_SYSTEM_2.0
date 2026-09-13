import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ bookId: string }>;
}

export default async function AdminBookDetailsPage({ params }: Props) {
  const { bookId } = await params;
  redirect(`/admin/book-details/${bookId}/info`);
}