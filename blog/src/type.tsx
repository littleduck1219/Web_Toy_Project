export interface PostListProps {
	hasNavigation?: boolean;
	defaultTab?: TabType;
}

export type TabType = "all" | "my";

export interface PostProps {
	id?: string;
	title: string;
	email: string;
	summary: string;
	content: string;
	createdAt: string;
	updatedAt?: string;
	uid: string;
}
