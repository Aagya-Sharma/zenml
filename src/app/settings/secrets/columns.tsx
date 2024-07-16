import { DisplayDate } from "@/components/DisplayDate";
import { SecretNamespace } from "@/types/secret";
import { ColumnDef } from "@tanstack/react-table";

export function getSecretColumns(): ColumnDef<SecretNamespace>[] {
	return [
		{
			id: "secret",
			header: "Secret",
			accessorFn: (row) => row.name,
			cell: ({ getValue }) => (
				<p className="text-text-sm text-theme-text-secondary">{getValue<string>()}</p>
			)
		},
		{
			id: "keys",
			header: "Keys"
		},
		{
			id: "author",
			header: "Author"
		},
		{
			id: "created_at",
			header: "Created At",
			accessorFn: (row) => row.body?.created,
			cell: ({ getValue }) => (
				<p className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={getValue<string>()} />
				</p>
			)
		}
	];
}
