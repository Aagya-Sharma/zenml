import { Box } from "@zenml-io/react-component-library";
import SecretsTable from "./SecretsTable";

export default function SecretsPage() {
	return (
		<Box className="space-y-4 p-5">
			<h1 className="text-xl font-semibold">Secrets</h1>
			<div className="flex flex-row space-x-2">
				<p>Configure and manage your pipeline secrets and configurations.</p>
				<span style={{ color: "#7A3EF4" }}>Learn More</span>
			</div>
			<SecretsTable />
		</Box>
	);
}
