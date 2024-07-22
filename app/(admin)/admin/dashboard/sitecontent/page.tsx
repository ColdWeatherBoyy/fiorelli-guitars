import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { getPageContent } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import { PageContent } from "@prisma/client";
import SelectEditableLayout from "../components/CMS/SelectableEditableLayout";

const SiteContent = async () => {
	const isMobile = useDeviceType();
	const homeData = await getPageContent("Home");
	const aboutData = await getPageContent("About");
	const contactData = await getPageContent("Contact");
	const errors = {
		home: { error: false, name: "", message: "" },
		about: { error: false, name: "", message: "" },
		contact: { error: false, name: "", message: "" },
	};

	if (homeData instanceof Error) {
		errors.home.error = true;
		errors.home.name = homeData.name;
		errors.home.message = homeData.message;
	}
	if (aboutData instanceof Error) {
		errors.about.error = true;
		errors.about.name = aboutData.name;
		errors.about.message = aboutData.message;
	}
	if (contactData instanceof Error) {
		errors.contact.error = true;
		errors.contact.name = contactData.name;
		errors.contact.message = contactData.message;
	}

	if (
		homeData instanceof Error ||
		aboutData instanceof Error ||
		contactData instanceof Error
	) {
		return (
			<div className="flex flex-col gap-2">
				<div className="text-lg text-red-500">
					There was an error fetching the following pages&apos; contents:
				</div>
				<ul>
					{errors.home.error && (
						<li>
							<span className="font-semibold text-red-500">Home:</span> {errors.home.name}{" "}
							- {errors.home.message}
						</li>
					)}
					{errors.about.error && (
						<li>
							<span className="font-semibold text-red-500">About:</span>{" "}
							{errors.about.name} - {errors.about.message}
						</li>
					)}
					{errors.contact.error && (
						<li>
							<span className="font-semibold text-red-500">Contact:</span>{" "}
							{errors.contact.name} - {errors.contact.message}
						</li>
					)}
				</ul>
				<div>If the problem persists, please contact Site Admin.</div>
			</div>
		);
	}

	const pageContents: PageContent[] = [
		homeData.pageContent,
		aboutData.pageContent,
		contactData.pageContent,
	];

	const titlesArray = [homeData.page.title, aboutData.page.title, contactData.page.title];

	return (
		<>
			<Title title="Site Content" />
			<SelectEditableLayout
				content={pageContents}
				titlesArray={titlesArray}
				isMobile={isMobile}
			/>
		</>
	);
};

export default SiteContent;
