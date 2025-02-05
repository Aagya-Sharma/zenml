import { FallbackSupportCard, ResourcesCard } from "@/components/fallback-pages/Cards";
import { HeaderBox, InfoBox, StacksHeader } from "./Fragments";
import { StackCollapsible } from "./StackCollapsible";
import { StackComponentCollapsible } from "./StackComponentsCollapsible";
import { useTourContext } from "@/components/tour/TourContext";
import { useEffect } from "react";

export default function StacksPage() {
	const {
		setTourState,
		tourState: { tourActive }
	} = useTourContext();

	useEffect(() => {
		if (tourActive) {
			setTourState((prev) => ({ ...prev, run: true, stepIndex: prev.stepIndex }));
		}
	}, [tourActive]);

	return (
		<div>
			<StacksHeader />

			<div className="layout-container py-5">
				<InfoBox />
				<div className="grid grid-cols-4 gap-5 py-5">
					<div className="col-span-4 space-y-5 lg:col-span-3">
						<HeaderBox />
						<StackCollapsible />
						<StackComponentCollapsible />
					</div>
					<div className="col-span-4 space-y-5 lg:col-span-1">
						<FallbackSupportCard />
						<ResourcesCard />
					</div>
				</div>
			</div>
		</div>
	);
}
