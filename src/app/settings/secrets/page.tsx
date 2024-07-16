import { Box } from "@zenml-io/react-component-library";
import SecretsTable from "./SecretsTable";

export default function SecretsPage() {
	return (
		<Box className="space-y-4 p-5">
			<h1 className="text-text-xl font-semibold">Secrets</h1>
			<p>Configure and manage your pipeline secrets and configurations.</p>
			<SecretsTable />
		</Box>
	);
}
