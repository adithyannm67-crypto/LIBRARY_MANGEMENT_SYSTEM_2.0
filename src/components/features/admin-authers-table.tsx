
import styles from "@/styles/admin-shared.module.css";
import AutherRow from "./admin-authers-row";
import AuthorFormModal from "./admin-author-form-modal";
import DeleteAuthorModal from "./admin-delete-author-modal";
import type { Author } from "@/types/database";

interface AuthersTableProps {
  authors: Author[];
  searchParams: Promise<{
    edit?: string;
    delete?: string;
    expand?: string;
  }>;

}

export default  async function AuthersTable({ authors,searchParams }: AuthersTableProps) {

  const params = await searchParams;
  const editingAuthor =
    authors.find((a) => a.author_id === params?.edit) ?? null;
  const deletingAuthor =
    authors.find((a) => a.author_id === params?.delete) ?? null;

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr> {["Author", "Nationality", "Books", "Rating", ""].map((h) => ( <th key={h}>{h}</th> ))} </tr>
          </thead>
          <tbody>
            {authors.map((a) => ( <AutherRow key={a.author_id} a={a} params={new URLSearchParams(params)} /> ))}
          </tbody>
        </table>
        {authors.length === 0 && (
          <p style={{ textAlign: "center", padding: "32px", fontSize: 13, color: "var(--muted-foreground)", margin: 0, }} > No authors match. </p>
        )}
      </div>
      {editingAuthor && ( <AuthorFormModal author={editingAuthor} params={new URLSearchParams(params)} /> )}
      {deletingAuthor && ( <DeleteAuthorModal author={deletingAuthor} params={new URLSearchParams(params)} /> )}
    </>
  );
}