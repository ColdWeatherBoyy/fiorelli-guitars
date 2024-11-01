import Toggle from "@/app/(admin)/components/components/Toggle";
import { updateContentBlock } from "@/app/utilities/databaseFunctions/pagecontent.db";
import { PageContent } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import BackgroundImageGallery from "./BackgroundImageGallery";
import EditableContent from "./EditableContent";
import Uploader from "./Uploader";
import AboutFeatureImageGallery from "./AboutFeatureImageGallery";
import ContactFeatureImageGallery from "./ContactFeatureImageGallery";

interface EditablePageContentLayoutProps {
	pageContentData: PageContent[];
	selectedTab: number;
	isMobile: boolean;
}

const EditablePageContentLayout: FC<EditablePageContentLayoutProps> = ({
	pageContentData,
	selectedTab,
	isMobile,
}) => {
	const [isContent, setIsContent] = useState(true);
	const [updateCount, setUpdateCount] = useState(0);
	const [selectedTag, setSelectedTag] = useState<string>(
		pageContentData[selectedTab].tag
	);
	console.log(selectedTag);
	const [uploadTag, setUploadTag] = useState<string>("background");
	const [selectBackgroundImage, setSelectBackgroundImage] = useState(false);
	const [hasContentImages, setHasContentImages] = useState(false);

	useEffect(() => {
		setSelectedTag(pageContentData[selectedTab].tag);
		if (
			pageContentData[selectedTab].tag === "about_bg" ||
			pageContentData[selectedTab].tag === "contact_bg"
		) {
			setHasContentImages(true);
		} else {
			setHasContentImages(false);
			setSelectBackgroundImage(true);
		}

		if (selectBackgroundImage) {
			setUploadTag("background");
		} else if (pageContentData[selectedTab].tag === "about_bg") {
			setUploadTag("about");
		} else if (pageContentData[selectedTab].tag === "contact_bg") {
			setUploadTag("contact");
		}
	}, [pageContentData, selectedTab, selectBackgroundImage]);

	useEffect(() => {}, [selectBackgroundImage]);

	return (
		<>
			<div className="w-full col-span-2 mt-2">
				<Toggle
					isToggled={isContent}
					handleToggle={() => setIsContent((prev) => !prev)}
					optionOne="Content"
					optionTwo="Images"
					isMobile={isMobile}
					small={false}
				/>
			</div>
			{isContent ? (
				Object.entries(pageContentData[selectedTab]).map(([key, value]) => {
					if (
						key === "id" ||
						value === null ||
						key === "tag" ||
						value instanceof Date ||
						typeof value === "number"
					)
						return null;
					if (Array.isArray(value)) {
						const bodies = value.map((item, index) => ({
							[`body${value.length > 1 ? ` ${index + 1}` : ""}`]: item,
						}));

						return bodies.map((content, index) => (
							<EditableContent
								key={`${key}-${pageContentData[selectedTab].id}-${index}`}
								contentObj={content}
								id={pageContentData[selectedTab].id}
								isMobile={isMobile}
								updateContentFunction={updateContentBlock}
							/>
						));
					} else {
						return (
							<EditableContent
								key={`${key}-${pageContentData[selectedTab].id}`}
								contentObj={{ [key]: value }}
								id={pageContentData[selectedTab].id}
								isMobile={isMobile}
								updateContentFunction={updateContentBlock}
							/>
						);
					}
				})
			) : (
				<>
					{hasContentImages && (
						<div className="w-full col-span-2 mt-2">
							<Toggle
								isToggled={selectBackgroundImage}
								handleToggle={() => setSelectBackgroundImage((prev) => !prev)}
								optionOne="Background"
								optionTwo="Content"
								isMobile={isMobile}
								small={false}
							/>
						</div>
					)}
					<div className="my-4 col-span-2 flex justify-center">
						<Uploader
							tags={[uploadTag]}
							setUpdateCount={setUpdateCount}
							isMobile={isMobile}
						/>
					</div>
					{selectBackgroundImage ? (
						<BackgroundImageGallery
							galleryTag="background"
							updateCount={updateCount}
							setUpdateCount={setUpdateCount}
							selectedTag={selectedTag}
							isMobile={isMobile}
						/>
					) : uploadTag === "about" ? (
						<AboutFeatureImageGallery
							galleryTag="about"
							updateCount={updateCount}
							setUpdateCount={setUpdateCount}
							selectedTag={selectedTag}
							isMobile={isMobile}
						/>
					) : (
						<ContactFeatureImageGallery
							galleryTag="contact"
							updateCount={updateCount}
							setUpdateCount={setUpdateCount}
							selectedTag={selectedTag}
							isMobile={isMobile}
						/>
					)}
				</>
			)}
		</>
	);
};
export default EditablePageContentLayout;
