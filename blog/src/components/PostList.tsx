import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { PostListProps, PostProps, TabType } from "type";
import { toast } from "react-toastify";

const PostList = ({ hasNavigation = true, defaultTab = "all" }: PostListProps) => {
	const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
	const [posts, setPosts] = useState<any[]>([]);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const getPosts = async () => {
		// const data = await getDocs(collection(db, "posts"));
		setPosts([]);
		let postsRef = collection(db, "posts");
		let postsQuery;

		if (activeTab === "my" && user) {
			// 나의 글
			postsQuery = query(postsRef, where("uid", "==", user.uid), orderBy("createdAt", "desc"));
		} else {
			// 전체 글
			postsQuery = query(postsRef, orderBy("createdAt", "desc"));
		}
		const data = await getDocs(postsQuery);
		data?.forEach((doc) => {
			const dataObj = { ...doc.data(), id: doc.id };
			setPosts((prev) => [...prev, dataObj as PostProps]);
		});
	};

	const handleDelete = (id: string) => async (e: React.MouseEvent) => {
		e.stopPropagation();
		const confirm = window.confirm("정말로 게시글을 삭제 할까요?");
		if (confirm && id && id) {
			await deleteDoc(doc(db, "posts", id));
			toast.success("삭제완료");
			getPosts();
		}
	};

	const handlePostClick = (postId: string) => () => {
		navigate(`/posts/${postId}`); // navigate 함수를 사용하여 프로그래밍 방식으로 이동
	};

	useEffect(() => {
		getPosts();
	}, [activeTab]);
	return (
		<>
			{hasNavigation && (
				<div role='presentation' className='post__navigation'>
					<div
						role='presentation'
						onClick={() => setActiveTab("all")}
						className={activeTab === "all" ? "post__navigation--active" : ""}>
						전체
					</div>
					<div
						role='presentation'
						onClick={() => setActiveTab("my")}
						className={activeTab === "my" ? "post__navigation--active" : ""}>
						나의 글
					</div>
				</div>
			)}

			<div className='post__list '>
				{posts?.length > 0 ? (
					posts?.map((post) => (
						<div key={post.id} className='post__box'>
							<div onClick={handlePostClick(post.id)}>
								<div className='post__profile-box'>
									<div className='post__profile' />
									<div className='post__author-name'>{post?.email}</div>
									<div className='post__date'>{post?.createdAt}</div>
								</div>
								<div className='post__title'>{post?.title}</div>
								<div className='post__text'>{post?.content}</div>
								{post?.email === user?.email && (
									<div className='post__utils-box'>
										<div className='post__delete' onClick={handleDelete(post.id)}>
											삭제
										</div>
										<div className='post__edit'>수정</div>
									</div>
								)}
							</div>
						</div>
					))
				) : (
					<div className='post__no-post'>게시글이 존재하지 않습니다.</div>
				)}
			</div>
		</>
	);
};

export default PostList;
