import { InfoBox as InfoBoxPrimitive } from "@/components/Infobox";
import { Box } from "@zenml-io/react-component-library";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import { repositoryCommands } from "@/contents/repositories";
import { Fragment } from "react/jsx-runtime";
import { generateCommandList } from "@/components/fallback-pages/Commands";

export function InfoBox() {
	return (
		<InfoBoxPrimitive>
			<div className="flex w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-text-md">
				<p className="font-semibold">We are creating a new Repositories experience</p>
				<p>In the meanwhile you can use the CLI to add and manage your repos.</p>
			</div>
		</InfoBoxPrimitive>
	);
}

export function HeaderBox() {
	return (
		<Box className="flex flex-col-reverse items-stretch overflow-hidden md:flex-row">
			<div className="w-full p-7 md:w-2/3">
				<h2 className="text-display-xs font-semibold">Learn More about Repositories</h2>
				<p className="mt-2 text-text-lg text-theme-text-secondary">
					Get started with ZenML Repositories for streamlined pipeline versioning and faster Docker
					builds.
				</p>
			</div>
		</Box>
	);
}

export function CommandSection() {
	return (
		<section className="space-y-5 pl-8 pr-5">
			<InfoBoxPrimitive className="text-text-md" intent="neutral">
				Code repositories enable ZenML to keep track of the code version that you use for your
				pipeline runs. Additionally, running a pipeline which is tracked in a registered code
				repository can decrease the time it takes Docker to build images for containerized stack
				components.
			</InfoBoxPrimitive>
			{repositoryCommands.map((item, index) => (
				<Fragment key={index}>{generateCommandList(item)}</Fragment>
			))}
			<HelpBox
				text="Check all the commands and find more about Repositories in our Docs"
				link="https://docs.zenml.io/user-guide/production-guide/connect-code-repository"
			/>
		</section>
	);
}
